# Leave Management Frontend

React 19 + TypeScript + Vite frontend for a Leave Management System. Backend runs at `http://localhost:3000`, API base path `/api/v1`, Swagger docs at `http://localhost:3000/api-docs/`.

## Architecture: Atomic Design

```
src/components/
  atoms/       Smallest building blocks: Button, Input, Label, ErrorText, Spinner, Avatar
  molecules/   Small combinations of atoms: FormField, PasswordInput, OtpInput, DropdownMenu
  organisms/   Larger, feature-level compositions: LoginForm, Sidebar, Header, DashboardLayout
```

Rules:
- Each component folder exports through a barrel `index.ts` — import as `from "../../components/atoms"`, not deep paths.
- Keep components under ~200 lines. If a component grows past that, split it (extract a sub-component or move logic into a hook).
- Co-locate a component's CSS file next to it (`Button.tsx` + `Button.css`). Use CSS variables from `src/styles/variables.css` / `src/theme/theme.ts`, never hardcoded colors/spacing.
- No heavyweight UI library — keep the UI minimal and hand-styled with plain CSS.

## Routing (scalable, two-config pattern)

- `src/interface/route.ts` — shared `AppRoute` / `NavItem` types, and `Role` lives in `src/interface/auth.ts` (`"EMPLOYEE" | "MANAGER" | "HR"`).
- `src/routes/routes.tsx` — the single source of truth for React Router route definitions (`<AppRoutes />`). **To add a new page: add one `<Route>` entry here.**
- `src/routes/navConfig.ts` — a separate array of sidebar nav items (`label, path, icon, allowedRoles?`), consumed by `Sidebar.tsx` and filtered by the current user's role. **To add a sidebar link: add one entry here.** Routing and nav are intentionally separate files — not every route needs a sidebar link (e.g. `/profile`), and not every nav entry is a top-level route.
- `ProtectedRoute` wraps private routes: redirects to `/login` if unauthenticated, and to `/dashboard` if `allowedRoles` is set and the user's role isn't included (role-based authorization is scaffolded but not yet enforced everywhere — extend `allowedRoles` on routes/nav items as role rules are defined).
- `PublicRoute` wraps auth pages: redirects to `/dashboard` if already authenticated.

## State Management: Redux Toolkit (module-based)

Each domain gets its own folder under `src/store/<module>/` with:
- `<module>Slice.ts` — state shape + reducers + `extraReducers` for that module's thunks.
- `<module>Thunks.ts` — `createAsyncThunk` functions that call the matching `src/services/<module>Service.ts`.

Existing modules: `auth` (token, user, isAuthenticated, login/logout), `users` (currentUser cache from `/users/me`). Follow this exact shape for any new module (e.g. `leaveRequests`, `leaveTypes`).

Use the typed hooks `useAppDispatch` / `useAppSelector` from `src/hooks/` — never the raw `react-redux` hooks directly.

## API layer

- `src/services/axiosInstance.ts` — single axios instance, `baseURL` from `VITE_API_BASE_URL` env var.
  - Request interceptor attaches `Authorization: Bearer <token>` (token read via an accessor registered from `src/store/index.ts` to avoid circular imports between the store and the axios instance).
  - Response interceptor unwraps the backend's `{ success, message, data }` envelope — service calls resolve directly to `data`. On error, shows `toast.error(message)`; on `401`, dispatches logout automatically.
- One `src/services/<domain>Service.ts` per API domain, each function a thin axios call — no business logic here, that belongs in thunks.
- Add new endpoint types to `src/interface/`.

## Forms: Formik + Yup

- Every form uses `Formik` + a colocated `Yup.object({...})` validation schema.
- Use the `FormField` / `PasswordInput` / `OtpInput` molecules for consistent field styling and error display — don't hand-roll `<input>` + error markup in page/organism components.

## Toasts

`react-hot-toast` is mounted once in `main.tsx` (`<Toaster />`). Success/error messages are triggered from thunks and the axios response interceptor — don't call `toast()` directly from components for API-driven feedback.

## Auth flow (confirmed against live backend spec)

- `POST /auth/signin` `{email, password}` → `{token, user: {id, name, email, role}}`. Role is one of `EMPLOYEE`, `MANAGER`, `HR`.
- `POST /auth/forgot-password` `{email}` — sends a 6-digit OTP.
- `POST /auth/reset-password` `{email, otp, newPassword}` — **one combined form** (email + OTP + new password), not a token-in-URL link.
- `POST /auth/signout` — bearer-protected, invalidates the session server-side (token version bump).
- No refresh-token endpoint exists. A `401` on any protected call always forces logout + redirect to `/login` — do not build silent-refresh logic.
- JWT + minimal user object persist to `localStorage` (`lm_token`, `lm_user`) so a page refresh doesn't lose the session.

## Dashboard shell

`DashboardLayout` organism = `Sidebar` (from `navConfig.ts`, filtered by role) + `Header` (profile avatar dropdown with Profile/Sign out) + `<Outlet />`. All authenticated pages render inside this layout via the parent route in `routes.tsx`.

## Commands

- `npm run dev` — start dev server (default Vite port, typically 5173).
- `npm run build` — `tsc -b && vite build`.
- `npm run lint` — ESLint (flat config, `eslint.config.js`).

## Adding a new feature module (e.g. leave requests)

1. Types in `src/interface/leaveRequest.ts`.
2. `src/services/leaveRequestService.ts` — axios calls.
3. `src/store/leaveRequests/{leaveRequestsSlice.ts, leaveRequestsThunks.ts}`, register the reducer in `src/store/index.ts`.
4. Page(s) in `src/pages/leaveRequests/`, composed from atoms/molecules/organisms.
5. Add route(s) to `src/routes/routes.tsx` and, if it needs a sidebar link, an entry to `src/routes/navConfig.ts` (with `allowedRoles` if role-restricted).

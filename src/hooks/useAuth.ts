import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { logout } from "../store/auth/authSlice";
import { signoutThunk } from "../store/auth/authThunks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const signOut = async () => {
    try {
      await dispatch(signoutThunk()).unwrap();
    } finally {
      dispatch(logout());
    }
  };

  return { user, token, isAuthenticated, loading, signOut };
};

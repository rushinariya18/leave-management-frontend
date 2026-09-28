import { Button } from "../atoms";
import "./Pagination.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({ page, totalPages, onPageChange, isLoading = false }: PaginationProps) => {
  return (
    <div className="pagination">
      <Button
        type="button"
        variant="secondary"
        disabled={page <= 1 || isLoading}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>
      <span className="pagination__label">
        Page {page} of {Math.max(totalPages, 1)}
      </span>
      <Button
        type="button"
        variant="secondary"
        disabled={page >= totalPages || isLoading}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

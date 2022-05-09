import { Spinner } from "react-bootstrap";

export function Loader({ loading = true }: { loading?: boolean }) {
  if (loading) {
    return (
      <div className="Loader">
        <Spinner animation="grow" />
      </div>
    );
  }
  return null;
}

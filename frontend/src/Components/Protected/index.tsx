import { Navigate, useLocation } from "react-router-dom";
import { getUser, isAuthenticated } from "../../Services/Auth";
import { Location } from "history";

interface ProtectedProps {
  Component: () => JSX.Element;
}

function Protected({ Component }: ProtectedProps) {
  const location = useLocation();
  const user = getUser();

  const redirect = (location: Location | string) => {
    return (
      <Navigate
        to={{
          pathname: "/account/login",
        }}
        state={{ from: location }}
      />
    );
  };

  if (user === null) return redirect("/account/login");

  return isAuthenticated() ? <Component /> : redirect(location || "/dashboard");
}

export default Protected;

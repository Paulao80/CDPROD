import { Route, Redirect, RouteProps } from "react-router-dom";
import { getUser, isAuthenticated } from "../../Services/Auth";
import { Location } from "history";

const PrivateRoute: React.FC<RouteProps> = ({
  children,
  component,
  location,
  ...rest
}) => {
  const user = getUser();
  console.log("🚀 ~ file: index.tsx ~ line 12 ~ user", user);

  const redirect = (location: Location | string) => {
    return (
      <Redirect
        to={{
          pathname: "/account/login",
          state: { from: location },
        }}
      ></Redirect>
    );
  };

  if (user === null) return redirect("/account/login");

  return isAuthenticated() ? (
    <Route component={component} {...rest}>
      {children}
    </Route>
  ) : (
    redirect(location || "/dashboard")
  );
};

export default PrivateRoute;

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../../Services/Auth';
import { Location } from 'history';

const PrivateRoute: React.FC<RouteProps> = ({ children, component, location, ...rest }) => {

    const redirect = (location: Location | string) => {
        return (<Redirect
            to={{
                pathname: "/account/login",
                state: { from: location }
            }}>
        </Redirect>);
    }

    // return (
    //     <Route {...rest}
    //         render={
    //             ({ location }) =>
    //                 isAuthenticated() ?
    //                     (children)
    //                     : redirect(location || "/")
    //         }
    //     ></Route>
    // );

    return isAuthenticated() ? <Route component={component} {...rest}>{children}</Route> : redirect(location || "/dashboard");
}

export default PrivateRoute;
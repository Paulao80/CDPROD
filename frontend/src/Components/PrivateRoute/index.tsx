import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../../Services/Auth';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {

    return (
        <Route {...rest}
            render={
                ({ location }) =>
                    isAuthenticated() ?
                        (children)
                        : (<Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}>
                        </Redirect>)
            }
        ></Route>
    );
}

export default PrivateRoute;
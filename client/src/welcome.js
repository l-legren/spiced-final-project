import { Route, HashRouter } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset-password";

const Welcome = () => {
    return (
        <HashRouter>
            <Route exact path="/" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/reset" component={ResetPassword} />
        </HashRouter>
    );
};

export default Welcome;

import { Route, HashRouter } from "react-router-dom";
import Registration from "./registration";
import RegistrationForm from "./registration2";
import Login from "./login";
import ResetPassword from "./reset-password";

const Welcome = () => {
    return (
        <HashRouter>
            <Route exact path="/" component={Registration} />
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/login" component={Login} />
            <Route path="/reset" component={ResetPassword} />
        </HashRouter>
    );
};

export default Welcome;

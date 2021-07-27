import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Employees from "./components/Employees";
import EmployeeForm from "./components/EmployeeForm";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
    return (
        <React.Fragment>
            <ToastContainer />
            <Switch>
                <Route path="/employees/:id" component={EmployeeForm} />
                <Route path="/employees" exact component={Employees} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" to="/employees" />
                <Redirect to="/not-found" />
            </Switch>
        </React.Fragment>
    );
}

export default App;

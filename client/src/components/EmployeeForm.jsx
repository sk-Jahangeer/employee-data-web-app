import React from "react";
import Joi from "joi";
import Form from "./common/Form";
import { toast } from "react-toastify";
import {
    getEmployeeById,
    createEmployee,
    updateEmployee,
} from "../services/employeeServices";
import Paper from "@material-ui/core/Paper";

class EmployeeForm extends Form {
    state = {
        data: { name: "", email: "", mobile: "" },
        errors: {},
        param: this.props.match.params.id,
    };

    schema = {
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: false }).required(),
        mobile: Joi.string()
            .length(10)
            .regex(/^\d+$/)
            .message({
                "string.pattern.base": "Please enter valid mobile number.",
            })
            .required(),
    };

    async componentDidMount() {
        const { param } = this.state;
        if (param !== "new") {
            try {
                const { data: employee } = await getEmployeeById(param);
                const data = {
                    name: employee.name,
                    email: employee.email,
                    mobile: employee.mobile,
                };
                this.setState({ data });
            } catch (error) {
                toast.error(error.response.data);
            }
        }
    }

    doSubmit = async () => {
        const { data, param } = this.state;
        try {
            let response;
            if (param === "new") response = await createEmployee(data);
            else response = await updateEmployee(param, data);
            toast.success(response.data);
            this.props.history.push("/employees");
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    render() {
        const { param } = this.state;
        return (
            <div className="full_screen flex">
                <form onSubmit={this.handleSubmit}>
                    <Paper className="form_container flex column">
                        <h2 className="form_heading">Employee Details</h2>
                        {this.renderInput("name", "Name")}
                        {this.renderInput("email", "Email", "email")}
                        {this.renderInput("mobile", "Mobile")}
                        {this.renderSubmitBtn(
                            param === "new" ? "Add Employee" : "update"
                        )}
                    </Paper>
                </form>
            </div>
        );
    }
}

export default EmployeeForm;

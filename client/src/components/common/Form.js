import React, { Component } from "react";
import Joi from "joi";
import Input from "./Input";
import Button from "@material-ui/core/Button";

class Form extends Component {
    state = { data: {}, errors: {} };

    validate = () => {
        const schema = Joi.object(this.schema);
        const { error } = schema.validate(this.state.data);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = Joi.object({ [name]: this.schema[name] });
        const { error } = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    renderInput(name, label, type = "text", required = true) {
        const { data, errors } = this.state;
        return (
            <Input
                name={name}
                label={label}
                type={type}
                required={required}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    }

    renderSubmitBtn(name) {
        return (
            <Button
                className="submit_btn"
                type="submit"
                color="primary"
                variant="contained"
            >
                {name}
            </Button>
        );
    }
}

export default Form;

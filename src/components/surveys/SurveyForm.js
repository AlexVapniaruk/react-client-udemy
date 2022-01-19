import React, { Component } from "react";
import { values } from "redux-form";
import { reduxForm, Field } from 'redux-form';
import SurveyField from "./SurveyField";
import _ from 'lodash';
import { Link } from "react-router-dom";

const FIELDS = [
    { label: 'Subject Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
]
class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({label, name}) => {
            return (
                <Field 
                    type="text"
                    key={name}
                    name={name}
                    label={label}
                    component={SurveyField}/>
            );
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link
                        to="/surveys"
                        className="red btn-flat white-text"
                    >
                        Cancel
                    </Link>
                    <button 
                        className="teal btn-flat right white-text"
                        type="submit"
                    >
                        <i className="material-icons right">done</i>
                        Next
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(FIELDS, ({name, label}) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${label}`;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);
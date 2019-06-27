//Libraries
import React, {Component} from 'react';
import PropTypes from "prop-types";

//Styles
import "../../styles/subcomponents/special-fields.css"


class FieldTitle extends Component {

    render() {

        let visibility = this.props.title==="b" ? "field-title-hidden" : "field-title-visible";

        return (
            <p className={visibility}>{this.props.title}:</p>
        );
    }
}

FieldTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FieldTitle;
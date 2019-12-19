import React from "react";
import { useField } from "formik";
import { StyledLabel, StyledSelect, StyledErrorMessage } from "./StyledSelect";
export const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (<>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (<StyledErrorMessage>{meta.error}</StyledErrorMessage>) : null}
    </>);
};

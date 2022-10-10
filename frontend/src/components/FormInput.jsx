import React from "react";
import styled from "styled-components";

const FormInputContainer = styled.div`
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: left;
`;

const FormInputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const FormInputComponent = styled.input`
  width: 80%;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  background: #f0f4f8;
  border: 1px solid #bcccdc;
`;

const FormInput = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
  labelText,
}) => {
  return (
    <FormInputContainer>
      <LabelContainer>
        <FormInputLabel htmlFor={name}>{labelText || name}</FormInputLabel>
      </LabelContainer>
      <FormInputComponent
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </FormInputContainer>
  );
};

export default FormInput;

import React, { Component } from "react";

const TextInput = ({ forwardedRef, children, ...rest }) => (
  <div>
    <button ref={forwardedRef} {...rest}>
      helllo
      {children}
    </button>
  </div>
);

const Input = (InputComponent) => {
  const forwardRef = (props, ref) => {
    const onType = () =>
      console.log("ref button is clicked " + ref.current.value);
    return <InputComponent forwardedRef={ref} onClick={onType} {...props} />;
  };

  return React.forwardRef(forwardRef);
};

const InputField = Input(TextInput);

class CustomTextInput extends Component {
  render() {
    const inputRef = React.createRef();
    return <InputField ref={inputRef} />;
  }
}

export default CustomTextInput;

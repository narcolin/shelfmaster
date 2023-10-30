import React from 'react';

const CredentialInput = (props) => {
  return (
    <div className={`wrap-input100 ${props.styles}`}>
      <input className="input100"
        type={props.type}
        name={props.name}
        ref={props.ref} />
      <span className="focus-input100" />
      <span className="label-input100">{props.label}</span>
    </div>
  );
};

export default CredentialInput;

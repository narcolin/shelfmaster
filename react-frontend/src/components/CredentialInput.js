import React from 'react';

const CredentialInput = ({ type, name, label, styles }) => {
  return (
    <div className={`wrap-input100 ${styles}`}>
      <input className="input100" type={type} name={name} />
      <span className="focus-input100" />
      <span className="label-input100">{label}</span>
    </div>
  );
};

export default CredentialInput;

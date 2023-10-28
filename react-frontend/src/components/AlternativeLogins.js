import React from 'react';

const SocialButton = ({ social }) => {
  return (
    <button type="button" className={`btn btn-floating ${social} mx-1`}>
      <i className={`bi bi-${social}`}></i>
    </button>
  );
};

function AlternativeLogins() {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center">
      <SocialButton social="google" />
      <SocialButton social="facebook" />
      <SocialButton social="twitter" />
    </div>
  );
};

export default AlternativeLogins;

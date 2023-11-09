import React from "react";
import { supabase } from "../Client";

const SocialButton = ({ social }) => {
  return (
    <button
      type="button"
      className={`btn btn-floating ${social} mx-1`}
      onClick={() => handleClick(social)}
    >
      <i className={`bi bi-${social}`}></i>
    </button>
  );
};

async function handleClick(social) {
  await supabase.auth.signInWithOAuth({
    provider: social,
    options: {
      redirectTo: "localhost:3000/inventory",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

function AlternativeLogins() {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center">
      <SocialButton social="google" />
      <SocialButton social="facebook" />
      <SocialButton social="twitter" />
    </div>
  );
}

export default AlternativeLogins;

import { useRef, useState, useEffect} from "react";

// start with letter; only letters, numbers, -, and _; 4-20 characters
const USER_REG_EX = /^[a-ZA-Z][a-ZA-z0-9-_]{3,19}$/;
// at least one upper case, number, and special character each; at least 8 characters
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

import React from 'react'

const Register = () => {
  return (
    <div>Register</div>
  )
}

export default Register
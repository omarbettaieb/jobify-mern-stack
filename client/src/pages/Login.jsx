import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="" />
        <FormRow type="password" name="password" defaultValue="" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Not a member yet?
      </p>
      <Link to='/register' className="member-btn">
        Register now 
      </Link>
      </form>
    </Wrapper>
  );
};

export default Login;

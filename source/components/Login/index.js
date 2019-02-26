import React from "react";
import Styles from "./styles.m.css";
const Login = props => {
  return (
    <div className={Styles.Login}>
      <button className={Styles.Button} onClick={props.login}>
        Войти
      </button>
    </div>
  );
};
export default Login;

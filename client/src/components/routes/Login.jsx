import React from "react";

const Login = () => (
  <div>
    Login page
    <form action="/auth/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
    <form action="/auth/signup" method="get">
      <input type="submit" value="Sign up" />
    </form>
  </div>
);

export default Login;

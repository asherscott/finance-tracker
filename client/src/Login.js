import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focus, setFocus] = useState(null);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  function handleLogin(e) {
    e.preventDefault();

    fetch("/login", config).then((r) =>
      r.ok
        ? r.json().then((user) => onLogin(user))
        : r.json().then((error) => setError(error))
    );
  }

  return (
    <div className="wrapper login-center">
      <div className="login-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="form-wrapper">
          <div className="login-input-wrapper">
            <label
              htmlFor="email"
              className={
                focus === "email"
                  ? "focused login-label"
                  : email
                  ? "focused login-label"
                  : "login-label"
              }
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onFocus={(e) => setFocus(e.target.name)}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-wrapper">
            <label
              htmlFor="password"
              className={
                focus === "password"
                  ? "focused login-label"
                  : password
                  ? "focused login-label"
                  : "login-label"
              }
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onFocus={(e) => setFocus(e.target.name)}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error ? <p className="error">{error.error}</p> : null}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

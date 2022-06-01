import { useState } from "react";

function Signup({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [focus, setFocus] = useState(null);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  };

  function handleSignup(e) {
    e.preventDefault();

    fetch("/users", config).then((r) =>
      r.ok
        ? r.json().then(() => onSignup())
        : r.json().then((error) => setError(error))
    );
  }

  return (
    <div className="wrapper login-center">
      <div className="login-wrapper">
        <h2>Sign Up!</h2>
        <form onSubmit={handleSignup} className="login-wrapper">
          <div className="login-input-wrapper">
            <label
              htmlFor="email"
              className={
                focus === "email" ? "focused login-label" : "login-label"
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
                focus === "password" ? "focused login-label" : "login-label"
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

          <div className="login-input-wrapper">
            <label
              htmlFor="passwordConfirmation"
              className={
                focus === "passwordConfirmation"
                  ? "focused login-label"
                  : "login-label"
              }
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onFocus={(e) => setFocus(e.target.name)}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign Up!
          </button>
        </form>

        {error ? <p className="error">{error.error}</p> : null}
      </div>
    </div>
  );
}

export default Signup;

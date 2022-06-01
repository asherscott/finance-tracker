function AccountCreated({ setSignup }) {
  return (
    <div id="landing-background" className="wrapper success-wrapper">
      <div className="login-wrapper success-wrapper">
        <h1>Success!</h1>
        <a
          onClick={() => setSignup(false)}
          href="/login"
          className="login-btn success-link"
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default AccountCreated;

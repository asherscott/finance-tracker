function AccountCreated({ setSignup }) {
  return (
    <div>
      <h2>Success!</h2>
      <a onClick={() => setSignup(false)} href="/login">
        Login
      </a>
    </div>
  );
}

export default AccountCreated;

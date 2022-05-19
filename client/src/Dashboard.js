function Dashboard({ user, setUser }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setUser(null));
  }

  return (
    <div>
      <h2>Hello {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

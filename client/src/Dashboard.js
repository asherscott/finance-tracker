function Dashboard({ user, setUser }) {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  function handleLogout() {
    fetch("/logout", config).then(() => setUser(null));
  }

  return (
    <div>
      <h2>Hello {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

function Dashboard({ user, masterList, setMasterList }) {
  return (
    <div>
      <h2>Hello, {user.email.split("@", 1)}</h2>
    </div>
  );
}

export default Dashboard;

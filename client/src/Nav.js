import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Budget from "./Budget";
import NetWorth from "./NetWorth";
import CashFlow from "./CashFlow";
import Savings from "./Savings";

function Nav({ user, setUser }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setUser(null));
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/budget">Budget</Link>
            </li>
            <li>
              <Link to="/net_worth">Net Worth</Link>
            </li>
            <li>
              <Link to="/cash_flow">Cash Flow</Link>
            </li>
            <li>
              <Link to="/savings">Savings</Link>
            </li>
            <li>
              <a href="/login" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/budget">
            <Budget user={user} />
          </Route>
          <Route path="/net_worth">
            <NetWorth user={user} />
          </Route>
          <Route path="/cash_flow">
            <CashFlow user={user} />
          </Route>
          <Route path="/savings">
            <Savings user={user} />
          </Route>
          <Route path="/">
            <Dashboard user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Nav;

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Budget from "./Budget";
import NetWorth from "./NetWorth";
import CashFlow from "./CashFlow";
import Savings from "./Savings";
import "./Nav.css";
import { useState } from "react";

function Nav({ user, setUser, masterList, setMasterList }) {
  const [tab, setTab] = useState(1);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => setUser(null));
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className={tab === 1 ? "selected" : ""}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={tab === 2 ? "selected" : ""}>
              <Link to="/budget">Budget</Link>
            </li>
            <li className={tab === 3 ? "selected" : ""}>
              <Link to="/net_worth">Net Worth</Link>
            </li>
            <li className={tab === 4 ? "selected" : ""}>
              <Link to="/cash_flow">Cash Flow</Link>
            </li>
            {/* <li>
              <Link to="/savings">Savings</Link>
            </li> */}
            <li>
              <a href="/login" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/budget">
            <Budget
              user={user}
              masterList={masterList}
              setMasterList={setMasterList}
              setTab={setTab}
            />
          </Route>
          <Route path="/net_worth">
            <NetWorth
              user={user}
              masterList={masterList}
              setMasterList={setMasterList}
              setTab={setTab}
            />
          </Route>
          <Route path="/cash_flow">
            <CashFlow
              user={user}
              masterList={masterList}
              setMasterList={setMasterList}
              setTab={setTab}
            />
          </Route>
          <Route path="/savings">
            <Savings user={user} />
          </Route>
          <Route path="/">
            <Dashboard user={user} masterList={masterList} setTab={setTab} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Nav;

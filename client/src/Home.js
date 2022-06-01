import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="landing-wrapper home-wrapper">
      <div className="text">
        <p>
          Make tracking your financials easy. Create a budget, add expenses,
          income, and view your Net Worth and Cash Flow over time. This
          Application is designed to keep track of your daily spending habits,
          and visualize your Net Worth over time.
        </p>
      </div>

      <div className="img-wrapper">
        <img src="Dashboard.png" alt="Dashboard.png" className="dash-img" />
      </div>

      <div className="image-tab-wrapper">
        <div className="img-card">
          <img src="Budget.png" alt="Budget.png" className="tab-img" />
          <label>Budget</label>
        </div>

        <div className="img-card">
          <img src="NW.png" alt="NW.png" className="tab-img" />
          <label>Net Worth</label>
        </div>

        <div className="img-card">
          <img src="CF.png" alt="CF.png" className="tab-img" />
          <label>Cash Flow</label>
        </div>

        <div className="img-card">
          <img src="Expense.png" alt="Expense.png" className="tab-img" />
          <label>Expense</label>
        </div>

        <div className="img-card">
          <img src="Income.png" alt="Income.png" className="tab-img" />
          <label>Income</label>
        </div>
      </div>

      <footer>
        <div className="footer-wrapper">
          <div>
            <ul className="footer-list">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up!</Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="footer-list">
              <li>
                <a
                  href="https://www.linkedin.com/in/asher-scott-39a740235/"
                  className="icon"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/asherscott/finance-tracker"
                  className="icon"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

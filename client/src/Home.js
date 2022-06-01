import "./Home.css";

function Home() {
  return (
    <div className="landing-wrapper home-wrapper">
      <div className="text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="img-wrapper">
        <img src="Dashboard.png" alt="Dashboard.png" className="dash-img" />
      </div>

      {/* <div className="fancy">
        <div className="img-parent">
          <div className="img-wrapper">
            <img src="Dashboard.png" alt="Dashboard.png" className="dash-img" />
          </div>
        </div>
        <div className=" text text-parent">
          <div className="text-skinny">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div> */}

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
        <div>hey</div>
      </footer>
    </div>
  );
}

export default Home;

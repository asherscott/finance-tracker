import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard({ user, masterList, setTab }) {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [statements, setStatements] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [entries, setEntries] = useState([]);

  setTab(1);

  useEffect(() => {
    if (masterList) {
      setBudgetEntries(
        masterList
          .filter((entry) => entry.category.name === "Budget")
          .sort((a, b) => b.amount - a.amount)
      );
      setStatements(
        masterList.filter((entry) => entry.category.name === "Statement")
      );
      setIncome(masterList.filter((entry) => entry.category.name === "Income"));
      setExpense(
        masterList.filter((entry) => entry.category.name === "Expense")
      );
      setEntries(
        masterList.filter(
          (entry) =>
            entry.category.name === "Expense" ||
            entry.category.name === "Income"
        )
      );
    }
  }, [masterList]);

  function renderBudget() {
    const budgetPieData = budgetEntries.map((entry) => [
      entry.sub_category.name,
      entry.amount,
    ]);
    budgetPieData.unshift(["Category", "Amount"]);

    return (
      <div className="chart-wrapper">
        <span className="amount">
          ${budgetEntries.reduce((total, num) => total + num.amount, 0)}
        </span>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={budgetPieData}
          options={{
            pieHole: 0.6,
            backgroundColor: "none",
            colors: [
              "#26cd4d",
              "#00c065",
              "#00b377",
              "#00a483",
              "#00958a",
              "#00858b",
              "#007685",
              "#00667b",
              "#0f576b",
              "#2a4858",
              "#28687d",
              "#168ba0",
              "#00b0be",
              "#00d6d6",
              "#05fce8",
              "#00fed9",
              "#00ffc6",
              "#00ffb0",
              "#00ff96",
              "#00ff78",
            ],
            pieSliceText: "none",
            legend: { position: "none" },
          }}
        />
      </div>
    );
  }

  function nwTotal() {
    const amounts = statements.map((entry) => entry.amount);
    return amounts.slice(-1)[0];
  }

  function renderNW() {
    const dates = statements.map((entry) => entry.date.slice(0, 7));
    const amounts = statements.map((entry) => entry.amount);

    const data = dates.map((date, i) => [date, amounts[i]]);
    data.unshift(["Date", "Net Worth"]);

    return (
      <div className="chart-wrapper">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="350px"
          data={data}
          options={{
            legend: { position: "none" },
            backgroundColor: "none",
            colors: ["#00B0AE"],

            vAxis: {
              gridlineColor: "none",
              // ticks: [0],
              textPosition: "none",
              textStyle: {
                color: "rgb(161, 176, 182)",
                fontSize: 14,
              },
            },
            hAxis: {
              textPosition: "none",
              textStyle: {
                color: "rgb(161, 176, 182)",
                fontSize: 14,
              },
            },
          }}
        />
      </div>
    );
  }

  function renderCashFlow(entries) {
    const budgetPieData = entries.map((entry) => [
      entry.sub_category.name,
      entry.amount,
    ]);
    budgetPieData.unshift(["Category", "Amount"]);

    return (
      <div className="chart-wrapper">
        <span className="amount">
          ${entries.reduce((total, num) => total + num.amount, 0)}
        </span>
        <Chart
          chartType="PieChart"
          width="100%"
          height="200px"
          data={budgetPieData}
          options={{
            pieHole: 0.6,
            backgroundColor: "none",
            colors: entries[0]
              ? entries[0].category.name === "Expense"
                ? [
                    "#ff0000",
                    "#ff2f00",
                    "#ff4500",
                    "#ff5700",
                    "#ff6600",
                    "#ff7400",
                    "#ff8200",
                    "#ff8f00",
                    "#ff9b00",
                    "#ffa700",
                    "#ffb200",
                    "#ffbd00",
                    "#ffc900",
                    "#ffd300",
                    "#ffde00",
                  ]
                : [
                    "#003782",
                    "#004490",
                    "#00529e",
                    "#005faa",
                    "#006cb6",
                    "#007ac1",
                    "#0088cb",
                    "#0095d4",
                    "#00a3dd",
                    "#00b1e4",
                    "#00bfeb",
                    "#00cdf1",
                    "#00daf6",
                    "#00e8fb",
                    "#00f6ff",
                  ]
              : [],
            pieSliceText: "none",
            legend: { position: "none" },
          }}
        />
      </div>
    );
  }

  function cfTotal() {
    const amounts = entries.map((entry) =>
      entry.category.name === "Income" ? entry.amount : -entry.amount
    );
    const totalAmounts = [];
    let runsum = 0;

    for (const num of amounts) {
      runsum += num;
      totalAmounts.push(runsum);
    }

    return runsum;
  }

  function renderCFArea() {
    const dates = entries.map((entry) => entry.date.slice(8));
    const amounts = entries.map((entry) =>
      entry.category.name === "Income" ? entry.amount : -entry.amount
    );
    const totalAmounts = [];
    let runsum = 0;

    for (const num of amounts) {
      runsum += num;
      totalAmounts.push(runsum);
    }

    const areaData = dates.map((date, i) => [date, totalAmounts[i]]);
    areaData.unshift(["-", 0]);
    areaData.unshift(["Date", "Cash Flow"]);

    return (
      <div className="chart-wrapper">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="200px"
          data={areaData}
          options={{
            legend: { position: "none" },
            backgroundColor: "none",
            colors: ["#0095d4"],
            vAxis: {
              textPosition: "none",
              gridlineColor: "none",
              textStyle: {
                color: "rgb(161, 176, 182)",
                fontSize: 12,
              },
            },

            hAxis: {
              baselineColor: "none",
              gridlineColor: "none",
              textStyle: {
                color: "rgb(161, 176, 182)",
                fontSize: 12,
              },
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="dash-wrapper">
      <div className="dash-container">
        {/* <h2>Hello, {user.email.split("@", 1)}</h2> */}

        <div className="NW-wrapper dash-tile">
          <div className="card-title">
            <div className="title-hover">
              <Link to="/net_worth">Net Worth</Link>
            </div>
            <span className="num">${nwTotal()}</span>
          </div>

          {renderNW()}
        </div>

        <div className="pies-wrapper">
          <div className="budget-wrapper dash-tile">
            <Link to="/budget" className="card-title budget-title title-hover">
              Budget
            </Link>

            {renderBudget()}
          </div>

          <div className="cashflow-wrapper">
            <div className="cashPies-wrapper">
              <div className="income-wrapper dash-tile">
                <Link
                  to="/cash_flow"
                  className="card-title cashPies-title title-hover"
                >
                  Income
                </Link>

                {renderCashFlow(income)}
              </div>

              <div className="expense-wrapper dash-tile">
                <Link
                  to="/ecash_flow"
                  className="card-title cashPies-title title-hover"
                >
                  Expense
                </Link>
                {renderCashFlow(expense)}
              </div>
            </div>

            <div className="cashflow-area-wrapper dash-tile">
              <div className="card-title">
                <div className="title-hover">
                  <Link to="/cash_flow">Cash Flow</Link>
                </div>
                <span className="num">${cfTotal()}</span>
              </div>

              {renderCFArea()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

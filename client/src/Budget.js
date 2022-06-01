import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";
import "./Budget.css";

function Budget({ user, masterList, setMasterList, setTab }) {
  const [budgetEntries, setBudgetEntries] = useState(
    masterList
      .filter((entry) => entry.category.name === "Budget")
      .sort((a, b) => b.amount - a.amount)
  );

  setTab(2);

  function renderPie() {
    const budgetPieData = budgetEntries.map((entry) => [
      entry.sub_category.name,
      entry.amount,
    ]);
    budgetPieData.unshift(["Category", "Amount"]);

    return (
      <div className="chart-wrapper budget-chart">
        <span className="amount">
          $
          {budgetEntries
            .reduce((total, num) => total + num.amount, 0)
            .toLocaleString("en-US")}
        </span>
        <Chart
          chartType="PieChart"
          width="100%"
          height="45vh"
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

  return (
    <div className="net-worth-wrapper wrapper">
      <div className="dash-tile NW-area chart-wrapper">{renderPie()}</div>

      <table className="big">
        <thead>
          <tr className="head-row">
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <RenderRows
          journalEntries={budgetEntries}
          setJournalEntries={setBudgetEntries}
          setMasterList={setMasterList}
          user={user}
          categoryId={3}
        />
      </table>
    </div>
  );
}

export default Budget;

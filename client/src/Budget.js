import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";
import "./Budget.css";

function Budget({ user, masterList, setMasterList }) {
  const [budgetEntries, setBudgetEntries] = useState(
    masterList.filter((entry) => entry.category.name === "Budget")
  );

  function renderPie() {
    const budgetPieData = budgetEntries.map((entry) => [
      entry.sub_category.name,
      entry.amount,
    ]);
    budgetPieData.unshift(["Category", "Amount"]);

    return (
      <div className="chart-wrapper">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={budgetPieData}
          options={{
            pieHole: 0.6,
            backgroundColor: "none",
            //   colors: ["#FB7A21", "#050", "#666"],
            pieSliceText: "none",
          }}
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="wrapper budget-wrapper">
        <h2>Budget</h2>

        {renderPie()}

        <table>
          <thead>
            <tr>
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
    </div>
  );
}

export default Budget;

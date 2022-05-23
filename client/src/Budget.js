import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";

function Budget({ user }) {
  const [budgetEntries, setBudgetEntries] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Budget")
  );

  const budgetPieData = budgetEntries.map((entry) => [
    entry.sub_category.name,
    entry.amount,
  ]);
  budgetPieData.unshift(["Category", "Amount"]);

  return (
    <div>
      <h2>Budget</h2>

      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={budgetPieData}
        options={{ pieHole: 0.6 }}
      />

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
          user={user}
        />
      </table>
    </div>
  );
}

export default Budget;

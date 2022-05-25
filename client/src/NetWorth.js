import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";

function NetWorth({ user }) {
  const [statements, setStatements] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Statement")
  );

  const dates = statements.map((entry) => entry.date.slice(0, 7));
  const amounts = statements.map((entry) => entry.amount);

  const data = dates.map((date, i) => [date, amounts[i]]);
  data.unshift(["Date", "Net Worth"]);

  return (
    <div>
      <h2>Net Worth</h2>

      <div className="chart-wrapper">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={{ legend: { position: "none" } }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <RenderRows
          journalEntries={statements}
          setJournalEntries={setStatements}
          user={user}
          hasDate={true}
          categoryId={4}
        />
      </table>
    </div>
  );
}

export default NetWorth;

import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";

function NetWorth({ user }) {
  const [statements, setStatements] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Statement")
  );

  // const data = [
  //   ["Month", "Net Worth"],
  //   ["2004/05", 165],
  //   ["2005/06", 135],
  //   ["2006/07", 157],
  //   ["2007/08", 139],
  //   ["2008/09", 136],
  // ];

  const options = {
    isStacked: true,
    legend: { position: "none" },
  };

  const dates = statements.map((entry) => entry.date.slice(0, 7));
  // const datesUniq = [...new Set(dates)];

  const subCats = statements.map((entry) => entry.amount);

  const data = dates.map((date, i) => [date, subCats[i]]);
  data.unshift(["Date", "New Worth"]);

  return (
    <div>
      <h2>Net Worth</h2>

      <div className="chart-wrapper">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
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

import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";

function NetWorth({ user, masterList, setMasterList }) {
  const [statements, setStatements] = useState(
    masterList.filter((entry) => entry.category.name === "Statement")
  );

  function renderPie() {
    const dates = statements.map((entry) => entry.date.slice(0, 7));
    const amounts = statements.map((entry) => entry.amount);

    const data = dates.map((date, i) => [date, amounts[i]]);
    data.unshift(["Date", "Net Worth"]);

    return (
      <div className="chart-wrapper">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={{ legend: { position: "none" } }}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Net Worth</h2>

      {renderPie()}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Net Worth</th>
            <th>Notes</th>
          </tr>
        </thead>
        <RenderRows
          journalEntries={statements}
          setJournalEntries={setStatements}
          setMasterList={setMasterList}
          user={user}
          hasDate={true}
          categoryId={4}
          chooseCategory={false}
          selectCategory={"Net Worth"}
        />
      </table>
    </div>
  );
}

export default NetWorth;

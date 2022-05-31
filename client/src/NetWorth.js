import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";
import "./NetWorth.css";

function NetWorth({ user, masterList, setMasterList, setTab }) {
  const [statements, setStatements] = useState(
    masterList.filter((entry) => entry.category.name === "Statement")
  );

  setTab(3);

  function nwTotal() {
    const amounts = statements.map((entry) => entry.amount);
    return amounts.slice(-1)[0];
  }

  function renderArea() {
    const dates = statements.map((entry) => entry.date.slice(0, 7));
    const amounts = statements.map((entry) => entry.amount);

    const data = dates.map((date, i) => [date, amounts[i]]);
    data.unshift(["Date", "Net Worth"]);

    return (
      <div className="chart-wrapper">
        <div className="card-title nw-title">
          <span className="num">Net Worth</span>
          <span className="num">${nwTotal()}</span>
        </div>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={{
            legend: { position: "none" },
            backgroundColor: "none",
            colors: ["#00B0AE"],
            vAxis: {
              gridlineColor: "none",
              textStyle: {
                color: "rgb(161, 176, 182)",
                fontSize: 14,
              },
            },
            hAxis: {
              slantedText: true,
              slantedTextAngle: 30,
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

  return (
    <div className="wrapper">
      <div className="net-worth-wrapper wrapper">
        <div className="dash-tile NW-area">{renderArea()}</div>

        <table className="big">
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
            fullDate={false}
          />
        </table>
      </div>
    </div>
  );
}

export default NetWorth;

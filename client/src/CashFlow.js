import { useState } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";
import "./CashFlow.css";

function CashFlow({ user, masterList, setMasterList, setTab }) {
  const [canEdit, setCanEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [subTab, setSubTab] = useState(null);
  const [entries, setEntries] = useState(
    masterList.filter(
      (entry) =>
        entry.category.name === "Expense" || entry.category.name === "Income"
    )
  );

  setTab(4);

  function handleTab(category) {
    setSubTab(category);

    if (category) {
      setEntries(
        masterList
          .filter((entry) => entry.category.name === category)
          .sort((a, b) =>
            a.date
              ? new Date(a.date).setHours(0, 0, 0, 0) -
                new Date(b.date).setHours(0, 0, 0, 0)
              : b.amount - a.amount
          )
      );

      setCanEdit(true);
      setCategoryId(category === "Income" ? 1 : 2);
    } else {
      setEntries(
        masterList
          .filter(
            (entry) =>
              entry.category.name === "Expense" ||
              entry.category.name === "Income"
          )
          .sort((a, b) =>
            a.date
              ? new Date(a.date).setHours(0, 0, 0, 0) -
                new Date(b.date).setHours(0, 0, 0, 0)
              : b.amount - a.amount
          )
      );
      setCanEdit(false);
    }
  }

  function renderPie() {
    const budgetPieData = entries.map((entry) => [
      entry.sub_category.name,
      entry.amount,
    ]);
    budgetPieData.unshift(["Category", "Amount"]);

    return (
      <div className="chart-wrapper budget-chart">
        <Chart
          chartType="PieChart"
          width="100%"
          height="85vh"
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

  function renderArea() {
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
          height="400px"
          data={areaData}
          options={{
            legend: { position: "none" },
            backgroundColor: "none",
            colors: ["#0095d4"],
            vAxis: {
              // textPosition: "none",
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
    <div className="wrapper">
      <div className="net-worth-wrapper wrapper">
        <nav className="cashflow-nav">
          <div className="sub-nav">
            <h2 onClick={() => handleTab(null)}>Cash Flow</h2>
          </div>
          <div className="sub-nav">
            <h2 className="tab" onClick={() => handleTab("Income")}>
              Income
            </h2>
            <h2 className="tab" onClick={() => handleTab("Expense")}>
              Expense
            </h2>
          </div>
        </nav>

        <div className="net-worth-wrapper wrapper">
          {subTab ? (
            <div className="dash-tile NW-area">{renderPie()}</div>
          ) : (
            <div className="dash-tile NW-area">{renderArea()}</div>
          )}

          <table className="big">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Notes</th>
              </tr>
            </thead>
            <RenderRows
              journalEntries={entries}
              setJournalEntries={setEntries}
              setMasterList={setMasterList}
              user={user}
              hasDate={true}
              canEdit={canEdit}
              categoryId={categoryId}
              subTab={subTab}
            />
          </table>
        </div>
      </div>
    </div>
  );
}

export default CashFlow;

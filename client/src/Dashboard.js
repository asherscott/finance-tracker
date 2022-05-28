import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function Dashboard({ user, masterList }) {
  const [budgetEntries, setBudgetEntries] = useState(
    user.journal_entries
      .filter((entry) => entry.category.name === "Budget")
      .sort((a, b) => b.amount - a.amount)
  );
  const [statements, setStatements] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Statement")
  );

  const [income, setIncome] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Income")
  );

  const [expense, setExpense] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Expense")
  );

  const [entries, setEntries] = useState(
    user.journal_entries.filter(
      (entry) =>
        entry.category.name === "Expense" || entry.category.name === "Income"
    )
  );

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
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={budgetPieData}
          options={{
            title: "Budget",
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
          height="400px"
          data={data}
          options={{
            legend: { position: "none" },
            title: "Net Worth",
            backgroundColor: "none",
            hAxis: { ticks: [1, 2, 3] },
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
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={budgetPieData}
        options={{
          title: entries[0].category.name,
          pieHole: 0.6,
          backgroundColor: "none",
          colors:
            entries[0].category.name === "Expense"
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
                ],
          pieSliceText: "none",
          // isStacked: true,
          legend: { position: "none" },
        }}
      />
    );
  }

  function renderCFArea() {
    const dates = entries.map((entry) => entry.date.slice(5));
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
    areaData.unshift(["Date", "Cash Flow"]);

    return (
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={areaData}
        options={{
          legend: { position: "none" },
          title: "Cash Flow",
          backgroundColor: "none",
        }}
      />
    );
  }
  return (
    <div>
      <h2>Hello, {user.email.split("@", 1)}</h2>

      {renderNW()}
      {renderBudget()}
      {renderCashFlow(income)}
      {renderCashFlow(expense)}
      {renderCFArea()}
    </div>
  );
}

export default Dashboard;

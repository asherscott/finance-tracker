import { useState } from "react";
import { Chart } from "react-google-charts";

function Dashboard({ user }) {
  const [budgetEntries, setBudgetEntries] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Budget")
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
            //   colors: ["#FB7A21", "#050", "#666"],
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
          //   colors: ["#FB7A21", "#050", "#666"],
          pieSliceText: "none",
          // isStacked: true,
          legend: { position: "none" },
        }}
      />
    );
  }

  function renderCFArea() {
    const dates = entries.map((entry) => entry.date);
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

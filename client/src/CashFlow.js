import { useState, useEffect } from "react";
import RenderRows from "./RenderRows";
import { Chart } from "react-google-charts";

function CashFlow({ user }) {
  const [canEdit, setCanEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [tab, setTab] = useState(null);
  const [filterEntries, setFilterEntries] = useState(
    user.journal_entries.filter(
      (entry) =>
        entry.category.name === "Expense" || entry.category.name === "Income"
    )
  );
  const [entries, setEntries] = useState(
    user.journal_entries.filter(
      (entry) =>
        entry.category.name === "Expense" || entry.category.name === "Income"
    )
  );

  useEffect(() => {
    setFilterEntries(
      entries.filter((entry) => (tab ? entry.category.name === tab : true))
    );
  }, [entries]);

  function handleTab(category) {
    setTab(category);

    if (category) {
      setFilterEntries(
        entries.filter((entry) => entry.category.name === category)
      );
      setCanEdit(true);
      setCategoryId(category === "Income" ? 1 : 2);
    } else {
      setFilterEntries(entries);
      setCanEdit(false);
    }
  }

  const budgetPieData = filterEntries.map((entry) => [
    entry.sub_category.name,
    entry.amount,
  ]);
  budgetPieData.unshift(["Category", "Amount"]);

  return (
    <div>
      <h2 onClick={() => handleTab(null)}>Cash Flow</h2>
      <span onClick={() => handleTab("Income")}>Income</span>
      <span onClick={() => handleTab("Expense")}>Expense</span>

      <div className="chart-wrapper">
        {tab ? (
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={budgetPieData}
            options={{
              pieHole: 0.7,
              backgroundColor: "none",
              //   colors: ["#FB7A21", "#050", "#666"],
              pieSliceText: "none",
            }}
          />
        ) : null}
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
          journalEntries={filterEntries}
          setJournalEntries={setEntries}
          user={user}
          hasDate={true}
          canEdit={canEdit}
          categoryId={categoryId}
        />
      </table>
    </div>
  );
}

export default CashFlow;

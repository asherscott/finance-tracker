import { useState } from "react";
import RenderRows from "./RenderRows";

function CashFlow({ user }) {
  const [canEdit, setCanEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [entries, setEntries] = useState(
    user.journal_entries.filter(
      (entry) =>
        entry.category.name === "Expense" || entry.category.name === "Income"
    )
  );

  function handleTab(category) {
    if (category) {
      setEntries(
        user.journal_entries.filter((entry) => entry.category.name === category)
      );
      setCanEdit(true);
      setCategoryId(category === "Income" ? 1 : 2);
    } else {
      setEntries(
        user.journal_entries.filter(
          (entry) =>
            entry.category.name === "Expense" ||
            entry.category.name === "Income"
        )
      );
      setCanEdit(false);
    }
  }

  return (
    <div>
      <h2 onClick={() => handleTab(null)}>Cash Flow</h2>
      <span onClick={() => handleTab("Income")}>Income</span>
      <span onClick={() => handleTab("Expense")}>Expense</span>

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
          journalEntries={entries}
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

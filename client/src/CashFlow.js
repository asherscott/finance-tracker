import { useState } from "react";
import RenderRows from "./RenderRows";

function CashFlow({ user }) {
  const [expenses, setExpenses] = useState(
    user.journal_entries.filter(
      (entry) =>
        entry.category.name === "Expense" || entry.category.name === "Income"
    )
  );

  return (
    <div>
      <h2>Cash Flow</h2>

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
          journalEntries={expenses}
          setJournalEntries={setExpenses}
          user={user}
          hasDate={true}
        />
      </table>
    </div>
  );
}

export default CashFlow;

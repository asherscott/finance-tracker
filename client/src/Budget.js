import { useState } from "react";
import RenderRows from "./RenderRows";

function Budget({ user }) {
  const [budgetEntries, setBudgetEntries] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Budget")
  );

  return (
    <div>
      <h2>Budget</h2>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <RenderRows
          journalEntries={budgetEntries}
          setJournalEntries={setBudgetEntries}
          user={user}
        />
      </table>
    </div>
  );
}

export default Budget;

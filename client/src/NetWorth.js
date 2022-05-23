import { useState } from "react";
import RenderRows from "./RenderRows";

function NetWorth({ user }) {
  const [statements, setStatements] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Statement")
  );

  return (
    <div>
      <h2>Net Worth</h2>

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
        />
      </table>
    </div>
  );
}

export default NetWorth;

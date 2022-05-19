// import { useState } from "react";

function Budget({ user }) {
  //   const [budgetEntries, setBudgetEntries] = useState({});

  const renderBudget = user.journal_entries
    .filter((entry) => entry.category.name === "Budget")
    .map((item) => (
      <tr>
        <td>{item.sub_category.name}</td>
        <td>$ {item.amount}</td>
        <td>{item.note}</td>
      </tr>
    ));
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
        <tbody>{renderBudget}</tbody>
      </table>
    </div>
  );
}

export default Budget;

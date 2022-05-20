import { useState } from "react";

function Budget({ user }) {
  const [amount, setAmount] = useState({});
  const [note, setNote] = useState({});
  const [edit, setEdit] = useState(null);

  function handleEdit(entry) {
    setEdit(entry.id);
    setAmount(entry.amount);
    setNote(entry.note);
  }

  const budgetEntries = user.journal_entries.filter(
    (entry) => entry.category.name === "Budget"
  );

  const subCategories = budgetEntries.map((entry) => entry.sub_category.name);

  const renderOptions = subCategories
    .filter((category, index) => subCategories.indexOf(category) === index)
    .map((category) => <option key={category}>{category}</option>);

  const renderBudget = budgetEntries.map((entry) =>
    edit === entry.id ? (
      <tr key={entry.id}>
        <td>
          <select type="dropdown" name="sub_category">
            <option value="none" selected disabled hidden>
              {entry.sub_category.name}
            </option>
            {/* <option></option> */}
            {renderOptions}
          </select>
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            value={amount}
          />
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            name="note"
            value={note}
          />
        </td>
        <td>
          <button onClick={() => setEdit(null)}>save</button>
        </td>
      </tr>
    ) : (
      <tr key={entry.id}>
        <td>{entry.sub_category.name}</td>
        <td>$ {entry.amount}</td>
        <td>{entry.note}</td>
        <td>
          <button onClick={() => handleEdit(entry)}>edit</button>
        </td>
      </tr>
    )
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
        <tbody>{renderBudget}</tbody>
      </table>
    </div>
  );
}

export default Budget;

import { useState } from "react";

function Budget({ user }) {
  const [subCategory, setSubCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [edit, setEdit] = useState(null);
  const [budgetEntries, setBudgetEntries] = useState(
    user.journal_entries.filter((entry) => entry.category.name === "Budget")
  );

  const subCategories = budgetEntries.map((entry) => entry.sub_category.name);

  const renderOptions = subCategories
    .filter((category, index) => subCategories.indexOf(category) === index)
    .map((category) => <option key={category}>{category}</option>);

  const renderBudget = budgetEntries.map((entry) =>
    edit === entry.id ? (
      <tr key={entry.id}>
        <td>
          <select
            type="dropdown"
            onChange={(e) => setSubCategory(e.target.value)}
            name="sub_category"
          >
            <option value="none" selected disabled hidden>
              {entry.sub_category.name}
            </option>

            {renderOptions}

            <option>+ ...</option>
          </select>
        </td>
        <td>
          <input
            type="number"
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
          <button onClick={() => handleSave(entry.id)}>save</button>
        </td>
      </tr>
    ) : (
      <tr key={entry.id} onClick={() => handleEdit(entry)}>
        <td>{entry.sub_category.name}</td>
        <td>$ {entry.amount}</td>
        <td>{entry.note}</td>
        {/* <td>
          <button onClick={() => handleEdit(entry)}>edit</button>
        </td> */}
      </tr>
    )
  );

  function handleEdit(entry) {
    setEdit(entry.id);
    setSubCategory(entry.sub_category.name);
    setAmount(entry.amount);
    setNote(entry.note);
  }

  function onEdit(update) {
    setSubCategory("");
    setAmount("");
    setNote("");
    setEdit(null);
    setBudgetEntries((prev) => [
      ...prev.filter((entry) => entry.id !== update.id),
      update,
    ]);
  }

  function handleSave(id) {
    const subCategoryId = budgetEntries.find(
      (entry) => entry.sub_category.name === subCategory
    ).sub_category.id;

    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sub_category_id: subCategoryId, amount, note }),
    };

    fetch("/journal_entries/" + id, config).then((r) =>
      r.ok
        ? r.json().then((update) => onEdit(update))
        : r.json().then((error) => console.log(error))
    );
  }

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

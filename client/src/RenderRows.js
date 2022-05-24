import { useState, useEffect } from "react";

function RenderRows({ journalEntries, setJournalEntries, user }) {
  const [subCategory, setSubCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [edit, setEdit] = useState(null);
  const [newEntry, setNewEntry] = useState(false);
  const [newCategory, setNewCategory] = useState(false);

  useEffect(() => {
    setNewCategory(false);
    if (newEntry && edit) {
      setNewEntry(false);
    }
  }, [edit, newEntry]);

  const subCategories = journalEntries.map((entry) => entry.sub_category.name);

  const renderOptions = subCategories
    .filter((category, index) => subCategories.indexOf(category) === index)
    .map((category) => <option key={category}>{category}</option>);

  const renderEntries = journalEntries.map((entry) =>
    edit === entry.id ? (
      <tr key={entry.id}>
        <td>
          {!newCategory || newEntry ? (
            <select
              type="dropdown"
              onChange={(e) => {
                setSubCategory(e.target.value);
                if (e.target.value === "new") {
                  setNewCategory(!newCategory);
                  setSubCategory("");
                }
              }}
              name="sub_category"
            >
              <option value="none" selected disabled hidden>
                {entry.sub_category.name}
              </option>

              <option value="new">New Category</option>

              {renderOptions}
            </select>
          ) : (
            <input
              type="text"
              onChange={(e) => setSubCategory(e.target.value)}
              name="subCategory"
              value={subCategory}
            />
          )}
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
      <tr key={entry.id}>
        {entry.date ? <td>{entry.date.slice(0, 10)}</td> : null}
        <td onClick={() => handleEdit(entry)}>{entry.sub_category.name}</td>
        <td onClick={() => handleEdit(entry)}>$ {entry.amount}</td>
        <td onClick={() => handleEdit(entry)}>{entry.note}</td>
        <td>
          <button onClick={() => handleDelete(entry.id)}>X</button>
        </td>
      </tr>
    )
  );

  function isNewCategory(id) {
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category_id: 3,
        name: subCategory,
      }),
    };

    fetch("/sub_categories", config).then((r) =>
      r.ok
        ? r
            .json()
            .then((newCat) =>
              id ? patchEntry(id, newCat.id) : postEntry(newCat.id)
            )
        : r.json().then((error) => console.log(error))
    );
  }

  function patchEntry(id, newCatId) {
    const subCategoryId = journalEntries.find(
      (entry) => entry.sub_category.name === subCategory
    )
      ? journalEntries.find((entry) => entry.sub_category.name === subCategory)
          .sub_category.id
      : newCatId;

    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sub_category_id: subCategoryId,
        amount,
        note,
      }),
    };

    fetch("/journal_entries/" + id, config).then((r) =>
      r.ok
        ? r.json().then((update) => onEdit(update))
        : r.json().then((error) => console.log(error))
    );
  }

  function postEntry(newCatId) {
    const subCategoryId = journalEntries.find(
      (entry) => entry.sub_category.name === subCategory
    )
      ? journalEntries.find((entry) => entry.sub_category.name === subCategory)
          .sub_category.id
      : newCatId;

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sub_category_id: subCategoryId,
        amount,
        note,
        user_id: user.id,
      }),
    };

    fetch("/journal_entries", config).then((r) =>
      r.ok
        ? r.json().then((update) => {
            onEdit(update);
            setNewEntry(false);
          })
        : r.json().then((error) => console.log(error))
    );
  }

  function handleDelete(id) {
    fetch("/journal_entries/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      //   setEdit(false);
      setJournalEntries((prev) => [...prev.filter((entry) => entry.id !== id)]);
    });
  }

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
    setJournalEntries((prev) => [
      ...prev.filter((entry) => entry.id !== update.id),
      update,
    ]);
  }

  function handleSave(id) {
    if (!subCategory) {
      alert("error: select category");
    } else {
      if (!journalEntries.find((je) => je.sub_category.name === subCategory)) {
        isNewCategory(id);
      } else {
        id ? patchEntry(id) : postEntry();
      }
    }
  }

  return (
    <tbody>
      {renderEntries}
      {!newEntry ? (
        <tr>
          <td>
            <button
              onClick={() => {
                setNewEntry(true);
                setEdit(null);
              }}
            >
              +
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>
            {!newCategory ? (
              <select
                type="dropdown"
                onChange={(e) => {
                  setSubCategory(e.target.value);
                  if (e.target.value === "new") {
                    setNewCategory(!newCategory);
                    setSubCategory("");
                  }
                }}
                name="sub_category"
              >
                <option value="none" selected disabled hidden>
                  Select Category
                </option>

                <option value="new">New Category</option>

                {renderOptions}
              </select>
            ) : (
              <input
                type="text"
                onChange={(e) => setSubCategory(e.target.value)}
                name="subCategory"
                value={subCategory}
              />
            )}
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
            <button onClick={() => handleSave(null)}>save</button>
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default RenderRows;

import { useState, useEffect } from "react";

function RenderRows({ journalEntries, setJournalEntries, user, hasDate }) {
  const [subCategory, setSubCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [edit, setEdit] = useState(null);
  const [newEntry, setNewEntry] = useState(false);
  const [newCategory, setNewCategory] = useState(false);

  useEffect(() => {
    //   When editing a new category, if selecting a different row => show default category
    setNewCategory(false);
    //   When editing a new row, if selecting a different row => remove new row
    if (newEntry && edit) {
      setNewEntry(false);
    }
  }, [edit, newEntry]);

  const subCategories = journalEntries.map((entry) => entry.sub_category.name);

  const renderOptions = subCategories
    .filter((category, index) => subCategories.indexOf(category) === index)
    .map((category) => <option key={category}>{category}</option>);

  function handleOption(e) {
    setSubCategory(e.target.value);
    if (e.target.value === "new") {
      setNewCategory(!newCategory);
      setSubCategory("");
    }
  }

  function renderDate() {
    if (hasDate) {
      return (
        <td>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            name="date"
            value={date}
          />
        </td>
      );
    }
  }

  function renderInput(type, value, setValue) {
    return (
      <td>
        <input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          name={value}
          value={value}
        />
      </td>
    );
  }

  function renderSelect(entry, selectCat) {
    return (
      <select type="dropdown" onChange={handleOption} name="sub_category">
        <option value="none" selected disabled hidden>
          {entry ? entry.sub_category.name : selectCat}
        </option>

        <option value="new">New Category</option>

        {renderOptions}
      </select>
    );
  }

  function renderTableValue(entry, attr1, attr2, prepend) {
    return (
      <td onClick={() => handleEdit(entry)}>
        {prepend ? prepend : null}
        {attr2 ? entry[attr1][attr2] : entry[attr1]}
      </td>
    );
  }

  function renderButton(text, handleClick, params) {
    return (
      <td>
        <button onClick={() => handleClick(params)}>{text}</button>
      </td>
    );
  }

  const renderEntries = journalEntries.map((entry) =>
    edit === entry.id ? (
      // Displayed when editing a row
      <tr key={entry.id}>
        {renderDate(entry)}

        <td>
          {!newCategory || newEntry
            ? renderSelect(entry)
            : renderInput("text", subCategory, setSubCategory)}
        </td>

        {renderInput("number", amount, setAmount)}
        {renderInput("text", note, setNote)}

        {renderButton("save", handleSave, entry.id)}
      </tr>
    ) : (
      // Displayed by default, when NOT being edited
      <tr key={entry.id}>
        {hasDate ? renderTableValue(entry, "date") : null}

        {renderTableValue(entry, "sub_category", "name")}
        {renderTableValue(entry, "amount", null, "$")}
        {renderTableValue(entry, "note")}

        {renderButton("x", handleDelete, entry.id)}
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
        date,
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
        date,
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
      setJournalEntries((prev) => [...prev.filter((entry) => entry.id !== id)]);
    });
  }

  function handleEdit(entry) {
    setEdit(entry.id);
    setSubCategory(entry.sub_category.name);
    setAmount(entry.amount);
    setNote(entry.note);
    if (entry.date) {
      setDate(entry.date);
    }
  }

  function onEdit(update) {
    setSubCategory("");
    setAmount("");
    setNote("");
    setDate("");
    setEdit(null);
    setJournalEntries((prev) => [
      ...prev.filter((entry) => entry.id !== update.id),
      update,
    ]);
  }

  function handleSave(id) {
    if (!subCategory || (hasDate && !date)) {
      alert("error: fill inputs");
    } else {
      if (!journalEntries.find((je) => je.sub_category.name === subCategory)) {
        isNewCategory(id);
      } else {
        id ? patchEntry(id) : postEntry();
      }
    }
  }

  function renderNewRow() {
    return (
      <tr>
        {renderDate()}
        <td>
          {!newCategory
            ? renderSelect(null, "Select Category")
            : renderInput("text", subCategory, setSubCategory)}
        </td>
        {renderInput("number", amount, setAmount)}
        {renderInput("text", note, setNote)}
        <td>
          <button onClick={() => handleSave(null)}>save</button>
        </td>
      </tr>
    );
  }

  function handleNewRow() {
    setNewEntry(true);
    setEdit(null);
    setSubCategory("");
    setAmount("");
    setNote("");
    setDate("");
  }

  return (
    <tbody>
      {renderEntries}

      {!newEntry ? (
        <tr id="newRowButton">{renderButton("+", handleNewRow)}</tr>
      ) : (
        renderNewRow()
      )}
    </tbody>
  );
}

export default RenderRows;

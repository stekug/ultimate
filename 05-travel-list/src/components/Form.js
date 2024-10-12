import { useState } from 'react';

export default function Form({ onAddItems }) {
  const selectorArray = Array.from({ length: 20 }, (_, i) => i + 1);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = { description, amount, packed: false, id: crypto.randomUUID() };

    onAddItems(newItem);

    setDescription('');
    setAmount(1);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your Trip?</h3>
      <select onChange={handleAmountChange} value={amount}>
        {selectorArray.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="item"
        placeholder="Item..."
        value={description}
        onChange={handleDescriptionChange}
      ></input>
      <button>Add</button>
    </form>
  );
}

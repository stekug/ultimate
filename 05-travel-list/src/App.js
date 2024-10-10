import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((currItems) => [...currItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🛞</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X Items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

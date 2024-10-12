import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((currItems) => [...currItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((currItems) => currItems.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }

  function handleClearList() {
    const confirmed = window.confirm('Are you sure you want to delte all items?');
    if (confirmed) setItems([]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        {items.length > 0 && <button onClick={onClearList}>Clear List</button>}
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const itemsSum = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const packedPercent = Math.round((packedItems / itemsSum) * 100);

  return (
    <footer className="stats">
      {packedPercent === 100 ? (
        <em>You have packed everything! ✈️</em>
      ) : (
        <em>
          You have {itemsSum} Items on your list, and you already packed {packedItems} ({packedPercent}%)
        </em>
      )}
    </footer>
  );
}

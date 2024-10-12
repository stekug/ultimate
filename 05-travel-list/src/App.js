import { useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

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

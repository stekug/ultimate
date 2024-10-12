export default function Stats({ items }) {
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

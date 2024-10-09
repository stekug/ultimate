import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={``} />
      <div className="">
        <p className="">{name}</p>
        <p className="">{ingredients.join(', ')}</p>
        <div className="">
          {!soldOut ? (
            <p className="">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="t">Sold out</p>
          )}

          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

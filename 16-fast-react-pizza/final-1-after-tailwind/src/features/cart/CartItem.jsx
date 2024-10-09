import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="">
      <p className="">
        {quantity}&times; {name}
      </p>
      <div className="">
        <p className="">{formatCurrency(totalPrice)}</p>
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;

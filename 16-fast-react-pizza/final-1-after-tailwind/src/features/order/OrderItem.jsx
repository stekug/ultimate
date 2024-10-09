import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="">
      <div className="f">
        <p>
          <span className="">{quantity}&times;</span> {name}
        </p>
        <p className="">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;

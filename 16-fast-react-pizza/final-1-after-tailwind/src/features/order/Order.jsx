// Test ID: IIDSAT

import OrderItem from './OrderItem';

import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="">
      <div className="">
        <h2 className="">Order #{id} status</h2>

        <div className="">
          {priority && <span className="">Priority</span>}
          <span className="">{status} order</span>
        </div>
      </div>

      <div className="">
        <p className="">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="">
        <p className="">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="">Price priority: {formatCurrency(priorityPrice)}</p>
        )}
        <p className="">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;

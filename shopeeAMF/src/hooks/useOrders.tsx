import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import type { Order } from "../interfaces";

export function useOrders() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/orders/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user]);

  const haveProductsToPay = orders.some((order) => order.status === "to_pay");
  const haveProductsToReceive = orders.some(
    (order) => order.status === "to_receive"
  );
  const haveProductsToReview = orders.some(
    (order) => order.status === "to_review"
  );

  return {
    orders,
    haveProductsToPay,
    haveProductsToReceive,
    haveProductsToReview,
  };
}

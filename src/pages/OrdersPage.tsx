import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";

import {Link as RouterLink} from "react-router-dom";

import {
  selectGetOrdersError,
  selectGetOrdersLoading,
  selectOrders,
  selectOrdersFetched,
} from "../features/orders/orders.selectors";

import { getOrdersThunk } from "../features/orders/orders.thunks";

import { Alert, Button, Card, Container, Typography } from "@mui/material";
import formatCurrency from "../utils/formatCurrency";

const OrdersPage = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectGetOrdersLoading);
  const error = useAppSelector(selectGetOrdersError);
  const isFetched = useAppSelector(selectOrdersFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getOrdersThunk());
    }
  }, [dispatch, isFetched]);

  if (loading)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Orders
        </Typography>
        <Typography>Loading Orders...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Orders
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (orders.length === 0)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Orders
        </Typography>
        <Typography>You don't have any orders yet.</Typography>
      </Container>
    );
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Orders
      </Typography>
      {orders.map((order) => (
        <Card key={order.id}>
          <Typography>Order #{order.id}</Typography>
          <Typography>{order.status}</Typography>
          <Typography>{formatCurrency(order.subtotal)}</Typography>
          <Typography>
            {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Button component={RouterLink} to={`/orders/${order.id}`}>
            View Details
          </Button>{" "}
        </Card>
      ))}
    </Container>
  );
};

export default OrdersPage;

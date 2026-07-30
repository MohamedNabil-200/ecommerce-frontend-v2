import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";

import {
  selectGetOrderDetailsError,
  selectGetOrderDetailsLoading,
  selectSelectedOrder,
} from "../features/orders/orders.selectors";
import { getOrderDetailsThunk } from "../features/orders/orders.thunks";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import formatCurrency from "../utils/formatCurrency";

const OrderDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  const order = useAppSelector(selectSelectedOrder);
  const loading = useAppSelector(selectGetOrderDetailsLoading);
  const error = useAppSelector(selectGetOrderDetailsError);
  const isStale = !order || order.id !== orderId;

  useEffect(() => {
    if (!Number.isNaN(orderId)) {
      dispatch(getOrderDetailsThunk(orderId));
    }
  }, [dispatch, orderId]);

  if (Number.isNaN(orderId)) {
    return <Navigate to="/orders" replace />;
  }

  if (loading || (isStale && !error))
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Orders Details
        </Typography>
        <Typography>Loading Orders...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Orders Details
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (isStale)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Orders Details
        </Typography>
        <Typography>Not Found</Typography>
      </Container>
    );

  return (
    <Container sx={{ py: 2 }}>
      <Typography>Order #{order.id}</Typography>

      <Typography>Status: {order.status}</Typography>

      <Typography>
        Created At: {new Date(order.createdAt).toLocaleDateString()}
      </Typography>

      <Typography>
        Subtotal: {formatCurrency(Number(order.subtotal))}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={2}>
        {order.items.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Box
                    component="img"
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 10 }}>
                  <Stack spacing={1}>
                    <Typography variant="h6">{item.product.title}</Typography>

                    <Typography>
                      Price: {formatCurrency(Number(item.price))}
                    </Typography>

                    <Typography>Quantity: {item.quantity}</Typography>

                    <Typography sx={{ fontWeight: 600 }}>
                      Total:{" "}
                      {formatCurrency(Number(item.price) * item.quantity)}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default OrderDetailsPage;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";

import { Link as RouterLink } from "react-router-dom";

import {
  selectGetOrdersError,
  selectGetOrdersLoading,
  selectOrders,
  selectOrdersFetched,
} from "../features/orders/orders.selectors";

import { getOrdersThunk } from "../features/orders/orders.thunks";

import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import type { ChipPropsColorOverrides } from "@mui/material";
import type { OverridableStringUnion } from "@mui/types";
import formatCurrency from "../utils/formatCurrency";
import OrdersEmptyState from "../components/orders/OrdersEmptyState";

const OrdersPage = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectGetOrdersLoading);
  const error = useAppSelector(selectGetOrdersError);
  const isFetched = useAppSelector(selectOrdersFetched);

  const statusColorMap: Record<
    string,
    OverridableStringUnion<
      | "warning"
      | "success"
      | "error"
      | "info"
      | "default"
      | "primary"
      | "secondary",
      ChipPropsColorOverrides
    >
  > = {
    PENDING: "warning",
    COMPLETED: "success",
    CANCELLED: "error",
  };

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
        <Stack spacing={2}>
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent>
                <Stack spacing={2}>
                  <Skeleton variant="text" width="40%" height={35} />
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="50%" />
                  <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                    <Skeleton variant="rounded" width={120} height={36} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
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
        <OrdersEmptyState />
      </Container>
    );
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Orders
      </Typography>
      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            mb: 2,
            transition: "0.2s ease",
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <CardContent>
            {/* Header */}
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography>Order #{order.id}</Typography>
              <Chip
                label={order.status}
                color={statusColorMap[order.status] ?? "default"}
              />
            </Stack>

            {/* Metadata */}
            <Stack spacing={0.5}>
              <Typography variant="body2" color="textSecondary">
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>

              <Typography variant="body2">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
                {" • "}
                {formatCurrency(Number(order.subtotal))}
              </Typography>
            </Stack>

            {/* Footer */}
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button
                component={RouterLink}
                to={`/orders/${order.id}`}
                variant="text"
              >
                View Details →
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default OrdersPage;

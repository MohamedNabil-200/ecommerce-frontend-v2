import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { registerThunk } from "../../features/auth/auth.thunks";
import { selectRegisterLoading } from "../../features/auth/auth.selectors";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PasswordField from "../../components/auth/PasswordField";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../features/auth/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterRequest } from "../../features/auth/auth.types";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const request: RegisterRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    const resultAction = await dispatch(registerThunk(request));

    if (registerThunk.fulfilled.match(resultAction)) {
      navigate("/auth/login");
    }
  };
  return (
    <Card sx={{ width: "100%", maxWidth: 450 }}>
      <CardContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Register
            </Typography>
            <TextField
              label="First Name"
              type="text"
              fullWidth
              {...register("firstName")}
              error={!!errors.firstName && (touchedFields.firstName || isSubmitted)}
              helperText={
                touchedFields.firstName || isSubmitted ? errors.firstName?.message : ""
              }
            />
            <TextField
              label="Last Name"
              type="text"
              fullWidth
              {...register("lastName")}
              error={!!errors.lastName && (touchedFields.lastName || isSubmitted)}
              helperText={
                touchedFields.lastName || isSubmitted ? errors.lastName?.message : ""
              }
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email && (touchedFields.email || isSubmitted)}
              helperText={touchedFields.email || isSubmitted ? errors.email?.message : ""}
            />
            <PasswordField
              label="Password"
              {...register("password")}
              error={!!errors.password && (touchedFields.password || isSubmitted)}
              helperText={
                touchedFields.password || isSubmitted ? errors.password?.message : ""
              }
            />
            <PasswordField
              label="Confirm Password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword && (touchedFields.confirmPassword || isSubmitted)}
              helperText={
                touchedFields.confirmPassword || isSubmitted
                  ? errors.confirmPassword?.message
                  : ""
              }
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Register
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/auth/login"
                underline="hover"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;

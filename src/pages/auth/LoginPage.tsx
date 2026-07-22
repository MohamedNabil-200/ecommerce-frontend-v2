import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PasswordField from "../../components/auth/PasswordField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormValues,
} from "../../features/auth/auth.schemas";
import { loginThunk } from "../../features/auth/auth.thunks";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectLoginLoading } from "../../features/auth/auth.selectors";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    const resultAction = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 450 }}>
      <CardContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Login
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email && (touchedFields.email || isSubmitted)}
              helperText={touchedFields.email || isSubmitted ? errors.email?.message : ""}
            />
            <PasswordField
              {...register("password")}
              error={!!errors.password && (touchedFields.password || isSubmitted)}
              helperText={
                touchedFields.password || isSubmitted ? errors.password?.message : ""
              }
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/auth/register"
                underline="hover"
                sx={{ fontWeight: 600 }}
              >
                Register
              </Link>
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginPage;

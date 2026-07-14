import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PasswordField from "../../components/auth/PasswordField";

const RegisterPage = () => {
  return (
    <Card sx={{ width: "100%", maxWidth: 450 }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Register
          </Typography>
          <TextField label="Name" type="text" fullWidth />
          <TextField label="Email" type="email" fullWidth />
          <PasswordField label="Password" name="password" />
          <PasswordField label="Confirm Password" name="confirmPassword" />
          <Button variant="contained" fullWidth>
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
      </CardContent>
    </Card>
  );
};

export default RegisterPage;

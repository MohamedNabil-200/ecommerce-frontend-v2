import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PasswordField from "../../components/auth/PasswordField";

const LoginPage = () => {
  return (
    <Card sx={{ width: "100%", maxWidth: 450 }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <TextField label="Email" type="email" fullWidth />
          <PasswordField />
          <Button variant="contained" fullWidth>
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
      </CardContent>
    </Card>
  );
};

export default LoginPage;

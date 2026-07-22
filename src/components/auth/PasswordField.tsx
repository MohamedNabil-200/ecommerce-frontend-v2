import { useState } from "react";
import { IconButton, InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

type PasswordFieldProps = TextFieldProps & {
  name?: string;
  label?: string;
  fullWidth?: boolean;
};
const PasswordField = ({
  name = "password",
  label = "Password",
  fullWidth = true,
  ...props
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth={fullWidth}
      {...props}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordField;

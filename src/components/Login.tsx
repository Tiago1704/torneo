import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Paper, Typography, Box } from "@mui/material";

export function Login(): JSX.Element {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", background: "#f3e5f5" }}>
        <Typography component="h1" variant="h5" sx={{ color: "#6a1b9a" }}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: "1rem" }}>
          {error && <Alert message={error} />}
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
            <Link to="#" onClick={handleResetPassword} style={{ textDecoration: "none", color: "#1976d2" }}>
              Forgot Password?
            </Link>
          </Box>
        </form>
        <Button
          onClick={handleGoogleSignin}
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem", background: "#6a1b9a", color: "#ffffff" }}
        >
          Google Sign In
        </Button>
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="body2">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

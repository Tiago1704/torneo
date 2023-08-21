import React from "react";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import { Container, Paper, Typography } from "@mui/material";

export function Home(): JSX.Element {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error?.message || "Error de deslogueo");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", background: "#f3e5f5" }}>
        <Typography variant="h4" sx={{ color: "#6a1b9a", marginBottom: "1rem" }}>
          Welcome {user?.displayName || user?.email}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ background: "#6a1b9a", color: "#ffffff" }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

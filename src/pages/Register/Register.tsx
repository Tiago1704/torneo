import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../components/Alert";
import { Container, Paper, Typography, TextField, Button, Link as MuiLink } from "@mui/material";
// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"; // Importa el módulo de base de datos en lugar de firestore
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function Register(): JSX.Element {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    lolUser: "",
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
      const docRef = await addDoc(collection(db, "users"), {
        name: user.name,
        lastname: user.lastName,
        email: user.email,
        userlol: user.lolUser,
        password: user.password
      });
      console.log("Document written with ID: ", docRef);

      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", background: "#f3e5f5" }}>
        {error && <Alert message={error} />}
        <Typography variant="h5" sx={{ color: "#6a1b9a", marginBottom: "1rem" }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="Nombre"
            name="name"
            type="string"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="Apellido"
            name="lastName"
            type="string"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="Usuario de LOL"
            name="lolUser"
            type="string"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem", background: "#6a1b9a", color: "#ffffff" }}
            fullWidth
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login" color="secondary">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
}

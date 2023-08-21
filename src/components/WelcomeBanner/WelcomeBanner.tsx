import React from "react";
import { Paper, Typography } from "@mui/material";

interface WelcomeBannerProps {
  user: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = (props: WelcomeBannerProps) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", background: "#6a1b9a" }}>
      <Typography variant="h4" sx={{ color: "#ffffff", marginBottom: "1rem" }}>
        ¡Bienvenido, {props.user}!
      </Typography>
    </Paper>
  );
};

export default WelcomeBanner;

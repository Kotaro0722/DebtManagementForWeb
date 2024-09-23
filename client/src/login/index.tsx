import { Box, Button, Typography } from "@mui/material";

export const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        backgroundColor: "#282c34",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Typography fontSize={50}>借金管理 For Web</Typography>
      <Button
        sx={{
          backgroundColor: "white",
          fontSize: "40px",
          fontWeight: "bold",
          width: "200px",
        }}
        href="https://discord.com/oauth2/authorize?client_id=1287592892390707230&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmain&scope=identify"
      >
        Login
      </Button>
    </Box>
  );
};

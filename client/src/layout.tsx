import { Box } from "@mui/material";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#282c34",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {children}
    </Box>
  );
};

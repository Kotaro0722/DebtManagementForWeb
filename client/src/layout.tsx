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
        height: "calc(100vh - 24px - 24px - 64px)",
        color: "white",
        p: 3,
      }}
    >
      {children}
    </Box>
  );
};

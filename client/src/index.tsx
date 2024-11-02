import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./page/login";
import { Dashboard } from "./page/dashboard";
import { Header } from "./page/header";
import { createTheme, ThemeProvider } from "@mui/material";
import { Layout } from "./layout";
import { Detail } from "./page/detail";
import { NewCredit } from "./page/newCredit";
import { ConfirmPayment } from "./page/confirmPayment";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#303030",
      dark: "#2C2C2C",
      light: "#B3B3B3",
    },
    secondary: {
      main: "#B2B2B2",
    },
    background: {
      default: "#282c34",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <ThemeProvider theme={theme}>
            <Header />
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
              <Routes>
                <Route path="/credit" element={<Detail title="Credit" />} />
              </Routes>
              <Routes>
                <Route path="/total" element={<Detail title="Total" />} />
              </Routes>
              <Routes>
                <Route path="/debt" element={<Detail title="Debt" />} />
              </Routes>
              <Routes>
                <Route path="/newCredit" element={<NewCredit />} />
              </Routes>
              <Routes>
                <Route path="confirmPayment" element={<ConfirmPayment />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        }
      />
    </Routes>
  </BrowserRouter>
);

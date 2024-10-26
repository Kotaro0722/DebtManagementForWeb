import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [value, setValue] = useState<string>("dashboard");

  const navigate = useNavigate();

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h6" color="black">
          Debt Management For Web
        </Typography>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="navigation tab"
        >
          <NavigationTab value="dashboard" label="Dashboard" disableRipple />
          <NavigationTab value="debt" label="Debt" disableRipple />
          <NavigationTab value="total" label="Total" disableRipple />
          <NavigationTab value="credit" label="Credit" disableRipple />
          <NavigationTab value="newCredit" label="New Credit" disableRipple />
          <NavigationTab
            value="confirmPayment"
            label="Confirm Payment"
            disableRipple
          />
        </Tabs>
        <Button sx={{ backgroundColor: "black", color: "white" }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const NavigationTab = styled(Tab)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
  fontWeight: "600",
}));

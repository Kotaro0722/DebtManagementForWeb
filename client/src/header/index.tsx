import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

export const Header = () => {
  const [value, setValue] = useState<string>("Dashboard");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
          <NavigationTab value="Dashboard" label="Dashboard" disableRipple />
          <NavigationTab value="Credit" label="Credit" disableRipple />
          <NavigationTab value="Debt" label="Debt" disableRipple />
          <NavigationTab value="Total" label="Total" disableRipple />
          <NavigationTab value="NewCredit" label="New Credit" disableRipple />
          <NavigationTab
            value="ConfirmPayment"
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

import {
  AppBar,
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { UserInfoType } from ".";
import { useNavigate } from "react-router-dom";

type HeaderLayoutProps = {
  value: string;
  handleTabChange: (e: SyntheticEvent, newValue: string) => void;
  userInfo: UserInfoType | null;
};

export const HeaderLayout = ({
  value,
  handleTabChange,
  userInfo,
}: HeaderLayoutProps) => {
  const navigate = useNavigate();
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
        <ListItem sx={{ width: "fit-content" }}>
          <ListItemAvatar>
            <Avatar
              src={`https://cdn.discordapp.com/avatars/${userInfo?.discord_id}/${userInfo?.avatar_id}`}
              alt="Icon"
            />
          </ListItemAvatar>
          <ListItemText
            primary={userInfo?.user_name}
            sx={{ width: "fit-content", color: "black" }}
          />
        </ListItem>
        <Button
          sx={{ backgroundColor: "black", color: "white" }}
          onClick={() => {
            navigate("/login");
          }}
        >
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

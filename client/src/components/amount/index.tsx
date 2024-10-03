import { Box, Paper } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import GppGoodIcon from "@mui/icons-material/GppGood";
import CurrencyYenRoundedIcon from "@mui/icons-material/CurrencyYenRounded";

export type AmountProps = {
  isPlus: boolean;
  amount: number;
};

export const Amount = ({ isPlus, amount }: AmountProps) => {
  return (
    <Paper
      sx={{
        borderRadius: "10px",
        display: "grid",
        width: "200px",
        marginX: "auto",
      }}
    >
      <Box
        sx={{
          width: "fit-content",
          marginX: "auto",
          fontSize: "50px",
          color: isPlus ? "#34C759" : "#FF3B30",
        }}
      >
        {isPlus ? (
          <GppGoodIcon fontSize="inherit" />
        ) : (
          <ErrorIcon fontSize="inherit" />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: isPlus ? "#34C759" : "#FF3B30",
          fontSize: "50px",
          fontWeight: "bold",
          width: "fit-content",
          marginX: "auto",
        }}
      >
        <CurrencyYenRoundedIcon fontSize="inherit" />
        {amount}
      </Box>
    </Paper>
  );
};

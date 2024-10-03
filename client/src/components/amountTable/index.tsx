import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CurrencyYenRoundedIcon from "@mui/icons-material/CurrencyYenRounded";
import { theme } from "../..";

export type ListType = {
  name: string;
  amount: number;
};

type AmountTableProps = {
  title: string;
  isPlus: boolean;
  amount: number;
  list: ListType[];
  detailLink: string;
};

export const AmountTable = ({
  title,
  isPlus,
  amount,
  list,
  detailLink,
}: AmountTableProps) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        gap: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">name</StyledTableCell>
              <StyledTableCell align="center">amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item) => {
              return (
                <StripeTableRow>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.amount}
                  </StyledTableCell>
                </StripeTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => navigate(detailLink)}
        sx={{
          backgroundColor: theme.palette.primary.dark,
          color: "white",
          borderRadius: "10px",
        }}
        disableRipple
      >
        Show More
      </Button>
    </Paper>
  );
};

const StripeTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "20px",
}));

import {
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import { dateFormatter } from "../../utils/dateFormatter";

export type HistoryListType = {
  amount: number;
  createdAt: Date;
  detail: string;
  paid: boolean;
};

type HistoryTableProps = {
  list: HistoryListType[] | null;
};

export const HistoryTable = ({ list }: HistoryTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ width: "80%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Post Date</StyledTableCell>
            <StyledTableCell align="center">Detail</StyledTableCell>
            <StyledTableCell align="center">Paid</StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box
        sx={{
          maxHeight:
            "calc(100vh - 64px - 24px  - 150px - 32px - 16px - 65px - 24px - 57px - 24px - 24px)",
          overflowY: "scroll",
          //   maxHeight: "430px",
        }}
      >
        <Table>
          <TableBody>
            {list?.map((item, index) => {
              return (
                <StripeTableRow key={index}>
                  <StyledTableCell align="center">
                    {item.amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dateFormatter(item.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.detail}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.paid && "済"}
                  </StyledTableCell>
                </StripeTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
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

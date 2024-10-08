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
  Modal,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { dateFormatter } from "../../utils/dateFormatter";
import { useEffect, useState } from "react";
import { LabelTypography } from "../../newCredit";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type HistoryListType = {
  name: string;
  amount: number;
  createdAt: Date;
  message: string;
  paid: boolean;
};

type HistoryTableProps = {
  list: HistoryListType[] | null;
  isEditable?: boolean;
};

const schema = z.object({
  billing: z
    .string({ required_error: "Select your Billing Address" })
    .refine((value) => value !== "noSelection", {
      message: "Select your Billing Address",
    }),
  amount: z
    .string()
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Amount must be a number",
    })
    .refine((value) => value !== "0" && value !== "", {
      message: "Enter the Amount",
    }),
  message: z.string().optional(),
  isPaid: z.boolean(),
});

type FormSchema = z.infer<typeof schema>;

export const HistoryTable = ({ list, isEditable }: HistoryTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [billingOption, setBillingOption] = useState<string[]>([
    "田中太郎",
    "佐藤次郎",
  ]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(schema), mode: "onChange" });

  const handleOnSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "80%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ display: "flex" }}>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Post Date</StyledTableCell>
              <StyledTableCell align="center">Message</StyledTableCell>
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
                  <StripeTableRow
                    key={index}
                    sx={{ cursor: isEditable ? "pointer" : "default" }}
                    onClick={() => {
                      if (isEditable) {
                        setIsModalOpen(true);
                        setValue("billing", item.name);
                        setValue("amount", item.amount.toString());
                        setValue("message", item.message);
                        setValue("isPaid", item.paid);
                      }
                    }}
                  >
                    <StyledTableCell align="center">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.amount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {dateFormatter(item.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.message}
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
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "70%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
          }}
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Box>
            <LabelTypography>Billing</LabelTypography>
            <Controller
              name="billing"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ width: "300px" }} error={!!errors.billing}>
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem value="noSelection">No Selection</MenuItem>
                    {billingOption?.map((option, index) => (
                      <MenuItem value={option} key={index}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {typeof errors.billing?.message === "string" && (
                    <FormHelperText>{errors.billing.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Box>
            <LabelTypography>Amount</LabelTypography>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Amount"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  sx={{ width: "300px" }}
                />
              )}
            />
          </Box>
          <Box>
            <LabelTypography>Message</LabelTypography>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="message"
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  sx={{ width: "300px" }}
                />
              )}
            />
          </Box>
          <Box>
            <LabelTypography>Paid</LabelTypography>
            <Controller
              name="isPaid"
              control={control}
              render={({ field }) => (
                <FormGroup {...field}>
                  <FormControlLabel
                    control={<Checkbox name="check" checked={field.value} />}
                    label="Payment Confirmed"
                    sx={{ width: "300px" }}
                  />
                </FormGroup>
              )}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "300px",
              height: "40px",
              borderRadius: "10px",
            }}
          >
            Confirm
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

const StripeTableRow = styled(TableRow)(({ theme }) => ({
  display: "flex",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  flex: 1,
  fontSize: "20px",
}));

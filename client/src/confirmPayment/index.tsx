import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { HistoryListType, HistoryTable } from "../components/historyTable";
import { useEffect, useState } from "react";
import { Amount } from "../components/amount";
import { theme } from "..";

export const ConfirmPayment = () => {
  const [history, setHistory] = useState<HistoryListType[] | null>(null);
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const [operation, setOperation] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [targetOption, setTargetOption] = useState<string[] | null>(null);

  const handleOperationChange = (event: SelectChangeEvent) => {
    setOperation(event.target.value as string);
  };
  const handleTargetChange = (event: SelectChangeEvent) => {
    setTarget(event.target.value as string);
  };

  useEffect(() => {
    setHistory([
      {
        name: "田中太郎",
        amount: 100,
        createdAt: new Date(),
        message: "テンホウ",
        paid: false,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "田中太郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "佐藤次郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "佐藤次郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "佐藤次郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
      {
        name: "佐藤次郎",
        amount: 200,
        createdAt: new Date(),
        message: "大将",
        paid: true,
        isCredit: true,
      },
    ]);
    setTargetOption(["田中太郎", "佐藤次郎"]);
  }, []);

  return (
    <Grid2 container columnSpacing={2}>
      <Grid2 container size={6} component="div" sx={{ maxHeight: "800px" }}>
        <HistoryTable list={history} />
      </Grid2>
      <Grid2 container size={6} justifyContent="center" alignItems="center">
        <Paper
          sx={{
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            p: 3,
            backgroundColor: theme.palette.primary.light,
            height: "fit-content",
          }}
        >
          <Stack gap={4} flexDirection="row">
            <FormControl fullWidth sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Operation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operation}
                label="Operation"
                onChange={handleOperationChange}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="full">Full Payment</MenuItem>
                <MenuItem value="partial">Partial Payment</MenuItem>
                <MenuItem value="offset">Offset Payment</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Target</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={target}
                label="Target"
                onChange={handleTargetChange}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                {targetOption?.map((message, index) => {
                  return (
                    <MenuItem value={message} key={index}>
                      {message}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
          <Amount isPlus={isPlus} amount={amount} title="Amount" />
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
            Confirm Payment
          </Button>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

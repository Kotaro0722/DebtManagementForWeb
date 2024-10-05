import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Amount } from "../components/amount";
import { theme } from "..";
import { HistoryListType, HistoryTable } from "../components/historyTable";

export const Credit = () => {
  const [amount, setAmount] = useState<number>(0);
  const [history, setHistory] = useState<HistoryListType[] | null>(null);
  const [debtorOption, setDebtorOption] = useState<string[] | null>(null);
  const [debtor, setDebtor] = useState<string>("");
  const [isOnlyUnpaid, setIsOnlyUnpaid] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setDebtor(event.target.value as string);
  };
  const handleOnChangeUnpaid = () => {
    setIsOnlyUnpaid((prevState) => !prevState);
  };

  useEffect(() => {
    setDebtorOption(["田中太郎", "佐藤次郎"]);
    setHistory([
      { amount: 100, createdAt: new Date(), detail: "テンホウ", paid: false },
      { amount: 200, createdAt: new Date(), detail: "大将", paid: true },
      { amount: 200, createdAt: new Date(), detail: "大将", paid: true },
      { amount: 200, createdAt: new Date(), detail: "大将", paid: true },
      { amount: 200, createdAt: new Date(), detail: "大将", paid: true },
      { amount: 200, createdAt: new Date(), detail: "大将", paid: true },
      { amount: 200, createdAt: new Date(), detail: "大将", paid: true },
    ]);
  }, []);

  return (
    <Grid2 container wrap="nowrap" direction="column" rowSpacing={4}>
      <Grid2 size={12}>
        <Amount isPlus amount={amount} />
      </Grid2>
      <Grid2 size={12}>
        <Paper
          sx={{
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            mx: "auto",
            py: 3,
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <Grid2 container columnSpacing={5}>
            <FormControl fullWidth sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Debtor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={debtor}
                label="Debtor"
                onChange={handleChange}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="all">all</MenuItem>
                {debtorOption?.map((debtor, index) => {
                  return (
                    <MenuItem value={debtor} key={index}>
                      {debtor}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOnlyUnpaid}
                  onChange={handleOnChangeUnpaid}
                />
              }
              label="Only Unpaid"
            />
          </Grid2>
          <HistoryTable list={history} />
        </Paper>
      </Grid2>
      <Grid2 size={12}></Grid2>
    </Grid2>
  );
};

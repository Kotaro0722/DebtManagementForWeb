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
import { useLocation } from "react-router-dom";

type DetailProps = {
  title: string;
};

export const Detail = ({ title }: DetailProps) => {
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [detailOption, setDetailOption] = useState<string[] | null>(null);
  const [isOnlyUnpaid, setIsOnlyUnpaid] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryListType[] | null>(null);

  const location = useLocation();

  const handleChange = (event: SelectChangeEvent) => {
    setMessage(event.target.value as string);
  };
  const handleOnChangeUnpaid = () => {
    setIsOnlyUnpaid((prevState) => !prevState);
  };

  useEffect(() => {
    setIsPlus(location.pathname === "/credit" || location.pathname !== "/debt");

    setDetailOption(["田中太郎", "佐藤次郎"]);

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
  }, []);

  return (
    <Grid2 container wrap="nowrap" direction="column" rowSpacing={4}>
      <Grid2 size={12}>
        <Amount isPlus={isPlus} amount={amount} title={title} />
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
              <InputLabel id="demo-simple-select-label">{title}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={message}
                label="Detail"
                onChange={handleChange}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="all">all</MenuItem>
                {detailOption?.map((message, index) => {
                  return (
                    <MenuItem value={message} key={index}>
                      {message}
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

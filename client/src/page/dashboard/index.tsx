import { Grid2 } from "@mui/material";
import { Amount } from "../../components/amount";
import { AmountTable, ListType } from "../../components/amountTable";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [debtList, setDebtList] = useState<ListType[] | null>([
    { name: "田中太郎", amount: 500 },
    { name: "田中太郎", amount: 500 },
    { name: "田中太郎", amount: 500 },
    { name: "田中太郎", amount: 500 },
    { name: "田中太郎", amount: 500 },
  ]);
  const [totalList, setTotalList] = useState<ListType[] | null>(null);
  const [creditList, setCreditList] = useState<ListType[] | null>(null);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <Grid2 container rowSpacing={4} wrap="nowrap" direction="column">
      <Grid2 size={12}>
        <Amount isPlus={true} amount={100} />
      </Grid2>
      <Grid2 container columnSpacing={4}>
        <Grid2 size={4}>
          <AmountTable
            title="Debt"
            isPlus={false}
            amount={100}
            list={debtList}
            detailLink=""
          />
        </Grid2>
        <Grid2 size={4}>
          <AmountTable
            title="Total"
            isPlus={false}
            amount={100}
            list={totalList}
            detailLink=""
          />
        </Grid2>
        <Grid2 size={4}>
          <AmountTable
            title="Credit"
            isPlus={true}
            amount={100}
            list={creditList}
            detailLink=""
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

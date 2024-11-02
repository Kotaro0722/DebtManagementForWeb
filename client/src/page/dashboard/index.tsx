import { ListType } from "../../components/amountTable";
import { useState } from "react";
import { DashboardLayout } from "./layout";

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

  return (
    <DashboardLayout
      debtList={debtList}
      totalList={totalList}
      creditList={creditList}
    />
  );
};

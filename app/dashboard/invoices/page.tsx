'use client'

import { RootState } from "@/app/lib/store";
import { useSelector } from "react-redux";

const InvoicesPage = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <div>Invoice: {user.name}</div>
    </div>
  );
};

export default InvoicesPage;

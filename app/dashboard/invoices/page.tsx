'use client'

import { useSelector } from "react-redux";

const InvoicesPage = () => {
  const auth = useSelector(state => state);
  console.log('invoice : ', auth)
  return (
    <div>
      <div>Invoice</div>
    </div>
  );
};

export default InvoicesPage;

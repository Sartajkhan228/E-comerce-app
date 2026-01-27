import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../types/user-reducer";
import toast from "react-hot-toast";
import { useAllOrdersQuery } from "../../redux/api/orderApi";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const arr: Array<DataType> = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    status: <span className="red">Processing</span>,
    quantity: 3,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },

  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  const adminId = user?._id;

  const { data, isLoading, isError, error } = useAllOrdersQuery(adminId as string,
    { skip: !adminId }
  );
  const [rows, setRows] = useState<DataType[]>(arr);


  console.log("DATA IN TRANSACTIONS", data)


  useEffect(() => {
    if (isError && error) {
      if ("data" in error) {
        toast.error((error.data as any)?.message);
      } else {
        toast.error("Network error");
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (!data) return;
    setRows(data.orders.map((item) => ({
      user: item.user.name,
      amount: item.total,
      discount: item.discount,
      quantity: item.orderItems.length,
      status: <span className="green">Shipped</span>,
      action: <Link to={`/admin/transaction/${item._id}`}>Manage</Link>
    })));
  }, [data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Transaction;

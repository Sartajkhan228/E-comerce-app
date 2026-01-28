import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeletonloader } from "../../components/loader";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import type { UserReducerInitialState } from "../../types/user-reducer";

interface DataType {
  key: string;
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

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
  const [rows, setRows] = useState<DataType[]>([]);
  const navigate = useNavigate();


  console.log("DATA IN TRANSACTIONS", data)


  useEffect(() => {
    if (isError) {
      if (error && "data" in error) {
        toast.error((error.data as any)?.message);
      } else {
        toast.error("Network error");
      }
      navigate("/404");
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    if (!data) return;
    setRows(data.orders.map((item) => ({
      key: item._id,
      user: item.user?.name,
      amount: item.total,
      discount: item.discount,
      quantity: item.orderItems.length,
      status: <span className={item.status === "Delivered" ? "purple" : item.status === "Shipped" ? "green" : "red"}>{item.status}</span>,
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
      <main>{isLoading ? <Skeletonloader /> : Table}</main>
    </div>
  );
};

export default Transaction;

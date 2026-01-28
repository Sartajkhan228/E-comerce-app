import { useEffect, useState, type ReactElement } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Skeletonloader } from "../components/loader";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import type { UserReducerInitialState } from "../types/user-reducer";

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};

const columns: Column<DataType>[] = [
    { Header: "ID", accessor: "_id" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Discount", accessor: "discount" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
];


const Orders = () => {

    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
    const userId = user?._id;
    const { data, isLoading, isError, error } = useMyOrdersQuery(userId as string,)
    const [rows, setRows] = useState<DataType[]>([]);
    const navigate = useNavigate();

    console.log("MY ORDER", data)

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
            _id: item._id,
            amount: item.total,
            discount: item.discount,
            quantity: item.orderItems.length,
            status: <span className={item.status === "Delivered" ? "purple" : item.status === "Shipped" ? "green" : "red"}>{item.status}</span>,
            action: <Link to={`/admin/transaction/${item._id}`}>Manage</Link>
        })));


    }, [])

    const Table = TableHOC<DataType>(
        columns,
        rows,
        "dashboard-product-box",
        "Orders",
        rows.length > 6
    );

    return (
        <div className="container">
            <h1>My orders</h1>
            {isLoading ? <Skeletonloader /> : <Table />}
        </div>
    );
};

export default Orders;

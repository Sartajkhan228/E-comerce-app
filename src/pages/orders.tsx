import { useState, type ReactElement } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";

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

    const [rows] = useState<DataType[]>([
        {
            _id: "rtyui",
            amount: "456",
            quantity: "76",
            discount: "456",
            status: <span className="red">Processing</span>,
            action: <Link to={`/order/rtyui`}>Views</Link>,
        }
    ])

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
            {<Table />}
        </div>
    );
};

export default Orders;

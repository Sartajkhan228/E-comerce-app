import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeletonloader } from "../../components/loader";
import { useGetAllProductsQuery } from "../../redux/api/productApi";
import { server } from "../../redux/store";
import type { UserReducerInitialState } from "../../types/user-reducer";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Products = () => {
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer)
  const adminId = user?._id
  const { data, isLoading, isError, error } = useGetAllProductsQuery(adminId as string, {
    skip: !adminId
  })
  const [rows, setRows] = useState<DataType[]>([]);

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

    setRows(data.product.map((item) => ({
      photo: <img src={`${server}/${item.photo}`} />,
      name: item.name,
      price: item.price,
      stock: item.stock,
      action: <Link to={`/admin/product/${item._id}`}>Manage</Link>
    })));
  }, [data])


  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  if (isError) {
    return <Navigate to={"/404"} />;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main> {isLoading ? <Skeletonloader /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;

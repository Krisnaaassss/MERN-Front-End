import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { priceFormat } from "../utils";
import costumApi from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Silahkan login terlebih dahulu");
    return redirect("/login");
  }
  let order;
  if (user.role !== "owner") {
    const { data } = await costumApi.get("/order/current/user");
    order = data.data;
  } else {
    const response = await costumApi.get("/order");
    order = response.data.orders;
  }
  console.log(order);
  return { order };
};

const OrderView = () => {
  const { order } = useLoaderData();
  if (!order.length) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center text-primary border-b border-secondary py-2">
          Anda Belum Melakukan Order
        </h1>
        <p className="text-xl mt-6 font-bold">Silahkan Melakukan Order</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>No .</td>
            <td>Order By</td>
            <td>Product</td>
            <td>Total Product</td>
            <td>Status Pembayaran</td>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => (
            <tr key={item._id} className="hover">
              <th>{index + 1}</th>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                <ul className="list-disc">
                  {item.itemsDetail.map((itemProduct) => (
                    <li key={itemProduct._id}>
                      {itemProduct.name}
                      <br />
                      <span className="font-bold">
                        Jumlah : {itemProduct.quantity} Product
                      </span>{" "}
                      <br />
                      {priceFormat(itemProduct.price)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>Price : {priceFormat(item.total)}</td>
              <td>
                {item.status === "pending" ? (
                  <span className="btn btn-info">Pending</span>
                ) : item.status === "success" ? (
                  <span className="btn btn-success ">Success</span>
                ) : (
                  <span className="btn btn-error">Failed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;

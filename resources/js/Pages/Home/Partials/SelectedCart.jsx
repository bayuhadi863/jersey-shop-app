/* eslint-disable react/prop-types */
import React from "react";
// component import
import CreateOrderForm from "./CreateOrderForm";

const SelectedCart = ({ selectedCartId, data, addresses, shipping_price }) => {
  const selectedCartData = data.filter((item) =>
    selectedCartId.includes(item.id)
  );

  const totalSelectedPrice = selectedCartData.reduce((total, cart) => {
    return total + cart.total_price;
  }, 0);

  const conditionalShippingPrice =
    selectedCartId.length > 0 ? shipping_price : 0;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Atur Pemesanan</h1>
      <div className="bg-gray-100 rounded py-4 px-6">
        <div className="border-b border-gray-400 pb-2">
          <p className="font-medium mb-4">Produk:</p>
          {selectedCartData.map((cart) => (
            <div key={cart.id} className="text-sm flex justify-between">
              <p className="mb-2">
                {cart.product_name} x {cart.quantity}
              </p>
              <p className="text-primary">
                Rp{cart.total_price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <CreateOrderForm
          addresses={addresses}
          selectedCartId={selectedCartId}
          totalSelectedPrice={totalSelectedPrice}
          conditionalShippingPrice={conditionalShippingPrice}
        />
      </div>
    </div>
  );
};

export default SelectedCart;

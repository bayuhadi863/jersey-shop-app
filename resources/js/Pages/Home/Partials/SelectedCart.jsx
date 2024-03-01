/* eslint-disable react/prop-types */
import React from "react";
// mantine import
import { Button } from "@mantine/core";

const SelectedCart = ({ selectedCartId, data }) => {
  const selectedCartData = data.filter((item) =>
    selectedCartId.includes(item.id)
  );

  const totalSelectedPrice = selectedCartData.reduce((total, cart) => {
    return total + cart.total_price;
  }, 0);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Keranjang Terpilih</h1>
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
        <div className="mt-4 flex justify-between items-center">
          <p className="font-medium">Total:</p>
          <p className="text-xl text-primary font-medium">
            Rp{totalSelectedPrice.toLocaleString()}
          </p>
        </div>
        <div className="mt-8">
          <Button size="md" fullWidth>Pesan Sekarang</Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCart;

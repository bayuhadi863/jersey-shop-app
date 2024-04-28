/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState } from "react";
// mantine import
import { Button } from "@mantine/core";
// Inertia import
import { router, Link } from "@inertiajs/react";
// Mantine notifications import
import { notifications } from "@mantine/notifications";
// icons import
import { BsChevronRight } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";

const CreateOrderForm = ({
  addresses,
  selectedCartId,
  totalSelectedPrice,
  conditionalShippingPrice,
}) => {
  const defaultAddress =
    addresses.length > 0 ? addresses.find((address) => address.is_default) : "";

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);

  const totalOrderPrice = totalSelectedPrice + conditionalShippingPrice;

  const [isLoading, setIsLoading] = useState(false);

  const postData = {
    address_id: selectedAddress,
    shipping_price: conditionalShippingPrice,
    total_price: totalOrderPrice,
    cart_ids: selectedCartId,
  };

  const handlePostClick = () => {
    router.visit("/orders", {
      method: "post",
      data: {
        address_id: selectedAddress.id,
        shipping_price: conditionalShippingPrice,
        total_price: totalOrderPrice,
        cart_ids: selectedCartId,
      },
      onProgress: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil menambahkan pesanan!",
        });
      },
      onError: (errors) => {
        if (errors.address_id) {
          notifications.show({
            color: "red",
            title: "Error notification",
            message: errors.address_id,
          });
        }
        if (errors.shipping_price) {
          notifications.show({
            color: "red",
            title: "Error notification",
            message: errors.shipping_price,
          });
        }
        if (errors.total_price) {
          notifications.show({
            color: "red",
            title: "Error notification",
            message: errors.total_price,
          });
        }
        if (errors.cart_ids) {
          notifications.show({
            color: "red",
            title: "Error notification",
            message: errors.cart_ids,
          });
        }
      },
    });
  };

  console.log(postData);

  return (
    <div>
      <div className="mt-3 border-b border-gray-400 pb-3">
        <p className=" mb-2 font-medium">Alamat Pengiriman:</p>
        {addresses.length > 0 ? (
          <Link
            href={route("address.index")}
            className="flex gap-4 items-center hover:bg-gray-200 py-2 px-3 rounded border border-gray-300 transition"
          >
            <div>
              <p className="text-xs">
                {defaultAddress.recipient_name} | {defaultAddress.phone_number}
              </p>
              <p className="text-xs line-clamp-2">
                {defaultAddress.address_name}
              </p>

              <p className="text-xs uppercase">
                {defaultAddress.city}, {defaultAddress.state},{" "}
                {defaultAddress.country} {defaultAddress.postal_code}
              </p>
            </div>
            <div>
              <BsChevronRight className="text-sm" />
            </div>
          </Link>
        ) : (
          <Button
            component={Link}
            href={route("address.index")}
            variant="outline"
            size="xs"
            leftSection={<FiPlusCircle size={12} />}
          >
            Alamat Baru
          </Button>
        )}

        <div className="mt-3 flex justify-between items-center">
          <p className="font-medium">Biaya Pengiriman:</p>
          <p className="text-primary">
            Rp{postData.shipping_price.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="font-medium">Total:</p>
        <p className="text-xl text-primary font-medium">
          Rp{postData.total_price.toLocaleString()}
        </p>
      </div>
      <div className="mt-8">
        {isLoading && <p>Loading</p>}
        <Button
          size="md"
          fullWidth
          loading={isLoading}
          onClick={handlePostClick}
        >
          Pesan Sekarang
        </Button>
      </div>
    </div>
  );
};

export default CreateOrderForm;

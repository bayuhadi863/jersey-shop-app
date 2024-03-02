/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
// inertia import
import { Head, router } from "@inertiajs/react";
// mantine import
import { Button, Badge, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// Mantine notifications import
import { notifications } from "@mantine/notifications";

const OrderDetailPage = ({ auth, order, wallet }) => {
  const singleOrder = order.single_order;
  const remainingBalance = wallet.balance - order.total_price;

  const [opened, { open, close }] = useDisclosure(false);

  const [isLoading, setIsLoading] = useState(false);

  const handlePayClick = () => {
    router.visit(`/orders/${order.id}`, {
      method: "patch",
      data: {
        remainingBalance: remainingBalance,
      },
      onProgress: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        close();
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil membayar pesanan!",
        });
      },
      onError: (errors) => {
        setIsLoading(false);
        close();
        if (errors.remainingBalance) {
          notifications.show({
            color: "red",
            title: "Error notification",
            message: errors.remainingBalance,
          });
        }
      },
    });
  };

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Detail Pesanan" />

      <PageTitle>Detail Pesanan</PageTitle>
      <Container>
        <div className="py-4 flex justify-center">
          <div className="py-4 px-6 rounded w-full max-w-xl bg-gray-100">
            <div className="border-b border-gray-400 pb-2">
              <p className="font-semibold mb-2">Produk:</p>
              {singleOrder.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-6 mb-3 text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.cart.product_size.product.name}
                    </p>
                    <Badge
                      color="gray"
                      radius="sm"
                      variant="outline"
                      size="xs"
                      className="mb-1"
                    >
                      {item.cart.product_size.product.category.name}
                    </Badge>
                    <p className="text-xs mb-1">
                      Ukuran: {item.cart.product_size.size}
                    </p>
                    <p>
                      Rp{item.cart.product_size.product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p>x {item.cart.quantity}</p>
                    <p className="text-primary">
                      Rp{item.cart.total_price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="py-2 border-b border-gray-400">
              <p className="font-semibold mb-2 mt-2">Alamat Pengiriman:</p>
              <div className="text-sm">
                <p>
                  {order.address.recipient_name} | {order.address.phone_number}
                </p>
                <p className="line-clamp-2">{order.address.address_name}</p>

                <p className="uppercase">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} {order.address.postal_code}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="font-semibold mb-2">Biaya Pengiriman:</p>
                <p className="text-primary">
                  Rp{order.shipping_price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-b border-gray-400 pb-2">
              <p className="font-semibold mb-2 text-xl">Total:</p>
              <p className="text-primary text-xl font-medium">
                Rp{order.total_price.toLocaleString()}
              </p>
            </div>

            <div>
              <div className="mt-4 flex justify-between">
                <p className="font-semibold mb-2">Saldo Saya:</p>
                <p className="text-primary">
                  Rp{wallet.balance.toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="font-semibold mb-2">Sisa</p>
                <p
                  className={`text-lg font-medium ${
                    remainingBalance < 0 ? "text-red-500" : "text-primary"
                  }`}
                >
                  Rp{remainingBalance.toLocaleString()}
                </p>
              </div>
            </div>

            <Modal
              opened={opened}
              onClose={close}
              title="Mohon konfirmasi tindakan Anda"
              centered
            >
              <div>
                Apakah Anda yaking melakukan tindakan ini? Setelah mengonfirmasi
                maka saldo Anda akan langsung dikurangi.
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handlePayClick}
                  className="mt-4"
                  loading={isLoading}
                >
                  Konfirmasi
                </Button>
              </div>
            </Modal>

            <div className="mt-4">
              <Button size="md" fullWidth onClick={open}>
                Bayar Sekarang
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
};

export default OrderDetailPage;

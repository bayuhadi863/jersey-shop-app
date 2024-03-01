/* eslint-disable react/prop-types */
// react import
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
// inertia import
import { Head, useForm } from "@inertiajs/react";
// mantine import
import { Button, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// icons import
import { FiPlusCircle } from "react-icons/fi";
// Mantine notifications import
import { notifications } from "@mantine/notifications";

const WalletPage = ({ auth, wallet }) => {
  const [opened, { open, close }] = useDisclosure(false);

  // form data initiation
  const { data, setData, patch, processing, errors, reset } = useForm({
    balance: "",
  });
  // handle form submit
  const submit = (e) => {
    e.preventDefault();
    patch("/wallet", {
      preserveScroll: true,
      onSuccess: () => {
        reset("balance");
        close();
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil mengisi saldo!",
        });
      },
    });
  };

  console.log(data);

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Dompet Saya" />

      <PageTitle>Dompet saya</PageTitle>
      <Container>
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="py-5 px-6 rounded bg-gray-100 shadow-md">
            <p className="font-medium mb-2">Saldo</p>
            <p className="text-4xl font-semibold">
              <span className="text-2xl">Rp</span>
              {wallet.balance.toLocaleString()}
            </p>
          </div>
        </div>

        <Modal opened={opened} onClose={close} title="Isi Saldo" centered>
          <form onSubmit={submit}>
            <NumberInput
              size="md"
              placeholder="Jumlah Top up (Min: Rp10.000)"
              prefix="Rp"
              allowNegative={false}
              allowDecimal={false}
              thousandSeparator="."
              decimalSeparator=","
              value={data.balance}
              onChange={(value) => setData("balance", parseInt(value))}
              error={errors.balance ? errors.balance : false}
            />
            <Button type="submit" className="mt-4" loading={processing}>
              Konfirmasi
            </Button>
          </form>
        </Modal>
        <div className="mt-6">
          <Button onClick={open} leftSection={<FiPlusCircle size={14} />}>
            Isi Saldo
          </Button>
        </div>
      </Container>
    </HomeLayout>
  );
};

export default WalletPage;

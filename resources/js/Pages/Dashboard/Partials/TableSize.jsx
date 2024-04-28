/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Table, ScrollArea, Text } from "@mantine/core";

const TableSize = ({ productSizes }) => {
  return (
    <ScrollArea className="pb-4">
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        minWidth={700}
        layout="fixed"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Ukuran</Table.Th>
            <Table.Th>Jumlah</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {productSizes.length > 0 ? (
            productSizes.map((ukuranItem, index) => (
              <Table.Tr key={index}>
                <Table.Td>{ukuranItem.size}</Table.Td>
                <Table.Td>{ukuranItem.stock}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Text fontWeight={500} textAlign="center">
                  Tidak ada ukuran
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default TableSize;

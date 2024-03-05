import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

const ukuran = ["XS", "S", "M", "L", "XL", "XXL"];

const data = [
  {
    name: 'Athena Weissnat',
    company: 'Little - Rippin',
  },
  {
    name: 'Deangelo Runolfsson',
    company: 'Greenfelder - Krajcik',
  },
  {
    name: 'Danny Carter',
    company: 'Kohler and Sons',
  },
];

const TableSize = () => {
  console.log(data);
  let i = 0;
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <ScrollArea className='pb-4'>
      <Table horizontalSpacing="md" verticalSpacing="xs" minWidth={700} layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              Ukuran
            </Table.Th>
            <Table.Th>
              Jumlah
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {ukuran.length > 0 ? (
          ukuran.map((ukuranItem, index) => (
            <Table.Tr key={index}>
              <Table.Td>{ukuranItem}</Table.Td>
              <Table.Td>5</Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={2}>
              <Text fontWeight={500} textAlign="center">
                Nothing found
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

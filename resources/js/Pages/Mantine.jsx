import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Dialog, Group, Button, TextInput, Text, ColorInput } from "@mantine/core";

const Mantine = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
      <h1>Halo</h1>
      <ColorInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
    </>
  );
};

export default Mantine;

/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
// component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "../../Components/Dashboard/PageTitle";
// inertia import
import { useForm } from "@inertiajs/react";
// Mantine core import
import {
  Button,
  TextInput,
  Select,
  NumberInput,
  Group,
  rem,
  Text,
  Image,
  SimpleGrid,
  LoadingOverlay,
  Box,
} from "@mantine/core";
// mantine hooks import

// Dropzone Import
import { Dropzone } from "@mantine/dropzone";
// Mantine Rich Text Editor import
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
// Mantine notifications import
import { notifications } from "@mantine/notifications";
// import icons
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

const CreateProductPage = ({ selectCategoriesData, auth }) => {
  // state for select category
  const [value, setValue] = useState("");
  // form data initiation
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    category_id: "",
    price: "",
    image: [],
    description: "",
  });
  // handle form submit
  const submit = (e) => {
    e.preventDefault();
    post(`/dashboard/product`, {
      preserveScroll: true,
      onSuccess: () => {
        reset("name");
        reset("category_id");
        reset("price");
        reset("image");
        reset("description");
        notifications.show({
          color: "green",
          title: "Success notification",
          message: "Berhasil menambahkan produk baru!",
        });
      },
    });
  };
  // dropzone image preview
  const previews = data.image.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });
  // rich editor config
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({ placeholder: "Masukkan deskripsi produk" }),
    ],
    content: data.description,
    onUpdate: ({ editor }) => {
      setData("description", editor.getHTML());
    },
  });

  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <PageTitle>Tambah Produk</PageTitle>
      <Box pos="relative">
        <LoadingOverlay
          visible={processing}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <form className="flex flex-col gap-4 mt-6" onSubmit={submit}>
          {/* INPUT NAME START */}
          <TextInput
            placeholder="Masukkan nama produk"
            label="Nama Produk"
            size="md"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            error={errors.name ? errors.name : false}
          />
          {/* INPUT NAME END */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SELECT CATEGORY START */}
            <Select
              label="Kategori"
              size="md"
              placeholder="Pilih kategori"
              data={selectCategoriesData}
              value={value ? value.value : ""}
              onChange={(_value, option) => {
                setValue(option);
                setData("category_id", option.value);
              }}
              error={errors.category_id ? errors.category_id : false}
            />
            {/* SELECT CATEGORY END */}

            {/* INPUT NUMBER START */}
            <NumberInput
              size="md"
              label="Harga"
              placeholder="Masukkan harga produk"
              prefix="Rp"
              allowNegative={false}
              allowDecimal={false}
              thousandSeparator="."
              decimalSeparator=","
              value={data.price}
              onChange={(value) => setData("price", parseInt(value))}
              error={errors.price ? errors.price : false}
            />
            {/* INPUT NUMBER END */}
          </div>

          {/* RICH TEXT EDITOR INPUT DESCRIPTION */}
          <div>
            <label className=" font-medium">Deskripsi Produk</label>

            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H3 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          {/* RICH TEXT EDITOR END */}

          {/* DROPZONE INPUT IMAGE */}
          <div>
            <label className=" font-medium">Gambar Produk (Maks 5MB)</label>
            <Dropzone
              onDrop={(files) => setData("image", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={["image/png", "image/jpeg", "image/jpg"]}
            >
              <Group
                justify="center"
                gap="xl"
                mih={220}
                style={{ pointerEvents: "none" }}
                className={errors.image ? "border border-red-400 rounded" : ""}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: errors.image
                        ? "var(--mantine-color-red-6)"
                        : "var(--mantine-color-dimmed)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline c={errors.image ? "red" : ""}>
                    Drag images here or click to select files
                  </Text>
                  <Text
                    size="sm"
                    c={errors.image ? "red" : "dimmed"}
                    inline
                    mt={7}
                  >
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>

            <SimpleGrid
              cols={{ base: 1, sm: 4 }}
              mt={previews.length > 0 ? "xl" : 0}
            >
              {previews}
            </SimpleGrid>
          </div>
          {/* DROPZONE END */}
          <div>
            <Button type="submit" disabled={processing ? true : false}>
              Tambah
            </Button>
            {/* <p>{recentlySuccessful ? "Sukses" : "gagal"}</p> */}
          </div>
        </form>
      </Box>
    </DashboardLayout>
  );
};

export default CreateProductPage;

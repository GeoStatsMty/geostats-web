import type { Meta, StoryObj } from "@storybook/react";
import { FileDropZone } from "geostats-ui"; // adjust the import path if needed
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof FileDropZone> = {
  title: "Components/FileDropZone",
  component: FileDropZone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <FileDropZone
      label="Drop image here or click to browse"
      acceptedMimeTypes={["image/png", "image/jpeg", "image/webp"]}
      name="avatar"
      onChange={action("file-selected")}
    />
  ),
};

export const CustomSize: Story = {
  render: () => (
    <FileDropZone
      label="Custom-sized drop zone"
      className="w-80 h-48"
      acceptedMimeTypes={["image/png", "image/jpeg", "image/webp"]}
      name="banner"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FileDropZone
      label="Try again"
      acceptedMimeTypes={["image/png", "image/jpeg"]}
      error="Couldn’t upload – please choose a PNG or JPEG under 2 MB."
    />
  ),
};

export const Required: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action("form-submit")(new FormData(e.currentTarget));
      }}
    >
      <FileDropZone
        label="Required file"
        acceptedMimeTypes={["application/pdf"]}
        name="cv"
        isRequired
      />
      <button type="submit" className="mt-4 rounded bg-stone-700 px-3 py-1">
        Submit
      </button>
    </form>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { ListBox } from "geostats-ui";
import { Item } from "@react-stately/collections";

const meta = {
  title: "Components/ListBox",
  component: ListBox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  render: () => (
    <ListBox
      label="Choose an option"
      selectionMode="single"
      onSelectionChange={(selection) =>
        console.log("Selected:", [...selection].map(String))
      }
      className="w-64 max-h-60"
      items={[
        { key: "1", name: "Option 1" },
        { key: "2", name: "Option 2" },
        { key: "3", name: "Option 3" },
        { key: "4", name: "Option 4" },
        { key: "5", name: "Option 5" },
      ]}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBox>
  ),
};

export const MultiSelect: Story = {
  args: {},
  render: () => (
    <ListBox
      label="Select multiple options"
      selectionMode="multiple"
      onSelectionChange={(selection) =>
        console.log("Selected:", [...selection].map(String))
      }
      className="w-64 max-h-60"
      items={[
        { key: "1", name: "Option 1" },
        { key: "2", name: "Option 2" },
        { key: "3", name: "Option 3" },
        { key: "4", name: "Option 4" },
        { key: "5", name: "Option 5" },
      ]}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBox>
  ),
};

export const WithSections: Story = {
  args: {},
  render: () => (
    <ListBox
      label="Categories and items"
      className="w-64 max-h-80"
      selectionMode="single"
      items={[
        { key: "apple", name: "Apple", section: "Fruits" },
        { key: "banana", name: "Banana", section: "Fruits" },
        { key: "orange", name: "Orange", section: "Fruits" },
        { key: "carrot", name: "Carrot", section: "Vegetables" },
        { key: "broccoli", name: "Broccoli", section: "Vegetables" },
        { key: "cucumber", name: "Cucumber", section: "Vegetables" },
      ]}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBox>
  ),
};

export const CustomStyling: Story = {
  args: {},
  render: () => (
    <ListBox
      label="Custom styled list"
      selectionMode="single"
      className="w-64 bg-stone-900 border border-stone-700 p-1 rounded-lg"
      items={[
        { key: "1", name: "Option 1" },
        { key: "2", name: "Option 2" },
        { key: "3", name: "Option 3" },
      ]}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBox>
  ),
};

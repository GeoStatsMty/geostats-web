import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Item } from "@react-stately/collections";
import { ComboBox } from "geostats-ui";

type Fruit = { key: string; name: string };

const meta: Meta<typeof ComboBox<Fruit>> = {
  title: "Components/ComboBox",
  component: ComboBox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const fruits: Fruit[] = [
  { key: "apple", name: "Apple" },
  { key: "banana", name: "Banana" },
  { key: "kiwi", name: "Kiwi" },
  { key: "orange", name: "Orange" },
];

// Wrapper component for stories that doesn't use the SVG
const StoryComboBox = (props) => {
  // Create a component that takes all the same props but doesn't use the SVG
  const customProps = {
    ...props,
    // You can add custom styling or attributes here if needed
  };

  // Use a simple approach - just render a text-based dropdown indicator
  // by temporarily creating a className that replaces the SVG with a text symbol
  return (
    <div className="combo-box-story-wrapper">
      <style jsx>{`
        .combo-box-story-wrapper :global(svg[aria-hidden="true"]) {
          display: none;
        }
        .combo-box-story-wrapper
          :global(button[aria-label="Show suggestions"]):after {
          content: "▼";
          margin-right: 8px;
        }
      `}</style>
      <ComboBox {...customProps} />
    </div>
  );
};

// stories --------------------------------------------------------------------
export const Basic: Story = {
  render: () => (
    <StoryComboBox
      label="Choose a fruit"
      placeholder="Start typing…"
      defaultItems={fruits}
    >
      {(item) => <Item>{item.name}</Item>}
    </StoryComboBox>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <StoryComboBox
      label="Choose a fruit"
      placeholder="Start typing…"
      defaultItems={fruits}
      icon={<span className="pl-2">🍑</span>}
    >
      {(item) => <Item>{item.name}</Item>}
    </StoryComboBox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <StoryComboBox
      label="Disabled combobox"
      placeholder="Cannot open"
      defaultItems={fruits}
      isDisabled
    >
      {(item) => <Item>{item.name}</Item>}
    </StoryComboBox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    return (
      <>
        <StoryComboBox
          label="Controlled combobox"
          placeholder="Start typing…"
          defaultItems={fruits}
          selectedKey={selectedKey}
          onSelectionChange={(key) => setSelectedKey(key as string)}
        >
          {(item) => <Item>{item.name}</Item>}
        </StoryComboBox>
        <p className="mt-4 text-stone-300">Selected: {selectedKey ?? "—"}</p>
      </>
    );
  },
};

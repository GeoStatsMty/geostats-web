import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ListPrioritizer } from "geostats-ui";
import { Item } from "@react-stately/collections";

type Task = { key: string; label: string };

const initialTasks: Task[] = [
  { key: "1", label: "Write documentation" },
  { key: "2", label: "Implement feature X" },
  { key: "3", label: "Fix bug Y" },
  { key: "4", label: "Refactor module Z" },
];

const meta: Meta<typeof ListPrioritizer<Task>> = {
  title: "Components/ListPrioritizer",
  component: ListPrioritizer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const BasicListPrioritizer = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleRemove = (key: string) => {
    action("remove")(key);
    setTasks((prev) => prev.filter((task) => task.key !== key));
  };

  return (
    <div className="w-72">
      <ListPrioritizer
        items={tasks}
        onRemove={(key) => handleRemove(key as string)}
      >
        {(item: Task) => <Item>{item.label}</Item>}
      </ListPrioritizer>
    </div>
  );
};

export const Basic: Story = {
  render: () => <BasicListPrioritizer />,
};

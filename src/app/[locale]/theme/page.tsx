"use client";
import { Button, Card, Input, Modal, Switch, Tabs, TabsProps } from "antd";
import { useState } from "react";
function Theme() {
  const [loading, setLoading] = useState<boolean>(true);
  const onChange = (key: string) => {
    console.log(key);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",

      children: "Content of Tab Pane 1",
    },

    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",

      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      <Switch
        checked={!loading}
        onChange={(checked) => setLoading(!checked)}
      />
      <Card loading={loading}>
        <p>
          This is a card that will be in loading state when the switch is checked. You can toggle the loading state by
          clicking the switch.
        </p>
        <p>When the switch is checked, the card will show a loading spinner and disable interactions. Test</p>
        <Input></Input>
      </Card>
      <Button
        type="primary"
        onClick={showModal}
      >
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default Theme;

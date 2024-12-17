import {
  SearchOutlined,
  WalletFilled,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Select, Switch } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RenderSelectAccountUser from "../custom/select/account-user";
import { RenderSelectForm } from "../select/primary";
import { INCO_TERMS, PAYMENT_TERMS } from "@/common/constants/quote-terms";
import RenderSelectUserLocations from "../custom/select/user-locations";

const RenderGetQuotesButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const supplier_id = useWatch("supplier_id", form);
  return (
    <>
      {" "}
      <Modal
        centered
        styles={{
          body: {
            height: "450px",
          },
          content: {
            width: "840px",
          },
        }}
        onCancel={() => setOpen(false)}
        open={open}
        title={<span className="font-[700] text-[20px] ">Create RFQ</span>}
        footer={null}
      >
        <Flex vertical className="h-[100%] w-full overflow-y-scroll">
          <span className="font-[700] text-[#999999] mt-[0.5rem]">
            Order Details
          </span>
          <Form
            name={"rfq-form"}
            onFinish={(val) => {
              console.log(val, "asmdsam");
            }}
            form={form}
            layout="vertical"
          >
            <Flex gap="2rem" align="start">
              <Flex vertical className="mt-[1rem]">
                <RenderSelectAccountUser
                  name="supplier_id"
                  placeholder="Select Vendor"
                  role="supplier"
                />
                <RenderSelectForm
                  name="payment_type"
                  options={PAYMENT_TERMS}
                  placeholder="Selct Payment Type"
                />
                <Form.Item
                  name="fulfillment_date"
                  label={
                    <span className="font-[700] text-[#666666]">
                      Fulfillment Date
                    </span>
                  }
                  className="w-[160px]"
                >
                  <Input variant="filled" className="h-[40px]" type="date" />
                </Form.Item>
                <RenderSelectUserLocations
                  name="pickup_location"
                  placeholder="Select Pickup Location"
                  userId={supplier_id}
                />
                {/* </Flex> */}
                <RenderSelectForm
                  name="shipment_type"
                  options={INCO_TERMS}
                  placeholder="Select Inco terms"
                />
                <RenderSelectUserLocations
                  name="drop_location"
                  placeholder="Select Drop Location"
                  userId={
                    JSON.parse(localStorage.getItem("user_details") || "").id
                  }
                />

                <Form.Item>
                  <TextArea
                    variant="filled"
                    placeholder="Order Note"
                    className="h-[180px] w-[340px]"
                  />
                </Form.Item>
              </Flex>
              <Flex gap={"1rem"} className="mt-[1rem]" vertical>
                <Flex vertical>
                  <Form.Item
                    layout="horizontal"
                    label={
                      <span className="font-[600] text-[#666666]">
                        Search vendor products
                      </span>
                    }
                  >
                    <Switch />
                  </Form.Item>
                  <Input
                    className="h-[40px] w-[320px]"
                    placeholder="Search product name"
                    prefix={<SearchOutlined className="text-[#666666]" />}
                  />
                </Flex>
                <Flex justify="center" className="mt-[1rem]">
                  <span className="p-[3rem] w-[50%] h-[30%] rounded-[50%] bg-gray-200">
                    <WalletFilled className="text-[4rem] text-[#999999]" />
                  </span>
                </Flex>
                <Flex
                  gap="1.5rem"
                  vertical
                  className="w-full h-full mt-[1rem]"
                  align="center"
                >
                  <Flex vertical gap="0.5rem">
                    <span className="text-[#303030] text-[16px] font-[800]">
                      Add products for your order
                    </span>
                    <span className="text-[#666666] text-[14px] font-[500]">
                      Search and add product to this order
                    </span>
                  </Flex>
                  <span className="text-[#303030] text-[16px] font-[800]">
                    Or upload Document
                  </span>
                </Flex>
                <Button className="mt-[1rem] h-[40px]" type="primary">
                  <span className="font-[600]">Upload</span>
                </Button>
              </Flex>
            </Flex>
            <Flex gap="1rem">
              <Button className="w-[120px] h-[40px]" variant="outlined">
                Cancel
              </Button>
              <Button
                className="w-[120px] h-[40px]"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Modal>
      <Button
        style={{ fontSize: "16px", fontWeight: "900" }}
        onClick={() => setOpen(true)}
        type="primary"
      >
        Get Quotes Now!
      </Button>
    </>
  );
};

export default RenderGetQuotesButton;

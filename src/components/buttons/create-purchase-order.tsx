import {
  AppstoreOutlined,
  CalendarOutlined,
  FileAddOutlined,
  InfoCircleOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ProductOutlined,
  ReconciliationOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  WalletFilled,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Switch,
  Table,
  Tooltip,
  Upload,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RenderSelectAccountUser from "../custom/select/account-user";
import { RenderSelectForm } from "../select/primary";
import { INCO_TERMS, PAYMENT_TERMS } from "@/common/constants/quote-terms";
import RenderSelectUserLocations from "../custom/select/user-locations";

const RenderCreatePurchaseOrderModal = (props: { button: React.ReactNode }) => {
  const router = useRouter();
  const [isManual, setIsManual] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const supplier_id = useWatch("supplier_id", form);
  const [api, contextHolder] = notification.useNotification();
  const vendorSelectionNotification = () => {
    return api.info({
      message: "Please select either Manual or Vendor",
      description: "Both can not be selected",
      placement: "topRight",
    });
  };
  const closeNotif = () => {
    return api.info({
      message: (
        <span className="font-[600] text-[18px] text-EXP_HEADING">
          Are you sure?
        </span>
      ),
      description: "The changes will not be saved",
      placement: "top",
    });
  };
  useEffect(() => {
    if (isVendor && isManual) {
      vendorSelectionNotification();
    }
  }, [isManual, isVendor]);
  return (
    <>
      {" "}
      <Modal
        onCancel={() => null}
        closeIcon={null}
        destroyOnClose
        centered
        styles={{
          body: {
            height: "450px",
          },
          content: {
            width: "1080px",
            left: "-200px",
          },
        }}
        open={open}
        title={
          <Flex
            align="center"
            gap="0.5rem"
            className="font-[600] text-[#3a3636] text-[20px]"
          >
            <ReconciliationOutlined />
            <span className="font-[700]">Create Purchase Order</span>
          </Flex>
        }
        footer={null}
      >
        {contextHolder}
        <Flex vertical className="h-[100%] w-full overflow-y-scroll">
          <span className="font-[700] text-[#999999] mt-[0.5rem]">
            Order Details
          </span>
          <Form
            name={"create-purchase-order-form"}
            onFinish={(val) => {
              console.log(val, "asmdsam");
            }}
            form={form}
            layout="vertical"
          >
            <Flex gap="3rem" align="start">
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
                <RenderSelectForm
                  w="220px"
                  label="Inco terms"
                  name="shipment_type"
                  options={INCO_TERMS}
                  placeholder="Select Inco terms"
                />
                <RenderSelectUserLocations
                  name="pickup_location"
                  placeholder="Select Pickup Location"
                  userId={supplier_id}
                />
                {/* </Flex> */}

                <RenderSelectUserLocations
                  name="drop_location"
                  placeholder="Select Drop Location"
                  userId={
                    localStorage.getItem("user_details") &&
                    JSON.parse(localStorage.getItem("user_details") || "").id
                  }
                />

                <Form.Item>
                  <TextArea
                    variant="filled"
                    placeholder="Order Note"
                    className="h-[380px] w-[320px]"
                  />
                </Form.Item>
              </Flex>
              <Flex gap={"1rem"} className="mt-[1rem] w-full" vertical>
                <Flex gap={"1rem"} className="h-6">
                  <Form.Item
                    layout="horizontal"
                    label={
                      <Button
                        type="link"
                        icon={
                          <Tooltip title="Products in store or Supplier ERP">
                            <InfoCircleOutlined />
                          </Tooltip>
                        }
                        className="font-[700] text-[#666666] hover:bg-white"
                      >
                        Search vendor products
                      </Button>
                    }
                  >
                    <Switch onChange={() => setIsVendor(!isVendor)} />
                  </Form.Item>
                  <Form.Item
                    layout="horizontal"
                    label={
                      <span className="font-[700] text-[#666666]">
                        Add Items Manually
                      </span>
                    }
                  >
                    <Switch onChange={() => setIsManual(!isManual)} />
                  </Form.Item>
                </Flex>

                {!isManual ? (
                  <>
                    <Input
                      className="h-[48px] w-[100%] text-[14px] text-EXP_FIELD_NAME"
                      placeholder="Search product name"
                      prefix={<SearchOutlined className="text-[#666666]" />}
                    />
                    <Flex
                      gap="1.5rem"
                      vertical
                      className="w-full h-full mt-[1rem] py-7 bg-slate-100"
                      align="center"
                    >
                      <Flex
                        justify="center"
                        className="mt-[2rem] w-full h-full"
                      >
                        <span className="p-[1.8rem] w-[120px] h-[120px] rounded-[50%] bg-gray-200">
                          <WalletFilled className="text-[4rem] text-[#999999]" />
                        </span>
                      </Flex>
                      <Flex vertical gap="0.2rem">
                        <Flex
                          gap={"0.5rem"}
                          className="text-[#303030] text-[18px] font-[800]"
                        >
                          <ProductOutlined />
                          <span>Add products for your order</span>
                        </Flex>
                        <span className="text-[#666666] text-[14px] font-[500]">
                          Search and add product to this order
                        </span>
                      </Flex>
                      <Upload
                        name="avatar"
                        listType="text"
                        className="avatar-uploader"
                        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        // beforeUpload={beforeUpload}
                        // onChange={handleChange}
                      >
                        <Button
                          className="mt-[0.5rem] h-[60px] w-[580px]"
                          type="dashed"
                          icon={<UploadOutlined />}
                        >
                          <span className=" text-EXP_FIELD_NAME text-[16px] font-[800]">
                            Or Upload Document
                          </span>
                        </Button>
                      </Upload>
                    </Flex>
                  </>
                ) : (
                  <Form.List
                    name="names"
                    rules={
                      [
                        // {
                        //   validator: async (_, names) => {
                        //     if (!names || names.length < 2) {
                        //       return Promise.reject(new Error("At least 2 passengers"));
                        //     }
                        //   },
                        // },
                      ]
                    }
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        <Form.Item className="w-full mt-3">
                          <Button
                            type="dashed"
                            className="text-[#666666] w-full h-12 font-[700] text-[14px]"
                            onClick={() => add()}
                            icon={
                              <PlusOutlined className="font-[700] text-[14px]" />
                            }
                          >
                            Add Items
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                        <Table
                          pagination={false}
                          dataSource={fields}
                          columns={[
                            {
                              title: (
                                <Flex gap="0.25rem">
                                  <ProductOutlined />
                                  <span className="font-[600] min-w-14 text-[#3a3636] text-[14px]">
                                    Code{" "}
                                  </span>{" "}
                                </Flex>
                              ),
                              width: 400,
                              dataIndex: "item_code",
                              key: "item_code",
                              render: (_, rec) => (
                                <Form.Item
                                  key={rec.key}
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please input passenger's name or delete this field.",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Item Code"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              ),
                            },
                            {
                              title: (
                                <Flex gap="0.25rem">
                                  <UnorderedListOutlined />{" "}
                                  <span className="font-[600] text-[#3a3636] text-[14px]">
                                    Description{" "}
                                  </span>{" "}
                                </Flex>
                              ),
                              width: 400,
                              dataIndex: "description",
                              key: "description",
                              render: (_, rec) => (
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please input passenger's name or delete this field.",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Description"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              ),
                            },
                            {
                              title: (
                                <Flex gap="0.25rem">
                                  <OrderedListOutlined />{" "}
                                  <span className="font-[600] text-[#3a3636] text-[14px]">
                                    Quantity{" "}
                                  </span>{" "}
                                </Flex>
                              ),
                              width: 200,
                              dataIndex: "quantity",
                              key: "quantity",
                              render: (_, rec) => (
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  key={rec.key}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please input passenger's name or delete this field.",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Quantity"
                                    type="number"
                                    style={{ width: "80%" }}
                                  />
                                </Form.Item>
                              ),
                            },
                            {
                              title: (
                                <Flex gap="0.25rem">
                                  <CalendarOutlined />{" "}
                                  <span className="font-[600] min-w-20 text-[#3a3636] text-[14px]">
                                    Delivery Date{" "}
                                  </span>{" "}
                                </Flex>
                              ),
                              width: 300,
                              dataIndex: "delivery_date",
                              key: "delivery_date",
                              render: (_, rec) => (
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  className="w-[100%]"
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please input passenger's name or delete this field.",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="date"
                                    placeholder="Delivery Date"
                                    className="w-full"
                                  />
                                </Form.Item>
                              ),
                            },
                            {
                              title: (
                                <Flex className="cursor-pointer" gap="0.25rem">
                                  <FileAddOutlined />{" "}
                                  <span className="font-[600] text-[#3a3636] text-[14px]">
                                    Images{" "}
                                  </span>{" "}
                                </Flex>
                              ),
                              width: 200,
                              dataIndex: "image_id",
                              key: "image_id",
                              render: (_, rec) => (
                                <Form.Item
                                  validateTrigger={["onChange", "onBlur"]}
                                  className="w-[100%]"
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please input passenger's name or delete this field.",
                                    },
                                  ]}
                                >
                                  <Upload
                                    name="upload-item-img"
                                    listType="picture"
                                    showUploadList={false}
                                    className="flex gap-4"
                                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    // beforeUpload={beforeUpload}
                                    // onChange={handleChange}
                                  >
                                    <UploadOutlined />
                                    <span className=" text-EXP_FIELD_NAME font-[800]">
                                      Upload
                                    </span>
                                  </Upload>
                                </Form.Item>
                              ),
                            },
                          ]}
                        />
                      </>
                    )}
                  </Form.List>
                )}
              </Flex>
            </Flex>
            <Flex justify="end" gap="1rem">
              <Button
                className="w-[120px] text-[#666666] h-[40px] font-[800]"
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-[120px] h-[40px] font-[800]"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Modal>
      <span onClick={() => setOpen(true)}>{props.button}</span>
    </>
  );
};

export default RenderCreatePurchaseOrderModal;

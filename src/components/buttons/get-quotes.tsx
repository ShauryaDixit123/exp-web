import {
  AppstoreOutlined,
  CalendarOutlined,
  DeleteRowOutlined,
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
import { Option } from "antd/es/mentions";
import apiClient from "@/common/interceptor/api";

const RenderCreateQuotesModal = (props: { button: React.ReactNode }) => {
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
  const watchFields = useWatch("items", form);
  console.log(watchFields, "watchFields");
  const closeNotif = () => {
    return api.info({
      message: (
        <span className="font-[600] text-[18px] text-EXP_HEADING">
          Request For Quote Created Successfully
        </span>
      ),
      placement: "topRight",
    });
  };
  const createRFQ = async (payload: any) => {
    const res = await apiClient().post("quotes/rfq", {
      ...payload,
      account_id: Number(localStorage.getItem("current_account_id")),
      buyer_id: JSON.parse(localStorage.getItem("user_details") || "")?.id,
      created_by: JSON.parse(localStorage.getItem("user_details") || "")?.id,
      pickup_location_id: Number(payload.pickup_location_id),
      drop_location_id: Number(payload.drop_location_id),
      items: payload.items.map((v) => ({
        ...v,
        quantity: Number(v.quantity),
      })),
    });
    if (res.status === 200) {
      closeNotif();
      setOpen(false);
      form.resetFields();
      setTimeout(() => {
        router.push("/v1/quotes");
      }, 2000);
    }
  };
  useEffect(() => {
    if (isVendor && isManual) {
      vendorSelectionNotification();
    }
  }, [isManual, isVendor]);
  const SelectQuantity = (
    <Select className="min-w-20">
      <Option value="mil">million</Option>
      <Option value="thousand">thousand</Option>
    </Select>
  );
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
            width: "1120px",
            left: "-250px",
          },
        }}
        open={open}
        title={
          <Flex
            align="center"
            gap="0.5rem"
            className="font-[600] text-[#3a3636] text-[20px]"
          >
            <AppstoreOutlined />
            <span className="font-[700]">Create RFQ</span>
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
            onFinish={createRFQ}
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
                  name="payment_terms"
                  options={PAYMENT_TERMS}
                  placeholder="Selct Payment Type"
                />
                <Form.Item
                  name="due_date"
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
                  name="inco_terms"
                  options={INCO_TERMS}
                  placeholder="Select Inco terms"
                />
                <RenderSelectUserLocations
                  name="pickup_location_id"
                  placeholder="Select Pickup Location"
                  userId={supplier_id}
                />
                {/* </Flex> */}

                <RenderSelectUserLocations
                  name="drop_location_id"
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
                  <Form.List name="items">
                    {(fields, { add, remove }) => {
                      const formItems = fields.map((field, index) => ({
                        ...field,
                        index,
                      }));

                      return (
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
                          </Form.Item>

                          <Table
                            pagination={false}
                            dataSource={formItems}
                            rowKey="index"
                            columns={[
                              {
                                title: (
                                  <Flex gap="0.25rem">
                                    <ProductOutlined />
                                    <span className="font-[600] min-w-14 text-[#3a3636] text-[14px]">
                                      Code
                                    </span>
                                  </Flex>
                                ),
                                dataIndex: "item_code",
                                key: "item_code",
                                render: (_, field) => (
                                  <Form.Item
                                    name={[field.name, "item_code"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Item code is required.",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Item Code" />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: (
                                  <Flex gap="0.25rem">
                                    <UnorderedListOutlined />
                                    <span className="font-[600] text-[#3a3636] text-[14px]">
                                      Description
                                    </span>
                                  </Flex>
                                ),
                                dataIndex: "description",
                                key: "description",
                                render: (_, field) => (
                                  <Form.Item
                                    name={[field.name, "description"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Description is required.",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Description" />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: (
                                  <Flex gap="0.25rem">
                                    <OrderedListOutlined />
                                    <span className="font-[600] text-[#3a3636] text-[14px]">
                                      Quantity
                                    </span>
                                  </Flex>
                                ),
                                dataIndex: "quantity",
                                key: "quantity",
                                render: (_, field) => (
                                  <Form.Item
                                    name={[field.name, "quantity"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Quantity is required.",
                                      },
                                    ]}
                                  >
                                    <Input
                                      addonAfter={["pcs"]}
                                      placeholder="Quantity"
                                      type="number"
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: (
                                  <Flex gap="0.25rem">
                                    <CalendarOutlined />
                                    <span className="font-[600] min-w-20 text-[#3a3636] text-[14px]">
                                      Delivery Date
                                    </span>
                                  </Flex>
                                ),
                                dataIndex: "delivery_date",
                                key: "delivery_date",
                                render: (_, field) => (
                                  <Form.Item
                                    name={[
                                      field.name,
                                      "expected_delivery_date",
                                    ]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Delivery Date is required.",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="date"
                                      placeholder="Delivery Date"
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: (
                                  <Flex gap="0.25rem">
                                    <FileAddOutlined />
                                    <span className="font-[600] text-[#3a3636] text-[14px]">
                                      Action
                                    </span>
                                  </Flex>
                                ),
                                key: "action",
                                render: (_, field) => (
                                  <Flex gap="1rem" justify="evenly">
                                    <Form.Item name={[field.name, "image_id"]}>
                                      <Upload
                                        listType="picture"
                                        showUploadList={false}
                                        // action="upload-api-url"
                                        // beforeUpload={beforeUpload}
                                        // onChange={handleChange}
                                      >
                                        <UploadOutlined className="text-EXP_BLUE font-EXP_WGT cursor-pointer" />
                                      </Upload>
                                    </Form.Item>
                                    <Button
                                      type="link"
                                      danger
                                      icon={<DeleteRowOutlined />}
                                      onClick={() => remove(field.name)}
                                    />
                                  </Flex>
                                ),
                              },
                            ]}
                          />
                        </>
                      );
                    }}
                  </Form.List>
                )}
              </Flex>
            </Flex>
            <Flex justify="end" gap="1rem">
              <Button
                className="w-[120px] text-[#666666] h-[40px] font-[800]"
                variant="outlined"
                onClick={() => (form.resetFields(), setOpen(false))}
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

export default RenderCreateQuotesModal;

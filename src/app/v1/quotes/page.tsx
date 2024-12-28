"use client";

import apiClient from "@/common/interceptor/api";
import RenderButtonList from "@/components/custom/button-list";
import {
  CalendarOutlined,
  DeleteOutlined,
  DoubleRightOutlined,
  ExportOutlined,
  HistoryOutlined,
  InteractionOutlined,
  NumberOutlined,
  PoundCircleOutlined,
  ProjectOutlined,
  SearchOutlined,
  SwitcherOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Table, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [selectedState, setSelectedState] = React.useState<string>("available");
  const [data, setData] = React.useState({
    count: 0,
    list: [],
  });
  const router = useRouter();
  const dataSource = [
    {
      key: "1",
      quote_id: "Q12345",
      products: "Product A, Product B",
      requested_on: "2023-10-01",
      request_id: "R12345",
      quantity: 2,
      quotes_list: [
        {
          quote_id: "Q12345",
          products: "Product A",
          rate: "500",
          rate_unit: "USD",
          quantity: 1,
          delivery_date: "2023-10-01",
        },
        {
          quote_id: "Q12245",
          products: "Product N",
          rate: "50",
          quantity: 1,
          rate_unit: "USD",
          delivery_date: "2023-10-01",
        },
      ],
    },
    {
      key: "2",
      quote_id: "Q67890",
      products: "Product C",
      quantity: 4,
      requested_on: "2023-10-05",
      request_id: "R12346",
      quotes_list: [
        {
          quote_id: "Q12345",
          products: "Product A",
          rate: "500",
          rate_unit: "USD",
          quantity: 2,
          delivery_date: "2023-10-01",
        },
        {
          quote_id: "Q12245",
          products: "Product N",
          rate: "50",
          quantity: 2,
          rate_unit: "USD",
          delivery_date: "2023-10-01",
        },
      ],
    },
  ];

  const columns = [
    {
      title: (
        <Flex
          align="center"
          gap="0.5rem"
          className="font-[600] text-[#3a3636] text-[14px]"
        >
          <UnorderedListOutlined />
          <span>Request ID</span>
        </Flex>
      ),
      width: 300,
      dataIndex: "request_id",
      key: "request_id",
      render: (_, record) => (
        <Tooltip title={record.id}>
          <span className="font-[600] text-[#636060] text-[16px]">
            {record.id.substring(0, 5) + "..."}
          </span>
        </Tooltip>
      ),
    },

    {
      title: (
        <Flex
          align="center"
          gap="0.5rem"
          className="font-[600] text-[#3a3636] text-[14px]"
        >
          <ProjectOutlined />
          <span>Products</span>
        </Flex>
      ),
      dataIndex: "products",
      width: 300,
      key: "products",
      render: (_, record) => (
        <Tooltip
          title={record.items
            .map(
              (v, i) =>
                `${v.quantity} X ${v.item_code} ${
                  i !== record.items.length - 1 ? ", " : ""
                }`
            )
            .join("")}
        >
          <span className="font-[600] text-[#636060] text-[16px]">
            {record.items
              .map(
                (v, i) =>
                  `${v.quantity} X ${v.item_code} ${
                    i !== record.items.length - 1 ? ", " : ""
                  }`
              )
              .join("")
              .substring(0, 50) + "..."}
            {/* {record.quantity} X {record.products} */}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          gap="0.5rem"
          className="font-[600] text-[#3a3636] text-[14px]"
        >
          <ProjectOutlined />
          <span>Quantity</span>
        </Flex>
      ),
      dataIndex: "quantity",
      width: 300,
      key: "quantity",
      render: (_, record) => (
        <span className="font-[600] text-[#636060] text-[16px]">
          {record.items.reduce(
            (a, v) => (a.quantity ? a.quantity : a + v.quantity),
            0
          )}{" "}
          {record.items[0].quantity_unit}
        </span>
      ),
    },
    {
      title: (
        <Flex
          align="center"
          gap="0.5rem"
          className="font-[600] text-[#3a3636] text-[14px]"
        >
          <CalendarOutlined />
          <span>Requested On</span>
        </Flex>
      ),
      dataIndex: "created_at",
      width: 300,
      key: "created_at",
      render: (_, record) => (
        <span className="font-[600] text-[#636060] text-[16px]">
          {record.created_on}
        </span>
      ),
      sorter: (a, b) => a.created_on - b.created_on,
    },
    {
      title: (
        <Flex
          align="center"
          gap="0.5rem"
          className="font-[600] text-[#3a3636] text-[14px]"
        >
          <InteractionOutlined />
          <span>Action</span>
        </Flex>
      ),
      // fixed: "right",
      dataIndex: "action",
      width: 100,
      key: "action",
      render: (_, rec) => (
        <Flex gap={"1rem"}>
          <Button
            icon={<DoubleRightOutlined style={{ fontSize: "14px" }} />}
            iconPosition="end"
            className="font-[600] text-[16px] p-[1rem]"
            type="primary"
            onClick={() => router.push(`/v1/quotes/${rec.id}`)}
          >
            View
          </Button>
          <Tooltip
            placement="top"
            title="Delete request"
            className="font-[600] text-[16px] p-[1rem]"
          >
            <DeleteOutlined className="font-[600] text-[16px] text-EXP_RED cursor-pointer" />
          </Tooltip>
        </Flex>
      ),
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function get() {
      const resp = await apiClient({ action: "READ" }).post("quotes/rfq/list", {
        status: selectedState,
        account_id: Number(localStorage.getItem("current_account_id")),
        page_number: currentPage,
      });
      setData(resp.data);
      console.log(resp, "rewrweuruewh");
    }
    get();
  }, [selectedState, currentPage]);
  return (
    <div className="p-8">
      <Flex justify="space-between" className="w-[100%]">
        <RenderButtonList
          onClick={(v) => setSelectedState(v)}
          list={[
            {
              label: "Requested",
              value: "requested",
              icon: <ExportOutlined />,
            },
            {
              label: "Available",
              value: "available",
              icon: <HistoryOutlined />,
            },
            { label: "Expired", value: "expired", icon: <SwitcherOutlined /> },
          ]}
          gap="2.5rem"
        />
        <Input
          className="w-[380px] text-[18px]"
          placeholder="Search Products, Request Id or Quote Id"
          prefix={<SearchOutlined className="text-[#666666]" />}
        />
      </Flex>
      <div className="mt-[2rem]">
        <Table
          expandable={
            selectedState === "available"
              ? {
                  expandedRowRender: (record) => (
                    <Table
                      pagination={false}
                      bordered={false}
                      dataSource={record.quotes_list}
                      columns={[
                        {
                          title: (
                            <Flex gap="0.25rem">
                              <UnorderedListOutlined />{" "}
                              <span className="font-[600] text-[#3a3636] text-[14px]">
                                Quote Id{" "}
                              </span>{" "}
                            </Flex>
                          ),
                          width: 300,
                          dataIndex: "quote_id",
                          key: "quote_id",
                          render: (_, rec) => (
                            <span className="font-[600] text-[#636060] text-[16px]">
                              {rec.quote_id}
                            </span>
                          ),
                        },
                        {
                          title: (
                            <Flex gap="0.25rem">
                              <ProjectOutlined />{" "}
                              <span className="font-[600] text-[#3a3636] text-[14px]">
                                Product{" "}
                              </span>{" "}
                            </Flex>
                          ),
                          width: 300,
                          dataIndex: "products",
                          key: "products",
                          render: (_, rec) => (
                            <span className="font-[600] text-[#636060] text-[16px]">
                              {rec.products}
                            </span>
                          ),
                        },
                        {
                          title: (
                            <Flex gap="0.25rem">
                              <PoundCircleOutlined />
                              <span className="font-[600] text-[#3a3636] text-[14px]">
                                Rate
                              </span>
                            </Flex>
                          ),
                          width: 300,
                          dataIndex: "rate",
                          key: "rate",
                          render: (_, rec) => (
                            <span className="font-[600] text-[#636060] text-[16px]">
                              {rec.rate}
                            </span>
                          ),
                        },
                        {
                          title: (
                            <Flex gap="0.25rem">
                              <NumberOutlined />
                              <span className="font-[600] text-[#3a3636] text-[14px]">
                                Quantity
                              </span>
                            </Flex>
                          ),
                          width: 300,
                          dataIndex: "quantity",
                          key: "quantity",
                          render: (_, rec) => (
                            <span className="font-[600] text-[#636060] text-[16px]">
                              {rec.quantity}
                            </span>
                          ),
                        },
                        {
                          title: (
                            <Flex gap="0.25rem">
                              <CalendarOutlined />
                              <span className="font-[600] text-[#3a3636] text-[14px]">
                                Delivery Date
                              </span>
                            </Flex>
                          ),
                          width: 300,
                          dataIndex: "delivery_date",
                          key: "delivery_date",
                          render: (_, rec) => (
                            <span className="font-[600] text-[#636060] text-[16px]">
                              {rec.delivery_date}
                            </span>
                          ),
                        },
                      ]}
                    />
                    // <>
                    //   <Flex
                    //     justify="space-between"
                    //     className="px-[2.5rem] bg-yellow-100 p-4"
                    //   >

                    //

                    //   </Flex>
                    //   {record.quotes_list.map((item) => (
                    //     <Flex
                    //       justify="space-between"
                    //       className="px-[2.5rem] mt-2 p-4"
                    //     >
                    //       <span className="font-[500] text-[#636060] text-[16px]">
                    //         {item.quote_id}
                    //       </span>

                    //       <span className="font-[500] text-[#636060] text-[16px]">
                    //         {item.products}
                    //       </span>

                    //       <Flex
                    //         gap={"0.25rem"}
                    //         className="font-[500] text-[#636060] text-[16px]"
                    //       >
                    //         <span>{item.rate}</span>
                    //         {item.rate_unit}
                    //       </Flex>
                    //       <span className="font-[500] text-[#636060] text-[16px]">
                    //         {item.quantity}
                    //       </span>

                    //       <span className="font-[500] text-[#636060] text-[16px]">
                    //         {item.delivery_date}
                    //       </span>
                    //     </Flex>
                    //   ))}
                    // </>
                  ),
                }
              : {}
          }
          dataSource={data.list}
          pagination={{
            pageSize: 10,
            current: currentPage,
            total: data.count,
            onChange(page) {
              setCurrentPage(page);
            },
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Page;

"use client";

import apiClient from "@/common/interceptor/api";
import {
  ProductOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Flex, Table, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params.id; // Safely access params here
  const [data, setData] = useState(null); // UseState for storing data
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await apiClient().get(`quotes/rfq/${id}`);
        setData(resp.data); // Store the API response in state
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [id]); // Depend on `id` to fetch data when it changes

  return (
    <>
      <Header className="p-4 bg-slate-50 mb-2 flex items-center justify-between">
        <Flex className="gap-8">
          <ArrowLeftOutlined
            onClick={() => router.push("/v1/quotes")}
            className="text-[1.5rem] font-[400] cursor-pointer text-EXP_HEADING"
          />
          <Tooltip title={id}>
            <Button
              type="primary"
              className="w-56 h-12 text-EXP_HEADING_SIZE_2 font-EXP_MODAL_HEAD p-6"
            >
              <span>Request Id: </span>
              <span>{id.substring(0, 4) + "...."}</span>
            </Button>
          </Tooltip>
        </Flex>
        <Flex className="gap-8 ">
          <Button
            type="dashed"
            className="p-4 w-40 font-[700] text-EXP_FIELD_NAME border-EXP_OUTLINE"
          >
            Provide Quotes
          </Button>
          <Tooltip title="Approve Request">
            <CheckOutlined className="text-[1.5rem] font-[400] text-green-600 cursor-pointer" />
          </Tooltip>
          <Tooltip placement="leftBottom" title="Reject Request">
            <CloseCircleOutlined className="text-[1.5rem] font-[400] text-EXP_PO_RED cursor-pointer " />
          </Tooltip>
        </Flex>
      </Header>
      <div className="px-14">
        <Flex gap={"6rem"} className="mt-16 w-full">
          <Flex vertical>
            <span className="font-[600] text-[16px] text-EXP_FIELD_NAME">
              Requested On
            </span>
            <span className="font-[500] text-[14px] text-EXP_HEADING">
              {data?.created_on || "Loading..."}
            </span>
          </Flex>
          <Flex vertical>
            <span className="font-[600] text-[16px] text-EXP_FIELD_NAME">
              Inco Terms
            </span>
            <span className="font-[500] text-[14px] text-EXP_HEADING">
              {data?.inco_terms || "Loading..."}
            </span>
          </Flex>
          <Flex vertical>
            <span className="font-[600] text-[16px] text-EXP_FIELD_NAME">
              Expected Date of Delivery
            </span>
            <span className="font-[500] text-[14px] text-EXP_HEADING">
              {data?.expected_date_of_delivery || "Loading..."}
            </span>
          </Flex>
          <Flex vertical>
            <span className="font-[600] text-[16px] text-EXP_FIELD_NAME">
              Port of Destination
            </span>
            <span className="font-[500] text-[14px] text-EXP_HEADING">
              {data?.port_of_destination || "Loading..."}
            </span>
          </Flex>
          <Flex vertical>
            <span className="font-[600] text-[16px] text-EXP_FIELD_NAME">
              Payment Terms
            </span>
            <span className="font-[500] text-[14px] text-EXP_HEADING">
              {data?.payment_terms || "Loading..."}
            </span>
          </Flex>
        </Flex>
        <div className="h-300 w-full overflow-y-scroll">
          <Table
            dataSource={data?.items || []}
            className="mt-14"
            rowKey="id"
            pagination={false}
            columns={[
              {
                title: (
                  <Flex gap="0.25rem">
                    <ProductOutlined />
                    <span className="font-[600] text-[#3a3636] text-[14px]">
                      Image
                    </span>
                  </Flex>
                ),
                dataIndex: "image_id",
                key: "image_id",
                width: 300,
                render: (image_id) => (
                  <span className="font-[600] text-[#636060] text-[16px]">
                    {image_id}
                  </span>
                ),
              },
              {
                title: (
                  <Flex gap="0.25rem">
                    <UnorderedListOutlined />
                    <span className="font-[600] text-[#3a3636] text-[14px]">
                      Item
                    </span>
                  </Flex>
                ),
                dataIndex: "item_code",
                key: "item_code",
                width: 300,
                render: (item_code) => (
                  <span className="font-[600] text-[#636060] text-[16px]">
                    {item_code}
                  </span>
                ),
              },
              {
                title: (
                  <Flex gap="0.25rem">
                    <UnorderedListOutlined />
                    <span className="font-[600] min-w-20 text-[#3a3636] text-[14px]">
                      Quantity
                    </span>
                  </Flex>
                ),
                dataIndex: "quantity",
                width: 300,
                key: "quantity",
                render: (quantity) => (
                  <span className="font-[600] text-[#636060] text-[16px]">
                    {quantity}
                  </span>
                ),
              },
              {
                title: (
                  <Flex gap="0.25rem">
                    <CalendarOutlined />
                    <span className="font-[600] text-[#3a3636] text-[14px]">
                      Expected Date of Delivery
                    </span>
                  </Flex>
                ),
                dataIndex: "expected_delivery_date",
                key: "expected_delivery_date",
                width: 300,
                render: (date) => (
                  <span className="font-[600] text-[#636060] text-[16px]">
                    {date}
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Page;

import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const RenderGetQuotesButton = () => {
  const router = useRouter();

  return (
    <>
      {" "}
      <Button
        style={{ fontSize: "16px", fontWeight: "900" }}
        onClick={() => router.push("/v1/rfq/add")}
        type="primary"
      >
        Get Quotes Now!
      </Button>
    </>
  );
};

export default RenderGetQuotesButton;

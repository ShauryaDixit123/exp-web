import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const RenderButtonList = (props: {
  list: {
    value?: string;
    label: string;
    icon: React.ReactNode;
  }[];
  gap?: string;
  coverFlexJustify?: string;
  coverClassName?: string;
  onClick?: (option: string) => void;
}) => {
  const [selectedState, setSelectedState] = React.useState<string>(
    props.list[1].value ? props.list[1].value : props.list[1].label
  );
  return (
    <>
      <Flex
        gap={props.gap}
        justify={props.coverFlexJustify}
        className={props.coverClassName}
      >
        {props.list.map((v, i) => (
          <Flex key={i} gap="2rem">
            <Button
              {...((selectedState === v.label || selectedState === v.value) && {
                type: "primary",
              })}
              icon={<ExportOutlined style={{ fontSize: "20px" }} />}
              className={` rounded-xl ${
                (selectedState !== v.label && selectedState !== v.value) &&
                "bg-slate-100 text-EXP_FIELD_NAME"
              } text-[14px] p-[1.5rem] font-[600] min-w-[180px]`}
              onClick={() => (
                props.onClick?.(v.value ? v.value : v.label),
                setSelectedState(v.value ? v.value : v.label),
              )}
            >
              {v.label}
            </Button>
            {i !== props.list.length - 1 && (
              <span className="border-[0.75px] rotate-90 border-[#999999]"></span>
            )}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default RenderButtonList;

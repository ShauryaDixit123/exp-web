import { Form } from "antd";

export const RenderPaddedWrapper = (props: any) => {
  return (
    <div className="flex items-start flex-col  w-full pt-[2.5rem]">
      <div
        style={{ width: props?.w ? props.w : "860px" }}
        className={`flex  flex-col min-h-max`}
      >
        {/* component header */}
        <div className="h-[50px] w-EXP_PAGE flex justify-between flex-col">
          <div className="text-EXP_HEADING font-EXP_MODAL_HEAD text-EXP_TT_TEXT">
            {props.heading}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-EXP_FIELD_NAME text-EXP_BTN_TEXT font-EXP_INP_WGT">
              {props.label}
            </div>
            {props.headerChildren}
          </div>
        </div>
        <Form
          form={props.form}
          style={{
            height: props?.h ? props.h : "",
            width: props?.w ? props.w : "860px",
          }}
          layout="vertical"
          className={`py-[2rem] flex flex-wrap gap-[2rem] items-start ${props?.childrenClassName}`}
        >
          {props.children}
        </Form>
        {props.noBorder ? null : (
          <div className="w-EXP_PAGE border-b-[1px] mt-4 border-b-EXP_HBL_BORDER"></div>
        )}
      </div>
    </div>
  );
};

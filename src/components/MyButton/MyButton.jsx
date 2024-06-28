import { Button, ConfigProvider } from "antd";

const MyButton = ({
  children,
  type,
  size,
  block,
  htmlType,
  onClick,
  color,
  desabled,
  style,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSize: 16,
            contentFontSizeLG: 18,
            contentFontSizeSM: 14,
            colorPrimary: color,
            colorPrimaryHover: color,
            colorPrimaryActive: color,
            defaultBorderColor: color,
            defaultColor: color,
            borderRadiusLG: 5,
            borderRadius: 5,
            borderRadiusSM: 4,
            controlHeight: 40,
            controlHeightLG: 50,
            controlHeightSM: 30,
          },
        },
      }}
    >
      <Button
        type={type}
        size={size}
        htmlType={htmlType}
        block={block}
        onClick={onClick}
        desabled={desabled}
        style={style}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default MyButton;
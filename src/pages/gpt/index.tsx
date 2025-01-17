import Layout from "@theme/Layout";
import { ProChat } from "@ant-design/pro-chat";
import { ThemeProvider } from "antd-style";
import { FC } from "react";
import "./index.css";

const GPT: FC = () => {
  return (
    <Layout title="MDE-GPT">
      <div className={["gpt-content"].join(" ")}>
        <ThemeProvider
          theme={{
            token: {
              colorPrimary: `var(--ifm-font-color-base);`,
              colorText: `var(--ifm-font-color-base);`,
              borderRadius: 20,
            },
          }}
        >
          <ProChat
            className="pro-chat"
            chatItemRenderConfig={{
              actionsRender: () => <></>,
            }}
            showTitle
            assistantMeta={{
              avatar: "/img/logo.svg",
              title: "MDE",
            }}
            userMeta={{
              avatar: "/img/user.svg",
              title: "用户",
            }}
            helloMessage={"欢迎使用 MDE Chat"}
            request={async (messages) => {
              const mockedData = `💪  MDE正在努力接入API中... 敬请期待！`;
              return new Response(mockedData);
            }}
          />
        </ThemeProvider>
      </div>
    </Layout>
  );
};

export default GPT;

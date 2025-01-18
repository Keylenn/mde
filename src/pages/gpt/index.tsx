import Layout from "@theme/Layout";
import { ProChat } from "@ant-design/pro-chat";
import { ThemeProvider } from "antd-style";
import { FC, useState } from "react";
import "./index.css";

const GPT: FC = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Layout title="MDE-GPT">
      <div className={["gpt-content"].join(" ")} hidden={loading}>
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
            loading={loading}
            chatItemRenderConfig={{
              actionsRender: () => {
                if (loading) {
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }
                return <></>;
              },
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
            onChatStart={console.log}
            onChatGenerate={console.warn}
          />
        </ThemeProvider>
      </div>
    </Layout>
  );
};

export default GPT;

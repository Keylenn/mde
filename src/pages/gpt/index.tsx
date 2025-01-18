"use client";

import Layout from "@theme/Layout";
import { ProChat, ProChatInstance } from "@ant-design/pro-chat";
import { ThemeProvider } from "antd-style";
import { FC, useState, useRef } from "react";
import chatsBox, { Chat } from "./chatsBox";
import "./index.css";
import { VERCEL_FUNS_API_ORIGIN } from "@site/src/config";

const MAX_LENGTH = 100;
const ERROR_CONTENT = "MDE出现了点问题😭 请晚点再试试";
const isErrorContent = (content: string) => content === ERROR_CONTENT;

const GPT: FC = () => {
  const [loading, setLoading] = useState(true);
  const chatRef = useRef<ProChatInstance>(null);
  const addChat = (message: Chat) => {
    chatsBox.setData((p) => {
      if (!p) p = { chats: [] };

      if (p.chats.length >= MAX_LENGTH) p.chats.shift();
      return { ...p, chats: [...p.chats, message] };
    });
  };
  return (
    <div className="gpt-page">
      <Layout title="MDE-GPT">
        <div className={["gpt-content", loading ? "hidden" : ""].join(" ")}>
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
              chatRef={chatRef}
              initialChats={chatsBox.getData()?.chats ?? []}
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
                const json = await fetch(`${VERCEL_FUNS_API_ORIGIN}/api/gpt`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    messages: messages.slice(0, 8).map(({ content, role }) => ({
                      content,
                      role,
                    })),
                  }),
                })
                  .then((r) => r.json())
                  .catch(console.error);

                const content =
                  json?.choices?.[0]?.message?.content ?? ERROR_CONTENT;

                const response = new Response(content);
                const chat = messages?.at(-1);
                if (chat) addChat(chat);
                return response;
              }}
              onChatEnd={(id) => {
                setTimeout(() => {
                  const chat = chatRef.current?.getChatById(id);
                  if (chat && !isErrorContent(chat?.content as string))
                    addChat(chat);
                }, 10);
              }}
              onResetMessage={async () => {
                chatsBox.setData((p) => ({ ...p, chats: [] }));
              }}
            />
          </ThemeProvider>
        </div>
      </Layout>
    </div>
  );
};

export default GPT;

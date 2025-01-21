import Layout from "@theme/Layout";
import { ProChat, ProChatInstance } from "@ant-design/pro-chat";
import { ThemeProvider } from "antd-style";
import { FC, useState, useRef } from "react";
import { Dropdown } from "antd";
import "./index.css";

import { ChatMessage } from "@ant-design/pro-chat";
import createBox, { createStorageBox } from "@boxly/core";
import { CommentOutlined } from "@ant-design/icons";
import type { ChatRequest } from "@ant-design/pro-chat/es/ProChat/store/initialState";
import { VERCEL_FUNS_API_ORIGIN } from "@site/src/config";
import { showToast } from "@site/src/helper";

const items = [
  {
    label: "glm-4-flash (支持联网)",
    key: "glm-4-flash",
  },
  {
    label: "gpt-3.5",
    key: "gpt-3.5",
  },
];

export type Chat = ChatMessage<Record<string, any>>;

export interface ChatsBoxType {
  chats: Chat[];
  defaultModel?: string;
}

const chatsBox = (
  typeof window === "undefined"
    ? createBox(null)
    : createStorageBox("mde_chats")
) as ReturnType<typeof createStorageBox<ChatsBoxType | null>>;

const MAX_LENGTH = 100;
const ERROR_CONTENT = "MDE出现了点问题😭 请晚点再试试";
const isErrorContent = (content: string) => content === ERROR_CONTENT;

const ChatComponent: FC = () => {
  const [model, setModel] = useState(() => {
    let m = chatsBox.getData()?.defaultModel;

    if (!m) {
      m = items[0].key;
      chatsBox.setData((p) => ({ ...p, defaultModel: m }));
    }

    return m;
  });
  const [loading, setLoading] = useState(true);
  const chatRef = useRef<ProChatInstance>(null);
  const addChat = (message: Chat) => {
    chatsBox.setData((p) => {
      if (!p || !p.chats) p = { chats: [] };

      if (p.chats.length >= MAX_LENGTH) p.chats.shift();
      return { ...p, chats: [...p.chats, message] };
    });
  };

  const handelJsonRequest: ChatRequest = async (messages) => {
    const json = await fetch(`${VERCEL_FUNS_API_ORIGIN}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        messages,
      }),
    })
      .then((r) => r.json())
      .catch(console.error);
    const content = json?.choices?.[0]?.message?.content ?? ERROR_CONTENT;

    return new Response(content);
  };

  const handelStreamRequest: ChatRequest = async (messages) => {
    const response = await fetch(
      "https://chat-pro-express.glitch.me/chat-pro",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          messages,
        }),
      }
    );

    // 确保服务器响应是成功的
    if (!response.ok || !response.body) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取 reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        function push() {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              const chunk = decoder.decode(value, {
                stream: true,
              });

              const message = chunk.replace("data: ", "");
              controller.enqueue(encoder.encode(message));

              push();
            })
            .catch((err) => {
              controller.error(err);
            });
        }
        push();
      },
    });
    return new Response(readableStream);
  };

  const handleChatRequest: ChatRequest = async (messages) => {
    let request = null;
    switch (model) {
      case "glm-4-flash":
        request = handelJsonRequest;
        break;
      case "gpt-3.5":
        request = handelStreamRequest;
        break;
    }
    if (!request) {
      return showToast("MDE 遇到了点问题😭");
    }

    const result = await request(
      messages.slice(-3).map(({ content, role }) => ({
        content,
        role,
      }))
    );

    const chat = messages?.at(-1);
    if (chat) addChat(chat);

    return result;
  };
  return (
    <div className="chat-page">
      <Layout title="MDE-Chat">
        <div className={["chat-content", loading ? "hidden" : ""].join(" ")}>
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
              actions={{
                render: (defaultDoms) => {
                  return [
                    <Dropdown
                      placement="topCenter"
                      menu={{
                        items,
                        onClick: ({ key }) => {
                          if (key !== model) {
                            setModel(key);
                            chatsBox.setData((p) => ({
                              ...p,
                              defaultModel: key,
                            }));
                          }
                        },
                      }}
                      trigger={["click"]}
                    >
                      <div className="model-entry flex-center">
                        <CommentOutlined />
                        <span style={{ marginLeft: "0.5em" }}>{model}</span>
                      </div>
                    </Dropdown>,
                    ...defaultDoms,
                  ];
                },
                flexConfig: {
                  gap: 24,
                  direction: "horizontal",
                  justify: "space-between",
                },
              }}
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
              request={handleChatRequest}
              onChatStart={() => {
                chatRef.current?.scrollToBottom();
              }}
              onChatEnd={(id) => {
                setTimeout(() => {
                  const chat = chatRef.current?.getChatById(id);
                  if (chat && !isErrorContent(chat?.content as string)) {
                    addChat(chat);
                  }
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

export default ChatComponent;

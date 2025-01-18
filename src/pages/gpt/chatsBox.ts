import { ChatMessage } from "@ant-design/pro-chat";
import { createStorageBox } from "@boxly/core";

export type Chat = ChatMessage<Record<string, any>>;

export interface ChatsBoxType {
  chats: Chat[];
}

let chatsBox = {};
if (typeof window !== "undefined") {
  chatsBox = createStorageBox<ChatsBoxType | null>("mde_gpt_chats");
}

export default chatsBox;

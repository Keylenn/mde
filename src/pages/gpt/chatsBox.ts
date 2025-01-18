"use client";

import { ChatMessage } from "@ant-design/pro-chat";
import { createStorageBox } from "@boxly/core";

export type Chat = ChatMessage<Record<string, any>>;

export interface ChatsBoxType {
  chats: Chat[];
}

const chatsBox: ReturnType<typeof createStorageBox<ChatsBoxType | null>> =
  typeof window !== "undefined"
    ? createStorageBox("mde_gpt_chats")
    : ({} as any);

export default chatsBox;

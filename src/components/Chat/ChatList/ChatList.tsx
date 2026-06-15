import React, { memo } from "react";
import { Badge } from "antd";

import ProfileImage from "../../Profile/ProfileImage";
import { truncate } from "../../../utilities/truncate";
import { formatMessageDateTime } from "../../../utilities/DateTimeConvertor";
import { isNotEmptyArray } from "../../../utilities/ValueChecker";

interface ChatListProps {
  userMessagesList: Chat[];
  loading?: boolean;
  error?: string | null;
  onChatSelect?: (chat: Chat) => void;
}

interface Chat {
  id: string;
  unreadCount: number;

  user: {
    userId: string;
    name: string;
    profile: string;
    isOnline?: boolean;
    isGroup?: boolean;
  };

  lastMessage: {
    text: string;
    senderId: string;
    timestamp: Date;
  };
}

const EmptyState = () => (
  <div
    className="h-100 d-flex justify-content-center align-items-center"
    style={{ color: "#8B5E34" }}
  >
    No conversations found
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div
    className="h-100 d-flex justify-content-center align-items-center"
    style={{ color: "#dc3545" }}
  >
    {message}
  </div>
);

const LoadingState = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    Loading chats...
  </div>
);

const ChatList = ({
  userMessagesList,
  loading = false,
  error = null,
  onChatSelect,
}: ChatListProps) => {
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!isNotEmptyArray(userMessagesList)) {
    return <EmptyState />;
  }

  return (
    <div
      className="d-flex flex-column gap-2 hide-scrollbar px-2"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 165px)",
      }}
    >
      {userMessagesList.map((chat) => (
        <React.Fragment key={chat.id}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onChatSelect?.(chat)}
            className="d-flex gap-2 align-items-center p-2"
            style={{
              background: chat.unreadCount > 0 ? "#FFF4DD" : "transparent",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "all .2s ease",
            }}
          >
            <ProfileImage
              profile={chat.user.profile}
              size={54}
              status={{
                isStatus: chat.user.isOnline,
                statusSize: "16px",
                top: "0",
                left: "70%",
              }}
            />

            <div className="d-flex flex-column flex-1 w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className="fw-semibold"
                  style={{
                    color: "#3E2F24",
                  }}
                >
                  {chat.user.name}
                </div>

                <small
                  style={{
                    color: "#8B5E34",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatMessageDateTime(chat.lastMessage.timestamp)}
                </small>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div
                  style={{
                    color: "#6D5D4F",
                    fontSize: "13px",
                  }}
                >
                  {truncate(chat.lastMessage.text, 40)}
                </div>

                {chat.unreadCount > 0 && (
                  <Badge
                    count={chat.unreadCount}
                    style={{
                      background: "#B7791F",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className="align-self-center w-75"
            style={{
              borderBottom: "1px solid #F0D7A1",
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default memo(ChatList);

import appStyle from "./AppLayout.module.css";
import Logo from "../components/Logo";

import { LogOut, Menu } from "lucide-react";
import DrawerComp from "../components/Drawer/DrawerComp";
import { useState } from "react";
import ProfileImage from "../components/Profile/ProfileImage";
import UserInfo from "../components/UserInfo";
import ChatSegment from "../components/Segments/ChatSegment";
import ChatList from "../components/Chat/ChatList/ChatList";
const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const userMessagesList = [
    {
      id: "chat_1",
      participants: ["user_100", "user_101"],
      user: {
        userId: "user_101",
        name: "Mr. MC",
        profile: "https://randomuser.me/api/portraits/men/1.jpg",
        isOnline: true,
      },
      lastMessage: {
        text: "Hey Ashish, are we meeting today?",
        senderId: "user_101",
        timestamp: new Date(),
      },
      unreadCount: 5,
    },
    {
      id: "chat_2",
      participants: ["user_100", "user_102"],
      user: {
        userId: "user_102",
        name: "Miss. BC",
        profile: "https://randomuser.me/api/portraits/women/44.jpg",
        isOnline: true,
      },
      lastMessage: {
        text: "I have shared the design files.",
        senderId: "user_102",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      unreadCount: 2,
    },
    {
      id: "chat_3",
      participants: ["user_100", "user_103"],
      user: {
        userId: "user_103",
        name: "Rohit Sharma",
        profile: "https://randomuser.me/api/portraits/men/32.jpg",
        isOnline: false,
      },
      lastMessage: {
        text: "Let's discuss the API integration.",
        senderId: "user_100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      unreadCount: 0,
    },
    {
      id: "chat_4",
      participants: ["user_100", "user_101", "user_102", "user_103"],
      user: {
        userId: "group_101",
        name: "Frontend Team",
        profile: "https://cdn-icons-png.flaticon.com/512/681/681494.png",
        isGroup: true,
      },
      lastMessage: {
        text: "Ashish: PR has been merged 🚀",
        senderId: "user_100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
      unreadCount: 12,
    },
    {
      id: "chat_5",
      participants: ["user_100", "user_104"],
      user: {
        userId: "user_104",
        name: "Priya",
        profile: "https://randomuser.me/api/portraits/women/68.jpg",
        isOnline: true,
      },
      lastMessage: {
        text: "Can you review my code?",
        senderId: "user_104",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
      },
      unreadCount: 1,
    },
    {
      id: "chat_6",
      participants: ["user_100", "user_105"],
      user: {
        userId: "user_105",
        name: "Akash",
        profile: "https://randomuser.me/api/portraits/men/76.jpg",
        isOnline: true,
      },
      lastMessage: {
        text: "Bro, check your email.",
        senderId: "user_105",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      unreadCount: 3,
    },
  ];
  return (
    <div className={appStyle.container}>
      <DrawerComp
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="User Profile"
      >
        <UserInfo />
      </DrawerComp>
      <div className={appStyle.sidebar}>
        <div className={appStyle.sidebarHeader}>
          <div className={appStyle.sidebarLogo}>
            <Logo width="50" height="50" />
          </div>
          <div
            className={appStyle.sidebarSettings}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu stroke="#A39281" />
          </div>
        </div>
        <div className={appStyle.sidebarMenu}>
          <div className=" w-100">
            <ChatSegment
              options={[
                {
                  label: "All",
                  pending_messages: 101,
                },
                {
                  label: "Unread",
                  pending_messages: 12,
                },
                {
                  label: "Archived",
                  pending_messages: 5,
                },
                {
                  label: "Groups",
                  pending_messages: 8,
                },
              ]}
              handleOnChange={(tab: string) => {
                console.log(tab);
              }}
            />
          </div>
          <div className="w-100">
            <ChatList
              userMessagesList={userMessagesList}
              loading={false}
              error={false}
              onChatSelect={() => {}}
            />
          </div>
        </div>
        <div className={appStyle.sidebarFooter}>
          <div className={appStyle.userProfile}>
            <div className={appStyle.userInfo}>
              <div className={appStyle.avatar}>
                <ProfileImage
                  profile="https://res.cloudinary.com/djw5fw1xp/image/upload/v1775902424/main-sample.png"
                  size={40}
                  status={{
                    isStatus: true,
                    statusSize: "15px",
                    top: "10%",
                    left: "75%",
                  }}
                />
              </div>
              <div className={appStyle.userNameContainer}>
                <div className={appStyle.userName}>Ashish Armarkar</div>
              </div>
            </div>
          </div>
          <div className="">
            <div className={appStyle.footerIcon}>
              <LogOut stroke="#EF4444" />
            </div>
          </div>
        </div>
      </div>
      <div className={appStyle.mainContainer}></div>
    </div>
  );
};

export default AppLayout;

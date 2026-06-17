import appStyle from "./AppLayout.module.css";
import Logo from "../components/Logo";

import {
  Ban,
  ChevronRight,
  CircleUserRound,
  LogOut,
  Menu,
  Pencil,
  Trash,
  User,
} from "lucide-react";
import DrawerComp from "../components/Drawer/DrawerComp";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../components/Profile/ProfileImage";
import UserInfo from "../components/UserInfo";
import ChatSegment from "../components/Segments/ChatSegment";
import ChatList from "../components/Chat/ChatList/ChatList";
import { logoutUser } from "../firebase/auth";
import { showToast } from "../components/Toast";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/Store";
import Block from "../components/Card/Block";
import UserRightDrawer from "../components/UserRightDrawer";
import UserChatWith from "../components/Chat/ChatList/UserChat/UserChatWith";

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    isOpen: false,
    user: null,
  });
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userData).userData;

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.clear();
      showToast("Logged out successfully.", "success");
      navigate("/login");
    } catch (error: any) {
      showToast(error?.message || "Logout failed. Please try again.", "error");
      console.error("Logout error:", error);
    }
  };

  const userMessagesList = [
    {
      id: "chat_1",
      participants: ["user_100", "user_101"],
      user: {
        userId: "user_101",
        userName: "Mr. MC",
        email: "mr.mc@gmail.com",
        profileImage: ["https://randomuser.me/api/portraits/men/1.jpg"],
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
        userName: "Miss. BC",
        email: "miss.bc@gmail.com",
        profileImage: ["https://randomuser.me/api/portraits/women/44.jpg"],
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
        userName: "Rohit Sharma",
        email: "rohit.sharma@gmail.com",
        profileImage: ["https://randomuser.me/api/portraits/men/32.jpg"],
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
        userName: "Frontend Team",
        email: "frontend.team@chatbee.com",
        profileImage: ["https://cdn-icons-png.flaticon.com/512/681/681494.png"],
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
        userName: "Priya",
        email: "priya@gmail.com",
        profileImage: ["https://randomuser.me/api/portraits/women/68.jpg"],
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
        userName: "Akash",
        email: "akash@gmail.com",
        profileImage: ["https://randomuser.me/api/portraits/men/76.jpg"],
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

  console.log({ userData });
  const theActitivties = {
    true: [
      [
        {
          id: 1,
          title: "Account",
          description: "Manage your account",
          prefix: (
            <span>
              <User size={20} />
            </span>
          ),
          suffix: (
            <span>
              <ChevronRight size={16} />
            </span>
          ),
        },
      ],
      [
        {
          id: 1,
          title: "About",
          description: "Frontend Developer",
          prefix: (
            <span>
              <CircleUserRound size={18} />
            </span>
          ),
          suffix: (
            <span>
              <Pencil size={16} />
            </span>
          ),
        },
      ],
    ],
    false: [
      [
        {
          id: 1,
          title: "About",
          description: "Frontend Developer",
          prefix: (
            <span>
              <CircleUserRound size={18} />
            </span>
          ),
        },

        {
          id: 2,
          title: "Contactn Number",
          description: "Frontend Developer",
          prefix: (
            <span>
              <CircleUserRound size={18} />
            </span>
          ),
        },

        {
          id: 2,
          title: "Clear Chat",
          description: "Frontend Developer",
          prefix: (
            <span>
              <CircleUserRound size={18} />
            </span>
          ),
        },
      ],
    ],
  };
  const userInfo = useMemo(() => {
    const user = isDrawerOpen?.user;
    const myActivities =
      theActitivties[isDrawerOpen?.user?.email === userData?.email];
    return {
      userInfo: user,
      editable: isDrawerOpen?.user?.email === userData?.email,
      activities: myActivities,
    };
  }, [JSON.stringify(isDrawerOpen), JSON.stringify(userData)]);

  const [otherUser, setOtherUser] = useState(null);
  return (
    <div className={appStyle.container}>
      <UserRightDrawer
        isDrawerOpen={isDrawerOpen.isOpen}
        setIsDrawerOpen={() =>
          setIsDrawerOpen((prev) => ({ ...prev, isOpen: false }))
        }
        userData={userInfo}
      />
      <div className={appStyle.sidebar}>
        <div className={appStyle.sidebarHeader}>
          <div className={appStyle.sidebarLogo}>
            <Logo width="50" height="50" />
          </div>
          <div
            className={appStyle.sidebarSettings}
            onClick={() => setIsDrawerOpen({ isOpen: true, user: userData })}
          >
            <Menu stroke="#A39281" />
          </div>
        </div>
        <div className={appStyle.sidebarMenu}>
          <div className=" w-100">
            <ChatSegment
              options={[
                {
                  label: "Messages",
                  pending: 101,
                },
                {
                  label: "Requested",
                  pending: 12,
                },
                {
                  label: "Add friend",
                  pending: 5,
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
              onChatSelect={(data) => setOtherUser(data as any)}
            />
          </div>
        </div>
        <div className={appStyle.sidebarFooter}>
          <div className={appStyle.userProfile}>
            <div className={appStyle.userInfo}>
              <div className={appStyle.avatar}>
                <ProfileImage profile={userData?.profileImage[0]} size={40} />
              </div>
              <div className={appStyle.userNameContainer}>
                <div className={appStyle.userName}>{userData?.userName}</div>
              </div>
            </div>
          </div>
          <div className="">
            <div
              className={appStyle.footerIcon}
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              <LogOut stroke="#EF4444" />
            </div>
          </div>
        </div>
      </div>
      <div className={appStyle.mainContainer}>
        {otherUser && (
          <UserChatWith
            secondPersonData={otherUser}
            setIsDrawerOpen={(data) => setIsDrawerOpen(data)}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;

import { useQuery } from "@tanstack/react-query";
import AppLayout from "../layouts/AppLayout";
import { sessionData } from "../utilities/GetDataFromLocalStorage";
import { getUser } from "../firebase/user";
import { useDispatch } from "react-redux";
import { setUerData } from "../Store/Slices/UserSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = sessionData();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userData?.uid],
    queryFn: async () => {
      const response = await getUser(userData?.uid);

      if (response?.data) {
        dispatch(setUerData(response.data));
      }

      return response;
    },
    enabled: !!userData?.uid,
  });

  console.log("User Data:", data);

  const containerStyles = {
    height: "100vh",
    width: "100%",
  };

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error)?.message}</div>;
  }
  return (
    <div className="" style={containerStyles}>
      <AppLayout />
    </div>
  );
};

export default Dashboard;

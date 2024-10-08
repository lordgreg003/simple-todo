import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store/store";
import { GetUserProfileByIdAction } from "../../redux/Actions/users/profile/UserProfileAction";
import Nav from "../layout/Nav";
import Dashboardfooter from "../layout/Dashboard-footer";
import { ThunkDispatch } from "redux-thunk";
import Sidebar from "../layout/Sidebar";

const UserDashboard: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserProfile
  );

  const data = useMemo(() => {
    return serverResponse?.data;
  }, [serverResponse]);

  useEffect(() => {
    dispatch(GetUserProfileByIdAction());
  }, [dispatch]);

  return (
    <div className="flex h-[47.8rem] bg-gray-900 p-6 overflow-y-hidden text-white">
      <Sidebar />
      <div className="flex-grow h-auto bg-gray-800 p-8">
        <Nav />
        <main className="mt-8 bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            User Dashboard
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-full text-xl text-gray-400">
              Loading...
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-400">Name:</strong>{" "}
                {data?.name || "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-400">Username:</strong>{" "}
                {data?.username || "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-400">Email:</strong>{" "}
                {data?.email || "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-400">Created At:</strong>{" "}
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-400">Updated At:</strong>{" "}
                {data?.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          )}
        </main>
        <Dashboardfooter />
      </div>
    </div>
  );
};

export default UserDashboard;

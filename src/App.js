import React, { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Tags,
  StarredQue,
  Users,
  Leaderboard,
  Settings,
  Support,
  AskQuestion,
  UserInfo,
  SearchResults,
  TagsDescription,
  QuestionView,
  ProfileView,
  EditProfile,
  UserNotifications,
} from "./pages";

import { Navbar } from "./components";
import axios from "axios";
import useFetch from "./hooks/useFetch";

// const _SSOData = {
//   aud: ["173e98ac-36dc-4736-8cfb-4198522d51fc"],
//   sub: "MAVADHU_4",
//   client_id: "173e98ac-36dc-4736-8cfb-4198522d51fc",
//   email: "capgemini.avadhut_dalavi@mercedes-benz.com",
//   exp: 1680168415,
//   family_name: "Moreshwar",
//   given_name: "Dalavi",
//   iat: 1680166616,
//   iss: "http://tex-service.qa-platform",
//   jti: "3ZPqvXgomiST2F7LhX3noR",
//   nbf: "1680166496",
//   scope:
//     "openid profile email offline_access phone group_type organizational_data",
// };

function App() {
  const SSO_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/sso/user/v1`;
  const FETCH_USER_URL = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/list/v1`;
  const SAVE_USER_URL = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/save/v1`;

  const checkUser = () => {
    axios
      .get(SSO_URL)
      .then((_ssoResponse) => {
        try {
          const PAYLOAD = {
            order: "ASC",
            sortBy: "points",
            page: 1,
            size: 1,
            shortId: _ssoResponse.data.sub,
          };
          axios
            .post(FETCH_USER_URL, PAYLOAD)
            .then((userListResponse) => {
              if (userListResponse.data.length === 0) {
                let SAVE_PAYLOAD = {
                  department: "ITP/IT",
                  createdBy: "admin",
                  about: "",
                  experties: [""],
                };

                if (
                  _ssoResponse.data.sub !== undefined &&
                  _ssoResponse.data.given_name !== undefined &&
                  _ssoResponse.data.family_name !== undefined &&
                  _ssoResponse.data.email !== undefined
                ) {
                  SAVE_PAYLOAD["shortId"] = _ssoResponse.data.sub;
                  SAVE_PAYLOAD["firstName"] = _ssoResponse.data.given_name;
                  SAVE_PAYLOAD["lastName"] = _ssoResponse.data.family_name;
                  SAVE_PAYLOAD["emailId"] = _ssoResponse.data.email;
                }

                try {
                  axios
                    .post(SAVE_USER_URL, SAVE_PAYLOAD)
                    .then((userSaveResponse) => {
                      sessionStorage.removeItem("USER_DETAILS");
                      sessionStorage.setItem(
                        "USER_DETAILS",
                        JSON.stringify(userSaveResponse.data)
                      );
                    })
                    .catch((err) => console.log(err));
                } catch (error) {
                  console.log(`Error while save user: ${error}`);
                }
              } else {
                sessionStorage.removeItem("USER_DETAILS");
                sessionStorage.setItem(
                  "USER_DETAILS",
                  JSON.stringify(userListResponse.data[0])
                );
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(`SSO fetch Error: ${err}`));
  };

  useEffect(() => {
    checkUser();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<Users />} />
        <Route path="/bookmarked" element={<StarredQue />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/TagsDescription/:id" element={<TagsDescription />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/ask-question" element={<AskQuestion />}>
          <Route path=":questionId/edit" element={<AskQuestion />} />
        </Route>
        <Route path="/question/:id" element={<QuestionView />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/search-results/:text" element={<SearchResults />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/profile-view" element={<ProfileView></ProfileView>} />
        <Route path="/edit-profile" element={<EditProfile></EditProfile>} />
        <Route
          path="/notifications"
          element={<UserNotifications></UserNotifications>}
        />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// import "bootstrap/dist/css/bootstrap.min.css";

// CSS
import "./App.css";
import styled from "styled-components";

// React JS
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react-alert
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Conponents
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Users/Register";
import Alert from "./components/Alert";
import Private from "./components/Private";
import Home from "./components/Home";
import Login from "./components/Users/Login";
import AddEducation from "./components/profilesForms/AddEducation";
import AddExperience from "./components/profilesForms/AddExperience";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Posts from "./components/Post/Posts";
import EditProfile from "./components/profilesForms/EditProfile";
import CreateProfile from "./components/profilesForms/CreateProfile.js";
import Comments from "./components/Post/Comments.js";
import Peoples from "./components/Peoples.js";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { setAuthToken } from "./utils";
import { loadUser } from "./redux/modules/users";

// Alerts Setup

const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter basename="/tawasol-application">
        <AlertProvider template={AlertTemplate} {...options}>
          <>
            <Alert />
            <Holder>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Landing />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="/home"
                  element={<Private components={Home} />}
                ></Route>
                <Route
                  path="/create-profile"
                  element={<Private components={CreateProfile} />}
                />
                <Route
                  path="/edit-profile"
                  element={<Private components={EditProfile} />}
                />
                <Route
                  path="/add-education"
                  element={<Private components={AddEducation} />}
                />
                <Route
                  path="/add-experience"
                  element={<Private components={AddExperience} />}
                />
                <Route
                  path="/peoples"
                  element={<Private components={Peoples} />}
                />
                <Route path="/posts" element={<Private components={Posts} />} />
                <Route
                  path="/settings"
                  element={<Private components={Settings} />}
                />
                <Route
                  path="/profile/:id"
                  element={<Private components={Profile} />}
                />
                <Route
                  path="/posts/:id"
                  element={<Private components={Comments} />}
                />
              </Routes>
            </Holder>
          </>
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

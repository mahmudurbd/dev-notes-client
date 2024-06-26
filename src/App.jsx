import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  const { access_token } = userAuth;

  // useEffect(() => {
  //   let userInSession = lookInSession("user");
  //   console.log(userInSession);

  //   userInSession
  //     ? setUserAuth(JSON.parse(userInSession))
  //     : setUserAuth({ access_token: null });
  // }, []);

  useEffect(() => {
    if (!access_token) {
      const sessionData = lookInSession("user");
      if (sessionData) {
        setUserAuth(JSON.parse(sessionData));
      } else {
        setUserAuth({ access_token: null });
      }
    }
  }, [access_token, setUserAuth]);
  console.log(userAuth);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route
          path="/"
          element={<Navbar userAuth={userAuth} setUserAuth={setUserAuth} />}
        >
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;

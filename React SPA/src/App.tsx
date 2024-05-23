import React, { FC } from "react";
import { IAccountInfo } from "react-aad-msal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./Components/HomePage";
import { Header } from "./Components/common/Header";
import { NotFoundPage } from "./Components/common/NotFoundPage";
import UserStoreContext, {
  UserStoreDefault,
} from "./Components/common/UserStoreContext";
import { ItemsPage } from "./Components/items/ItemsPage";
import { LogoutFunction } from "./authProviders/authProvider";

export type AppProps = {
  accountInfo: IAccountInfo;
  logout: LogoutFunction;
};

const App: FC<AppProps> = ({ accountInfo, logout }) => {
  const [readonly, setReadonly] = React.useState(UserStoreDefault.readonly);

  return (
    <>
      <UserStoreContext.Provider value={{ readonly, setReadonly }}>
        <ToastContainer autoClose={3000} hideProgressBar />

        <BrowserRouter>
          <Header accountInfo={accountInfo} logout={logout} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </UserStoreContext.Provider>
    </>
  );
};

export default App;

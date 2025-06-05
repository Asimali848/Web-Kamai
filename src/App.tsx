import { Route, Routes } from "react-router-dom";

import GlobalLayout from "./components/global-layout";
import RouteGuard from "./components/route-guard";
import AdminProfile from "./pages/admin";
import Forgot from "./pages/auth/forgot";
import Login from "./pages/auth/login";
import SetNewPassword from "./pages/auth/new-password";
import PasswordReset from "./pages/auth/password-reset";
import SignUp from "./pages/auth/sign-up";
import EthlyFiPage from "./pages/fraude";
import Profile from "./pages/profile";
import TaskList from "./pages/task-list";
import TaskDetailsPage from "./pages/task-page";
import Uploader from "./pages/uploader";
import WalletPage from "./pages/wallet";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/set-newpassword" element={<SetNewPassword />} />
      <Route
        element={
          <RouteGuard>
            <GlobalLayout />
          </RouteGuard>
        }
      >
        <Route path="/" element={<EthlyFiPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploader" element={<Uploader />} />
        <Route path="/admin" element={<AdminProfile />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/profile/wallet" element={<WalletPage />} />
        <Route path="/task-page" element={<TaskDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default App;

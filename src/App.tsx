import { Route, Routes } from "react-router-dom";

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
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/set-newpassword" element={<SetNewPassword />} />
      <Route path="/" element={<EthlyFiPage />} />
      <Route path="/task-list" element={<TaskList />} />
      <Route path="/task-page" element={<TaskDetailsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/wallet" element={<WalletPage />} />
      <Route path="/admin" element={<AdminProfile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/uploader" element={<Uploader />} />

      {/* <Route path="/practices" element={<Practice />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/question-attempt/:id" element={<AttemptQuestion />} />
      <Route path="/question-solution/:id" element={<QuestionSolution />} />
      <Route path="/question-artboard/:id" element={<QuestionArtboard />} /> */}
    </Routes>
  );
};

export default App;

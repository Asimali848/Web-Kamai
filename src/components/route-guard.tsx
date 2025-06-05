import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { token } = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : { token: null };
  console.log(token);
  if (token) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-auto bg-background">
        {children}
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteGuard;

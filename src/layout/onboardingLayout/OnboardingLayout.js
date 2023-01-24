import React from "react";
import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    <main className="onboarding-layout min-h-screen">
      <div className="flex md:flex-row flex-col-reverse min-h-screen">
        <Outlet />
      </div>
    </main>
  );
};

export default OnboardingLayout;

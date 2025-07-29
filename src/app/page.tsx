import React from "react";
import Hero from "./hero/page";
import ProtectedRouteProvider from "./AuthContext/proctedRoute";
const page = () => {
  return (
    <>
      <ProtectedRouteProvider>
        <Hero />
      </ProtectedRouteProvider>
    </>
  );
};

export default page;

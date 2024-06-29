"use client";
import UsersTable from "@/components/dashboard/UsersTable";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const getUser = window.localStorage.getItem("blkusr");
    if (getUser != "admin") {
      alert("You are not authorized to access this path");
      router.push("/");
    }
  }, []);
  return (
    <div>
      <UsersTable />
    </div>
  );
};

export default Dashboard;

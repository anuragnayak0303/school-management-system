import axios from "axios";
import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/auth";
import Login from "../../Auth/Login";

export default function StudentProtected() {
  const [ok, setOk] = useState(false);
  const {auth} = useAuth();
  useEffect(() => {
    async function authCheck() {
      const { data } = await axios.get(
        `https://school-management-system-1-jprf.onrender.com/api/v2/user/user-protected`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(data)
      if (data?.ok) {
        setOk(data?.ok);
      } else {
        setOk(false);
      }
    }
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return <div>{ok ? <Outlet /> : <Login />}</div>;
}

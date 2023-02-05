import * as React from "react";
import {Outlet} from "react-router-dom";
import "./BaseLayout.scss";

export default function BaseLayout() {
  return (
    <Outlet/>
  );
}

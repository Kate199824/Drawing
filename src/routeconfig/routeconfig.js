import React from "react";
import PageLoader from "../component/Loadable/index";
import { DefaultLayout } from "../layout/defaultLayout";

//-----------Pages---------------------------
const Home = PageLoader( ()=>import("../routes/home/index") );

//-----------Routes--------------------------
export default [
    <DefaultLayout path={"/"} component={Home}/>,
];


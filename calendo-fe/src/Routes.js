import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login"; // Login 페이지 import
import WholeSchedule from "./pages/schedule/WholeSchedule"; // 로그인 성공 시 이동할 페이지 import
import Home from "./pages/home/Home"; // 기존 Home 페이지
import { InvitePage } from "./pages/invite/InvitePage";
import CreatePlan from "./pages/create/createPlan";
import CreateTime from "./pages/create/createTime";
import CheckTime from "./pages/check/checkTime";

import MyPage from "./pages/myPage/MyPage";
import Alert from "./pages/alert/alertPage";



const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<WholeSchedule />} /> {/* 기본 경로는 로그인 페이지 */}
                    <Route path="/whole-schedule" element={<WholeSchedule />} /> {/* 로그인 성공 시 이동할 페이지 */}
                    <Route path="/home" element={<Home />} /> {/* 기존 Home 페이지는 /home 경로로 이동 */}
                    <Route path="/invite" element={<InvitePage />} />
                    <Route path="/plan" element={<CreatePlan />} />
                    <Route path="/time" element={<CreateTime />} />
                    <Route path="/check" element={<CheckTime />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/alert" element={<Alert />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Router;

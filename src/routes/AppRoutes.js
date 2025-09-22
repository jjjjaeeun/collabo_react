import { Route, Routes } from "react-router-dom";

import HomePage from './../pages/HomePage';

import FruitOne from './../pages/FruitOne';
import FruitList from './../pages/FruitList';

import Element from './../pages/Element';
import ElementList from './../pages/ElementList';

import SignupPage from './../pages/SignupPage';
import LoginPage from './../pages/LoginPage';
import LogoutPage from './../pages/LogoutPage';


// 이 파일은 라우팅 정볼르 담고있는 파일
// 이러한 파일을 네트워크에서는 routing table 이라고 함
function App({ user, handleLoginSuccess, logout }) {
    //user: 사용자 정보를 저장하고 있는 객체
    // handleLoginSuccess: 로그인 성공시 동작할 액션

    return (

        <Routes>
            {/* path 프롭스는 요청 정보 url, element 프롭스는 컴포넌트 이름 */}
            <Route path="/" element={<HomePage />} />

            <Route path="/fruit" element={<FruitOne />} />
            <Route path="/fruit/list" element={<FruitList />} />

            <Route path="/element" element={<Element />} />
            <Route path="/element/list" element={<ElementList />} />

            <Route path="/member/signup" element={<SignupPage />} />
            <Route path="/member/login" element={<LoginPage setUser={handleLoginSuccess} />} />
            <Route path="/member/logout" element={<LogoutPage onLogout={logout} />} />
        </Routes>

    );
}

export default App;
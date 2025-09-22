import './App.css';

// 분리된 리액트 컴포넌트 import
import MenuItems from './ui/MenuItems';
import AppRoutes from './routes/AppRoutes'
import { useEffect, useState } from 'react';

function App() {
  const appName = "IT Academy Coffee Shop"

  // user: 로그인 한 사람의 정보를 저장하고 있는 state
  // 클라이언트에서 사용자 정보를 저장하기 위하여 localStorage를 사용하겠습니다.
  const [user, setUser] = useState(null);

  // JSON.parse()는 JSON 형태의 문자열을 자바 스크립트 객체 형태로 변환해 줌

  useEffect(() => {
    const loginUser = localStorage.getItem('user')
    setUser(JSON.parse(loginUser));
  }, []); // 두번째 매개 변수가 empty array이므로 한번만 rendering됨

  const handleLoginSuccess = (userData) => {
    // userData: LoginPage.js에서 반환 받은 member 정보임
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('로그인 성공');
  }

  const handleLogoutSuccess = () => {
    setUser(null);
  }

  return (
    <>

      <MenuItems appName={appName} user={user} />

      {/* 분리된 라우터 정보 */}
      <AppRoutes user={user} handleLoginSuccess={handleLoginSuccess} logout={handleLogoutSuccess} />

      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025{appName}.All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;

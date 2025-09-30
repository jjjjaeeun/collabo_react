
import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";


function App({ user }) {
    const thStyle = { fontSize: '1.2rem' }; // 테이블 헤드 스타일

    useEffect(() => {
        if (user && user?.id) {
        }
    }, [user]);

    return (
        <Container className="mt-4">
            <h2 className="mb-4" >
                {/* 숫자rem은 주위 글꼴의 숫자배를 의미 */}
                <span style={{ color: 'blue', fontSize: '2rem' }}>{user?.name}</span>
                <span style={{ fontSize: '1.3rem' }}>님의 장바구니</span>
            </h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th style={thStyle}>상품 정보</th>
                        <th style={thStyle}>수량</th>
                        <th style={thStyle}>금액</th>
                    </tr>
                </thead>

            </Table>

        </Container>
    );
}

export default App;
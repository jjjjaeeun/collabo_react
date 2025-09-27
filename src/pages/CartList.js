import { Button, Container, Form, Table } from "react-bootstrap";

function App({ user }) {
    const thStyle = { fontSize: '1.2rem' }; // 테이블 헤드 스타일

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
                        <th style={thStyle}>
                            <Form.Check
                                type="checkBox"
                                label="전체 선택"
                                onChange={``}
                            />

                        </th>
                        <th style={thStyle}>상품 정보</th>
                        <th style={thStyle}>수량</th>
                        <th style={thStyle}>금액</th>
                        <th style={thStyle}>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>xx</td>
                    </tr>
                </tbody>
            </Table>
            {/* text-end 우측 정렬, text-start 좌측 정렬, text-center 가운데 정렬 */}
            <h3 className="text-end mt-3">총 주문금액: 0원</h3>
            <div className="text-end">
                <Button variant="primary" size="lg" onClick={``}>
                    주문하기
                </Button>
            </div>
        </Container>
    );
}

export default App;
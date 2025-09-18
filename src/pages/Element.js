import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";

function App() {
    const [element, setElement] = useState({});

    useEffect(() => {
        const url = `${API_BASE_URL}/element`;

        axios.get(url, {})
            .then((response) => {
                setElement(response.data);
            });
    }, []);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <td>아이디</td>
                        <td>이름</td>
                        <td>가격</td>
                        <td>카테고리</td>
                        <td>재고</td>
                        <td>이미지</td>
                        <td>설명</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{Number(element.price).toLocaleString()}원</td>
                        <td>{element.category}</td>
                        <td>{Number(element.stock).toLocaleString()}</td>
                        <td>{element.image}</td>
                        <td>{element.description}</td>

                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default App;
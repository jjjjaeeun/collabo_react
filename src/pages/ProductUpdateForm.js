import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { API_BASE_URL } from '../config/config';
import { useNavigate } from 'react-router-dom';

// useParams 훅은 url에 들어있는 동적 파라미터의 값을 챙길대 사용
import { useParams } from "react-router-dom";

/*
상품 수정 페이지

상품 등록과 다른 점
    기본 키인 상품의 id 정보가 넘어옴
    id를 사용하여 기존에 입력했던 상품에 대한 정보를 미리 보여 주어야 함.(useEffect 훅 사용)

step 01
기존 등록 Form 양식을 복사합니다.

기존 상품 정보 읽기
    get 방식을 사용하여 해당 상품의 정보를 읽어 옵니다.

테스트 시나리오
    특정 상품에 대하여 수정 버튼을 클릭하면, 이전 상품 정보들이 입력란에 보여야함

다음 함수들은 '상품 등록'과 동일함
    ControlChange 함수
    FileSelect 함수


각 컨트롤에 대한 change 이벤트 함수를 구현
(ControlChange)
    컨트롤(input type): 이름, 가격, 재고, 상품설명
    컨트롤(combo type): 카테고리

FileSelect 함수
    업로드할 이미지 선택에 대한 이벤트 함수를 구현합니다.
    FileReader API를 사용하여 해당 이미지를 Base64 인코딩 문자열로 변환 작업을 함

SubmitAction 함수
    등록이라는 문구를 모두 수정으로 변경
    insert -> update로 변경
    axios.pos -> axios.put로 변경함
    컨트롤에 입력된 내용들을 BackEnd로 전송함

파일 업로드시 유의 사항
    전송 방식은 post로 전송
    input 양식의 type="file"로 작성해야함

테스트 시나리오
    이미지 폴더에 product_로 시작하는 이미지가 업로드 되어야 함
    데이터 베이스에 1행이 추가 되어야 함
    상품 목록 페이지에 수정된 정보가 보여야함

미결사항
    과거에 업로드 했던 이전 이미지를 삭제해야함
*/

function App({ user }) {
    const { id } = useParams();
    console.log(`수정할 상품 번호: ${id}`);

    const comment = '상품 수정';

    const initial_value = {
        name: '', price: '', category: '', stock: '', image: '', description: ''
    }; // 상품 객체 정보

    // product는 백엔드에 넘겨줄 상품 등록 정보를 담고있는 객체
    const [product, setProduct] = useState(initial_value);

    // id를 이용하여 기존에 입력한 상품 정보를 가져오기
    useEffect(() => {

        if (!user || user.role !== 'ADMIN') {
            alert(`${comment}기능은 관리자만 접근이 가능합니다.`);
            navigate('/');
        }

        const url = `${API_BASE_URL}/product/update/${id}`;

        axios.get(url, { withCredentials: true })
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(`상품 ${id}번 오류 발생: ${error}`);
                alert('해당 상품 정보를 읽어 오지 못했습니다.')
            });

    }, [id]); // id 값이 변경될 때 마다 화면을 re-rendering 시켜야함

    // 폼 양식에서 어떠한 컨트롤의 값이 변경됨
    const ControlChange = (event) => {
        // event 객체는 change 이벤트를 발생시킨 폼 컨트롤
        const { name, value } = event.target;
        console.log(`값이 바뀐 컨트롤: ${name}, 값: ${value}`);

        // 전개 연산자를 사용하여 이전 컨트롤의 값들도 보존하도록 합니다.
        setProduct({ ...product, [name]: value });
    }

    const FileSelect = (event) => {
        // 자바 스크립트는 모든 항목들을 배열로 취급하는 성질이 있음
        const { name, files } = event.target;
        const file = files[0]; // type="file" 로 작성한 1번째 항목

        // FileReader는 웹 브라우저에서 제공해주는 내장 객체로, 파일 읽기에 사용가능
        // 자바 스크립트에서 파일을 읽고 이를 데이터로 처리하는데 사용됨
        const reader = new FileReader();

        // readAsDataURL() 함수는 file 객체를 문자열 형태(Base64 인코딩)로 반환하는 역할을 합니다.
        reader.readAsDataURL(file);

        // onloadend: 읽기 작업이 성공하면 자동으로 동작하는 이벤트 핸들러 함수
        reader.onloadend = () => {
            const result = reader.result;
            console.log(result);

            // 해당 이미지는 Base64 인코딩 문자열 형식으로 state에 저장함
            // 사용 예시 : data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...
            setProduct({ ...product, [name]: result });
        };

        console.log('그림 선택');
    };

    const navigate = useNavigate();

    const SubmitAction = async (event) => {
        event.preventDefault();

        if (product.category === "-") {
            alert('카테고리를 반드시 선택해 주셔야 합니다.')
            return; // 수정 중단
        }

        try {
            // 라우팅 규칙 때문에 ${id}를 제거하면 안됩니다.
            const url = `${API_BASE_URL}/product/update/${id}`
            // 참조 공유: 두 변수가 동일한 곳을 참조함
            const parameters = product;

            // 얕은 복사 : 왼쪽이 오른쪽의 복사본을 가짐             
            // const parameters = {...product};

            // 깊은 복사 : JSON.parse()와 JSON.stringify()를 같이 사용하는 방식

            // Content-Type(Mime Type): 문서의 종류가 어떠한 종류인지 알려주는 항목
            // 예시: 'text/html', 'image/jpeg', 'application/json' 등등
            // 이 문서는 json 형식의 파일
            const config = { headers: { 'Content-Type': 'application/json' } };

            //put() 메소드는 리소르를 수정하고자 할 때 사용하는 메소드
            const response = await axios.put(url, parameters, config)

            console.log(`상품 수정: [${response.data}]`);
            alert('상품 수정되었습니다.');

            // 상품 등록후 입력 컨트롤은 모두 초기화 되어야함
            setProduct(initial_value);

            //등록이 이루어 지고 난 후 상품 목록 페이지로 이동
            navigate('/product/list');

        } catch (error) {
            console.log(error.response?.data); // 서버가 반환한 에러 메시지
            console.log(error.response?.status); // 상태 코드

            console.log(`오류 내용: ${error}`);
            alert('상품 수정에 실패하였습니다.');
        };

    };

    return (
        <Container>
            <h1>{comment}</h1>
            <Form onSubmit={SubmitAction}>
                <Form.Group className="mb-3">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력해 주세요."
                        name="name"
                        value={product.name || ''}
                        onChange={ControlChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>가격</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="가격을 입력해 주세요."
                        name="price"
                        value={product.price || ''}
                        onChange={ControlChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>카테고리</Form.Label>

                    <Form.Select
                        name="category"
                        value={product.category || ''}
                        onChange={ControlChange}
                        required>

                        {/* 자바의 Enum 열거형 타입에서 사용한 대문자를 반드시 사용해야함 */}
                        <option value="-">--카테고리를 선택해 주세요</option>
                        <option value="BREAD">빵</option>
                        <option value="BEVERAGE">음료</option>
                        <option value="CAKE">케이크</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>재고</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="재고를 입력해 주세요."
                        name="stock"
                        value={product.stock || ''}
                        onChange={ControlChange}
                        required
                    />
                </Form.Group>

                {/* 이미지는 type="file"이어야 하고, 이벤트처리 함수를 별개로 만들어야함 */}
                <Form.Group className="mb-3">
                    <Form.Label>이미지</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={FileSelect}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>상품 설명</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="상품 설명을 입력해 주세요."
                        name="description"
                        value={product.description}
                        onChange={ControlChange}
                        required
                    />
                </Form.Group>

                <Button variant='primary' type='submit' size='lg'>
                    {comment}
                </Button>
            </Form>

        </Container>
    );
}

export default App;
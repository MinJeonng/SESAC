'use client';
import { useAccessTokenStore } from '@/commons/stores/22-01-accessToken-store';
import { gql, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const { setAccessToken } = useAccessTokenStore();

  const onClickLogin = async () => {
    const { email, password } = formState;
    //1. login 뮤테이션 날려서 token 받아오기
    const result = await loginUser({
      variables: {
        email: email,
        password: password,
      },
      // 여기선 회원가입이 없으니까 일단 값 일시적으로 넣어주기
      // variables: {
      //   email: '33@naver.com',
      //   password: '1234',
      // },
    });
    console.log(result, '로그인 결과');
    const accessToken = result.data.loginUser.accessToken;

    //2. 받아온 token을 globalState에 저장하기
    if (accessToken === undefined) {
      alert('로그인 실패');
      return;
    }
    setAccessToken(accessToken); // globalState에 token set하기
    console.log(accessToken, 'token 값');

    //3. 성공페이지 이동
    Modal.success({
      title: '성공',
      content: '로그인 성공',
    });
    router.push('/section22/22-01-login-success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      이메일 : <input type="text" name="email " onChange={handleChange} />
      비밀번호 :
      <input type="password" name="password" onChange={handleChange} />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}

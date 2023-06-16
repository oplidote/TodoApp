import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disable, setDisable] = useState(true);
  // 로그인 함수
  const loginMember = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;
      const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
        headers: {
          "Content-Type": "application/json",
        },
        email: id,
        password: pw,
      });
      window.localStorage.setItem("token", res.data.access_token);
      navigate("/todo");
    } catch (err) {
      console.log(err);
    }
  };

  const isValidate = () => {
    const regexId = /@/g; // '@' 포함
    const regexPw = /.{8,}/g; // 8자 이상

    if (regexId.test(id) && regexPw.test(pw)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  useEffect(() => {
    isValidate();
  }, [id, pw]);

  return (
    <div>
      <label htmlFor="id">이메일</label>
      <input
        id="id"
        type="text"
        data-testid="email-input"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        data-testid="password-input"
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
        }}
      />
      <button
        data-testid="signin-button"
        disabled={disable}
        onClick={() => {
          loginMember();
        }}
      >
        로그인
      </button>
    </div>
  );
};

export default Signin;

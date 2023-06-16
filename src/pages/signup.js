import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disable, setDisable] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;

  // 회원 가입
  const postMember = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        email: id,
        password: pw,
      });
      navigate("/signin");
    } catch (err){console.log(err)}
  };

  useEffect(() => {
    // 로그인 여부 검증
    const isLogined = !!window.localStorage.getItem("token");
    if (isLogined) {
      navigate("/todo");
    }
  }, []);

  // 이메일 패스워드 유효성 검사
  const isValidate = () => {
    
    const regexId = /@/g; // '@' 포함
    const regexPw = /.{8,}/g // 8자 이상

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
        data-testid="signup-button"
        disabled={disable}
        onClick={() => {
          postMember();
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;

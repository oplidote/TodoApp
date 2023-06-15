import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disable, setDisable] = useState(true);
  
  const postMember = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;
      const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
        headers: {
          "Content-Type": "application/json",
        },
          email: id,
          password: pw,
      });
      window.localStorage.setItem('token', res.data.access_token);
      navigate("/todo");
    } catch {}
  };

  const isDisabled = () => {
    if (id.includes("@") && pw.length >= 8) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  useEffect(()=> {
    const isLogined = !!window.localStorage.getItem('token');
    if(isLogined) {
      navigate('/todo');
    }
  },[])

  useEffect(() => {
    isDisabled();
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
          postMember();
        }}
      >
        로그인
      </button>
    </div>
  );
};

export default Signin;

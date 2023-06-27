import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMemberApi } from "../lib/customAxios";
import { isValidate } from "./signup";

const Signin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  // 로그인 함수
  const loginMember = async () => {
    try {
      await loginMemberApi(id, pw);
      navigate("/todo");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDisable(isValidate(id, pw));
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
        onClick={loginMember}
      >
        로그인
      </button>
    </div>
  );
};

export default Signin;

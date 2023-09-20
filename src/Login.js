import { useSelector } from "react-redux";
import { LoginForm } from "./LoginForm";

export function Login() {
  return (
    <>
      <div
        className="row outerbackground"
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <div
          className="col-md-4 mt-3"
          style={{
            padding: "30px",
            borderRadius: "20px",
            background: "white",
            marginBottom: "200px",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </>
  );
}

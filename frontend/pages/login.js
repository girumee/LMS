import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";

const login = () => {
  const [email, setEmail] = useState("gize@gmail.com");
  const [password, setPassword] = useState("marve1");
  // const [confirmpassword, setConfirmPassword] = useState("marve");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);

  console.log("STATE", state);

  const handleSubmit = async (e) => {
    //e= Event
    e.preventDefault();
    //console.table({email, password, confirmpassword });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
        // confirmpassword,
      });
      //console.log("LOGIN RESPOSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron top_pages text-center bg-primary square">
        Login
      </h1>
      <div className="container col-md-3 pb-6">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-2 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail address"
            required
          />
          <input
            type="password"
            className="form-control mb-2 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          {/* <input
            type="password"
            className="form-control mb-2 p-2"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            required
          /> */}
          <button
            type="submit"
            className="btn btn-block btn-primary form-control"
            disabled={!email || !password || loading}>
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center p-2">
          Not yet registered?{" "}
          <Link href="/register" legacyBehavior>
            <a className="r-under">Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default login;

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
  const [firstname, setFirstName] = useState("Grm");
  // const [secondname, setSecondName] = useState("ze");
  const [email, setEmail] = useState("gize@gmail.com");
  const [password, setPassword] = useState("marve1");
  // const [confirmpassword, setConfirmPassword] = useState("marve");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    //e= Event
    e.preventDefault();
    //console.table({ firstname, secondname, email, password, confirmpassword });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        firstname,
        // secondname,
        email,
        password,
        // confirmpassword,
      });
      setLoading(false);
      toast.success("Registration Successful. Please Login.");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
    // console.log("REGISTER RESPOSE", data);
  };
  return (
    <>
      <h1 className="jumbotron top_pages text-center bg-primary square">
        Register
      </h1>
      <div className="container col-md-2 pb-6">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2 p-2"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstname"
            required
          />
          {/* <input
            type="text"
            className="form-control mb-2 p-2"
            value={secondname}
            onChange={(e) => setSecondName(e.target.value)}
            placeholder="secondname"
            required
          /> */}
          <input
            type="text"
            className="form-control mb-2 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail address"
            required
          />
          <input
            type="text"
            className="form-control mb-2 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          {/* <input
            type="text"
            className="form-control mb-2 p-2"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            required
          /> */}
          <button
            type="submit"
            className="btn btn-block btn-primary form-control"
            disabled={!firstname || !email || !password || loading}>
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center p-2">
          Already registered?{" "}
          <Link href="/login" legacyBehavior>
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;

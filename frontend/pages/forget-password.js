import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context/index";
import { useRouter } from "next/router";

const Forgetpassword = () => {
  // state
<<<<<<< HEAD
  const [email, setEmail] = useState("tegtarekegn@gmail.com");
  const [success, setSuccess] = useState("");
  const [code, setCode] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
  } = useContext(Context);
=======
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState("")
  const [code, setCode] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false);

  // context
  const { state: { user } } = useContext(Context)
>>>>>>> 38fdc5231341cbb4daebf43a10c45bf8bcc3e768
  //router
  const router = useRouter();

  //redirect is user is logging in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/forget-password`, { email });
      setSuccess(true);
      toast("Check your email for reset the password secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
<<<<<<< HEAD
  };
  return (
    <>
      <h1 className="jumbotron square text-center">Forget Password</h1>
=======
  }
  return (
    <>
      <h1 className="jumbotron square text-center" >
        Forget Password
      </h1>
>>>>>>> 38fdc5231341cbb4daebf43a10c45bf8bcc3e768

      <div className="container col-md-3 pb-6">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-2 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter e-mail address"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary form-control"
            disabled={!email || loading}>
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

<<<<<<< HEAD
export default Forgetpassword;
=======
export default Forgetpassword;
>>>>>>> 38fdc5231341cbb4daebf43a10c45bf8bcc3e768

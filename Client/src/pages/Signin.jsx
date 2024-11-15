import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signFailure, signInStart, signSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
function Signin() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlechange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
 
  const handleSumite = async(e) =>{
    e.preventDefault()
    try {
      dispatch(signInStart())
    const res = await fetch('/api/auth/signin',{
      method : "POST",
      headers : {
        'Content-type': 'application/json'
      },
      body : JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success === false){
      dispatch(signFailure(data.message))
      return
    }

    dispatch(signSuccess(data.rest))
    navigate('/')

    } catch (error) {
     dispatch(signFailure(error.message))

    }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-600">
        Sign in
      </h1>
      <form onSubmit={handleSumite} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handlechange}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handlechange}
          required
        />
        <button disabled={loading} className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading? 'Loading...' : 'Sign in'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Dont haven account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {
        error && <p className="text-red-500">{error}</p>
      }
    </div>
  );
}

export default Signin;
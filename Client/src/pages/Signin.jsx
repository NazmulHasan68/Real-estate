import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
function Signin() {
  const [formData, setFormData] = useState({})
  const [error , setError] = useState(null)
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlechange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
 
  const handleSumite = async(e) =>{
    e.preventDefault()
    try {
      setLoading(true)
    const res = await fetch('/api/auth/signin',{
      method : "POST",
      headers : {
        'Content-type': 'application/json'
      },
      body : JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success === false){
      setError(data.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setError(null)
    navigate('/')

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    setLoading(false)
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
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handlechange}
        />
        <button disabled={Loading} className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {Loading? 'Loading...' : 'Sign in'}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Dont haven account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {
        error && <p>{error}</p>
      }
    </div>
  );
}

export default Signin;
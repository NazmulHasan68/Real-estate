import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from "react-redux";
import { signSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method:"POST",
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify({name : result.user.displayName, email: result.user.email, photo:result.user.photoURL})
      })
      const data = await res.json()
      dispatch(signSuccess(data))
      navigate('/')

    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Sign-in was canceled by the user.");
      } else {
        console.log("Could not sign in with Google:", error);
      }
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="text-center bg-red-500 p-3 rounded-lg hover:bg-opacity-95 cursor-pointer text-white"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;


import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/profile.png";
import { useRef, useState, useEffect } from "react";
import { signFailure, signInStart, signSuccess } from "../redux/user/userSlice";

function Profile() {
  const fileRef = useRef(null);
  const {loading, currentUser ,error} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(currentUser?.avatar || profile);

  useEffect(() => {
    setFormData({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
      image: null,
    });
    setPreviewImage(currentUser?.avatar || profile);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cloudinary upload logic
    let imageUrl = currentUser?.avatar;
    if (formData.image) {
      const data = new FormData();
      data.append("file", formData.image);
      data.append("upload_preset", "realestate"); // Replace with your Cloudinary preset
 
      try {
        dispatch(signInStart())
        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dpn0fjl8h/image/upload", // Replace with your Cloudinary URL
          {
            method: "POST",
            body: data,
          }
        );
        console.log(data);
        
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.secure_url;
        console.log("Image uploaded to Cloudinary:", imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    // Backend profile update
    const updateData = {
      username: formData.username,
      email: formData.email,
      avatar: imageUrl,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      
      const response = await fetch("/api/auth/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      dispatch(signSuccess(result.user));
    } catch (error) {
      dispatch(signFailure(error.message))
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center flex-col sm:flex-row sm:mt-4">
      <div className="flex-1 w-[90%] sm:w-full">
        <img
          src={profile}
          alt="profile"
          className="mix-blend-multiply w-[90%] sm:w-[100%]"
        />
      </div>

      <div className="px-4 flex-1 w-full">
        <h1 className="text-3xl font-semibold text-center my-2 sm:my-4">
          Profile
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input type="file" ref={fileRef} hidden name="image" onChange={handleChange} />
          <img
            onClick={() => fileRef.current.click()}
            src={previewImage}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover self-center my-2 cursor-pointer"
          />
          <div>
            {
              error && <div className="text-red-500 text-xs">{error}</div>
            }
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.password}
          />
          <button disabled={loading} className="bg-slate-800 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
            {loading? 'Loading...' : 'Update'}
          </button>
        </form>
        <div className="flex justify-between mt-4 p-1">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import {useSelector} from 'react-redux'
import profile from '../assets/profile.png'
function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='max-w-6xl mx-auto flex justify-between items-center flex-col sm:flex-row sm:mt-4'>
      <div className='flex-1'>
        <img src={profile} alt='profile ' className=' mix-blend-multiply w-[90%] sm:w-[100%]'/>
      </div>
      <div className='px-4  flex-1 w-full'>
        <h1 className="text-3xl font-semibold text-center my-2 sm:my-4">Profile</h1>
        <form className='flex flex-col gap-3 sm:gap-4'>
          <img src={currentUser.avatar} alt="profile image" className='rounded-full h-24 w-24 object-cover self-center my-2 cursor-pointer'/>
          <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg'/>
          <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg'/>
          <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'/>
          <button className='bg-slate-800 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>Update</button>
        </form>
        <div className='flex justify-between mt-4 p-1'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default Profile

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';

import { IoLocationSharp } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";



export default function Listing() {
    SwiperCore.use({Navigation})
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    useEffect(()=>{
        const fetchlisting = async() =>{
           try {
            setloading(true)
            const res = await fetch(`/api/listing/getlisting/${params.listingId}`)
            const data = await res.json()

            if(data.success === false){
                seterror(true)
                setloading(true)
                return
            }
            setloading(false)
            setListing(data)
            seterror(false)

           } catch (error) {
            seterror(true)
            setloading(false)
           }
        }
        fetchlisting()
    },[params.listingId])
    console.log(listing);
    
  return (
    <main className=" mx-auto">
        {loading && <p className="text-center py-7 text-2xl">Loading...</p>}
        {error && <p className="text-center py-7 text-2xl">Something went to wrong</p>}
        {listing && !loading && !error && (
        <>
          <Swiper 
            modules={[Navigation]} // Add necessary modules
            slidesPerView={1} // Show one slide at a time
            spaceBetween={10} // Space between slides
            loop={true} // Optional: Loop slides
          >
            <div>
              {listing.imageUrls.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="sm:h-[550px] h-[280px] w-full"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: 'cover', 
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          <div className="mx-auto max-w-4xl px-4">
              <div className="flex items-center gap-4  pt-5">
                <h1 className="text-2xl font-semibold text-slate-700">{listing.name}</h1>
                <h1 className="text-2xl font-semibold text-slate-700">${listing.regularPrice} USD</h1>
                {listing.discountPrice > 0 && <h1 className="text-2xl font-bold text-green-700"> {listing.discountPrice}% off</h1>}
              </div>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex items-center gap-3 py-4">
                    <IoLocationSharp className="text-green-800"/>
                    <p className="text-slate-800">new living</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-red-700 p-1 rounded-lg w-32 text-center text-white font-medium">
                        {listing.type==="rent"? "For Rent" : "For Sale"}
                    </div>
                    <div className="bg-green-700 p-1 rounded-lg w-32 text-center text-white font-medium">
                        {listing.discountPrice? listing.discountPrice : '1.5'}%
                    </div>
                </div>
              </div>
              <div className="py-5 p-2">
                <span className="text-gray-800 font-semibold">Description :</span> <p className="text-slate-700">{listing.description}</p> 
              </div>
              <div className="flex gap-2 items-center px-4">
                <span className="text-gray-800 font-semibold">Address :</span> <p className="text-slate-700">{listing.address}</p> 
              </div>
              <div className="py-4 flex gap-6 sm:gap-8 items-center flex-wrap mx-auto">
                <div className="flex gap-2 items-center text-sm sm:text-lg cursor-pointer px-4 font-semibold text-green-800">
                    <FaBed className="sm:text-xl text-sm "/>
                    <p>{listing.badrooms}</p>
                    <p className="">Beds</p>
                </div>
                <div className="flex gap-2 items-center text-sm sm:text-lg cursor-pointer px-4 font-semibold text-green-800">
                    <FaBath className="sm:text-xl text-sm "/>
                    <p>{listing.bathrooms}</p>
                    <p className="">Bath Rooms</p>
                </div>
                <div className="flex gap-2 items-center text-sm sm:text-lg cursor-pointer px-4 font-semibold text-green-800">
                    <FaParking className="sm:text-xl text-sm "/>
                    <p>{listing.parking ? "Yes, Parking" : "No, Parking"}</p>
                </div>
                <div className="flex gap-2 items-center text-sm sm:text-lg cursor-pointer px-4 font-semibold text-green-800">
                    <FaChair className="sm:text-xl text-sm "/>
                    <p>{listing.furnished ? "Furnished" : "Not Furnished"}</p>
                </div>
              </div>
              
          </div>
        </>
      )}
    </main>
  )
}

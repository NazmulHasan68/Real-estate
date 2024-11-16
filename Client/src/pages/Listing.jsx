import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';



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
        </>
      )}
    </main>
  )
}

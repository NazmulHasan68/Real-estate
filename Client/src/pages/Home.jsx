import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

function Home() {
  const [offerlisting, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/getsearch?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
      } catch (error) {
        console.error("Error fetching offer listings:", error.message);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/getsearch?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.error("Error fetching rent listings:", error.message);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/getsearch?type=sale&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.error("Error fetching sale listings:", error.message);
      }
    };

    // Fetch all listings
    Promise.all([fetchOfferListing(), fetchRentListing(), fetchSaleListing()])
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="">
      <section className="max-w-6xl mx-auto py-24 sm:py-32 px-4 sm:px-0">
        {/* Top Section */}
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
          Find your Next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm py-5">
          Shadow Estate is the best place to find your next perfect place to live
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs sm:text-sm text-sky-800 font-bold hover:underline"
          to={"/search"}
        >
          Let&apos;s get started
        </Link>
      </section>

      {/* Swiper Section */}
      <div>
        {offerlisting.length > 0 && (
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
          >
            {offerlisting.map((listing, index) =>
              listing.imageUrls.map((image, imgIndex) => (
                <SwiperSlide key={`${index}-${imgIndex}`}>
                  <div
                    className="sm:h-[350px] h-[180px] w-full"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        )}
      </div>


        {/* Listing Results */}
        <div className="py-10 max-w-6xl mx-auto px-4 sm:px-0">
        <h2 className="text-2xl font-semibold py-6 text-slate-700">Listings for Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offerlisting.map((item, index) => (
            <Link to={`/listing/${item._id}`} key={index} className="border rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="w-full h-[150px] overflow-hidden">
                <img src={item.imageUrls[3]} className="w-full h-full object-cover hover:scale-110 transition-all duration-300"/>
            </div>
            <div className="p-2 flex flex-col gap-2">
              <h1 className="line-clamp-1 text-slate-700 font-semibold ">{item.name}</h1>
              <div className="text-xs font-normal text-slate-800 flex gap-2 items-center">
                <FaMapMarkerAlt className="text-green-800"/>
                <p className="line-clamp-1">{item.address}</p>
              </div>
              <p className="line-clamp-2 text-slate-700 text-sm ">{item.description}</p>
              <div className="flex justify-between items-center ">
                {item.type=="rent"? <p className="text-sm font-semibold text-slate-800">${item.regularPrice}/month</p>: <p className="text-sm font-semibold text-slate-800">${item.regularPrice}</p> }
                {item.discountPrice ? <p className="text-sm font-semibold text-green-800">{item.discountPrice}%</p>: null}
              </div>
              <div className="flex gap-6 text-green-700 text-xs">
                <div className="flex gap-2">
                  <p>{item.badrooms}</p>
                  <p>Beds</p>
                </div>
                <div className="flex gap-2">
                  <p>{item.bathrooms}</p>
                  <p>Baths</p>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>

      {/* Listing Results */}
      <div className="py-5 max-w-6xl mx-auto px-4 sm:px-0">
        <h2 className="text-2xl font-semibold py-6 text-slate-700">Listings for Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {saleListing.map((item, index) => (
            <Link to={`/listing/${item._id}`} key={index} className="border rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="w-full h-[150px] overflow-hidden">
                <img src={item.imageUrls[3]} className="w-full h-full object-cover hover:scale-110 transition-all duration-300"/>
            </div>
            <div className="p-2 flex flex-col gap-2">
              <h1 className="line-clamp-1 text-slate-700 font-semibold ">{item.name}</h1>
              <div className="text-xs font-normal text-slate-800 flex gap-2 items-center">
                <FaMapMarkerAlt className="text-green-800"/>
                <p className="line-clamp-1">{item.address}</p>
              </div>
              <p className="line-clamp-2 text-slate-700 text-sm ">{item.description}</p>
              <div className="flex justify-between items-center ">
                {item.type=="rent"? <p className="text-sm font-semibold text-slate-800">${item.regularPrice}/month</p>: <p className="text-sm font-semibold text-slate-800">${item.regularPrice}</p> }
                {item.discountPrice ? <p className="text-sm font-semibold text-green-800">{item.discountPrice}%</p>: null}
              </div>
              <div className="flex gap-6 text-green-700 text-xs">
                <div className="flex gap-2">
                  <p>{item.badrooms}</p>
                  <p>Beds</p>
                </div>
                <div className="flex gap-2">
                  <p>{item.bathrooms}</p>
                  <p>Baths</p>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>

        <h2 className="text-2xl font-semibold py-6 text-slate-700 px-4 sm:px-0">Listings for Rent</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-0">
          {rentListing.map((item, index) => (
           <Link to={`/listing/${item._id}`} key={index} className="border rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
           <div className="w-full h-[150px] overflow-hidden">
               <img src={item.imageUrls[3]} className="w-full h-full object-cover hover:scale-110 transition-all duration-300"/>
           </div>
           <div className="p-2 flex flex-col gap-2">
             <h1 className="line-clamp-1 text-slate-700 font-semibold ">{item.name}</h1>
             <div className="text-xs font-normal text-slate-800 flex gap-2 items-center">
               <FaMapMarkerAlt className="text-green-800"/>
               <p className="line-clamp-1">{item.address}</p>
             </div>
             <p className="line-clamp-2 text-slate-700 text-sm ">{item.description}</p>
             <div className="flex justify-between items-center ">
               {item.type=="rent"? <p className="text-sm font-semibold text-slate-800">${item.regularPrice}/month</p>: <p className="text-sm font-semibold text-slate-800">${item.regularPrice}</p> }
               {item.discountPrice ? <p className="text-sm font-semibold text-green-800">{item.discountPrice}%</p>: null}
             </div>
             <div className="flex gap-6 text-green-700 text-xs">
               <div className="flex gap-2">
                 <p>{item.badrooms}</p>
                 <p>Beds</p>
               </div>
               <div className="flex gap-2">
                 <p>{item.bathrooms}</p>
                 <p>Baths</p>
               </div>
             </div>
           </div>
         </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;


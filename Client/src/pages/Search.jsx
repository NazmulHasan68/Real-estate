import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, name, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => ({ ...prev, [id]: checked }));
    } else if (name === "type") {
      setFilters((prev) => ({ ...prev, type: id }));
    } else if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setFilters((prev) => ({ ...prev, sort, order }));
    } else {
      setFilters((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Fetch listings on component mount or filter changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const updatedFilters = {
      searchTerm: urlParams.get("searchTerm") || "",
      type: urlParams.get("type") || "all",
      parking: urlParams.get("parking") === "true",
      furnished: urlParams.get("furnished") === "true",
      offer: urlParams.get("offer") === "true",
      sort: urlParams.get("sort") || "createdAt",
      order: urlParams.get("order") || "desc",
    };

    setFilters(updatedFilters);

    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listing/getsearch?${urlParams.toString()}`);
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
  
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      }
    });
  
    navigate(`/search?${urlParams.toString()}`);
  };
  
  

  return (
    <main className="flex flex-col md:flex-row max-w-7xl mx-auto">
      {/* Sidebar */}
      <div className="p-5 border-b-2 md:border-r-2 border-gray-400 md:min-h-screen basis-1/5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Search Term */}
          <div className="flex flex-col  gap-2">
            <label htmlFor="searchTerm" className="font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              value={filters.searchTerm}
              onChange={handleChange}
              placeholder="Search..."
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* Type */}
          <div className="flex flex-row md:flex-col  gap-4">
            <label className="font-semibold">Type:</label>
            {["all", "rent", "sale"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={type}
                  name="type"
                  checked={filters.type === type}
                  onChange={handleChange}
                  className="w-4"
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </label>
            ))}
          </div>

          {/* Offer and Amenities */}
          <div className="flex flex-row md:flex-col gap-4">
            <label className="font-semibold">Amenities:</label>
            {["offer", "parking", "furnished"].map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={amenity}
                  checked={filters[amenity]}
                  onChange={handleChange}
                  className="w-4"
                />
                <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
              </label>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-4 items-center">
            <label htmlFor="sort_order" className="font-semibold ">
              Sort By:
            </label>
            <select
              id="sort_order"
              value={`${filters.sort}_${filters.order}`}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option value="regulaterPrice_desc">Price High to Low</option>
              <option value="regulaterPrice_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95"
          >
            Search
          </button>
        </form>
      </div>

      {/* Listing Results */}
      <div className="p-7 w-full basis-4/5">
        <h1 className="text-3xl font-semibold border-b border-gray-300 text-slate-700 p-2">
          Listing Results:
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : listing.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {listing.map((item) => (
              <Link to={`/listing/${item._id}`} key={item.id} className="border rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
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
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </main>
  );
}

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-5 text-slate-700">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
            />
          </div>

          <div className="flex gap-6 flex-wrap mt-5">
            <div className="flex gap-2 items-center ">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input type="checkbox" id="frunished" className="w-5" />
              <span>Frunished</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap mt-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <div className="">
                <p>Regular price </p>
                <span>($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <div className="">
                <p>Discountded price </p>
                <span>($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-semibold text-slate-700 ">Images : <span className="font-normal text-slate-600 ml--2">The first image will be cover (max-6)</span> </p>
          <div className="flex gap-2">
            <input type="file" id="images" accept="image/*" multiple className="p-3 border cursor-pointer border-sky-300  rounded w-full"/>
            <button className="py-3 px-5 text-sky-700 border border-sky-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button className="p-3 bg-sky-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
        </div>
      </form>
    </main>
  );
}

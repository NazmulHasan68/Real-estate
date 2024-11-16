
export default function Search() {
  return (
    <main className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 border-gray-400 md:min-h-screen">
            <form className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label className="font-semibold whitespace-nowrap">Search Term</label>
                    <input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-3 w-full"/>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className="font-semibold">Type : </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id='all' className="w-4"/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='rent' className="w-4"/>
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sele' className="w-4"/>
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='offer' className="w-4"/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className="font-semibold">Amenities : </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id='parking' className="w-4"/>
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='furnished' className="w-4"/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <label className="font-semibold">Sorts</label>
                    <select id="sort_order" className="border rounded-lg p-2">
                        <option>Price High to Low</option>
                        <option>Low High to Price</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className="bg-slate-800 p-3 rounded-lg uppercase hover:opacity-95 text-white">Search</button>
            </form>
        </div>
        <div className="p-7">
            <h1 className="text-3xl font-semibold border-b  border-gray-400 text-slate-700 p-2">Listing result : </h1>
        </div>
    </main>
  )
}

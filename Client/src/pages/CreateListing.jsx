import { useState } from "react";

export default function CreateListing() {
  const [Files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageloading ,setimageloading] = useState(false)
  
  const [FormDatas, setFormDatas] = useState({
    imageUrls : [] ,

  })


 const handleUpload = async () => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dpn0fjl8h/image/upload`; 
  const uploadPreset = 'realestate'; 

  try {
      // Loop over each file and upload sequentially
      setimageloading(true)
      const imageUrls = [];
      for (let i = 0; i < Files.length; i++) {
        const formData = new FormData();
        formData.append("file", Files[i]);
        formData.append("upload_preset", uploadPreset); // Attach preset
        formData.append("folder", "realestate/listing"); // Specify folder

        // Upload each file individually
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          imageUrls.push(data.secure_url); // Store the uploaded URL
          console.log("Uploaded Image URL:", data.secure_url);
        } else {
          console.error("Error uploading image:", data);
        }
      }

      setUploadedImages(imageUrls);
      setFormDatas((prevFormData) => ({
        ...prevFormData,
        imageUrls: imageUrls,
      }));

      setUploadStatus("Images uploaded successfully");
      setimageloading(false)
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadStatus("Error occurred during image upload");
    }
  };


  const submiteData = (e) =>{
    e.preventDefault()
    uploadedImages
  }
  
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-3 text-slate-700">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6" onSubmit={submiteData}>
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
          <p className="font-semibold text-slate-700 ">
            Images :{" "}
            <span className="font-normal text-slate-600 ml--2">
              The first image will be cover (max-6)
            </span>{" "}
          </p>
          <div className="flex gap-1 flex-col">
            <div className="flex gap-2">
              <input
                type="file"
                id="images"
                accept="image/*"
                onChange={(e)=>setFiles(e.target.files)}
                multiple
                className="p-3 border cursor-pointer border-sky-300  rounded w-full"
              />
              <button onClick={handleUpload} className="py-3 px-5 text-sm text-sky-700 border border-sky-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                {imageloading && imageloading? "Loading...":"Upload"}
              </button>
            </div>
            {uploadStatus && <p className="mt-2 ">{uploadStatus}</p>}
          </div>
          <div className="">
            {uploadedImages.length > 0 && (<>
              <h3 className="font-normal">Uploaded Images:</h3>
              <div className="flex gap-4 flex-wrap mt-2 h-[280px] overflow-scroll no-scrollbar p-2">
                {uploadedImages.map((url, index) => (
                  <div className="w-full h-[80px] overflow-hidden border-b-2  border-sky-700 p-2 flex justify-between items-center"  key={index}>
                      <img src={url} alt={`Uploaded ${index}`} className="w-[80px] h-full object-cover cursor-pointer hover:scale-150 duration-300 transition-all"/>
                      <button className="text-red-500 hover:underline cursor-pointer">Delete</button>
                  </div>
                    ))}
              </div>
            </>
            )}
          </div>
          <button className="p-3 bg-sky-700  text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
          
        </div>
      </form>
    </main>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value); // Update message state on input change
  };

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log("Error fetching landlord:", error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  console.log(landlord);

  return (
    <>
      {landlord && (
        <div className="flex gap-2 px-4 flex-col">
          <div className="flex gap-2">
            <p>Contact</p>
            <span className="font-semibold">{landlord.username}</span> for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </div>
          <textarea
            name="message"
            id="message"
            rows={2}
            className="w-full border p-3 rounded-lg mt-2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=${encodeURIComponent(
              `Regarding ${listing.name}`
            )}&body=${encodeURIComponent(message)}`}
            className="bg-slate-800 text-white text-center mt-2 p-3 rounded-lg uppercase hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

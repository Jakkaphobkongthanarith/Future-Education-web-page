import { useState, useEffect } from "react";
import axios from "axios";
import linkImage from "../Image/link.jpg";

function HomePage() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState(" ");

  useEffect(() => {
    getLocation();
  }, [search]);

  const getLocation = async () => {
    try {
      const fetchLocation = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      setLocations(fetchLocation.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSearchBar = (tag) => {
    setSearch(tag.target.value);
  };

  const handleTag = (tag) => {
    if (!search.includes(tag)) {
      const newValue = !search ? tag : `${search} ${tag}`;
      setSearch(newValue);
    }
  };
  return (
    <div className="p-0 m-0 font-crayon w-full h-full ">
      <div className="flex flex-col w-full items-center">
        <div className="w-[80%]">
          <h1 className="text-[#29b6f6] text-5xl mb-5 text-center">
            เที่ยวไหนดี
          </h1>
          <div className="flex flex-col justify-end w-full">
            <p className="text-lg">ค้นหาที่เที่ยว</p>
            <input
              placeholder="หาที่เที่ยวแล้วไปกัน..."
              value={search}
              onChange={handleSearchBar}
              className="border-white text-center font-kanit h-16 text-xl outline-none"
            />
            <hr className="my-2 border-gray-300" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-12 max-xl:gap-4 w-[80%]">
          {locations.map((location, index) => (
            <div
              className="flex justify-between py-5 rounded-xl relative max-xl:flex-col max-xl:items-center w-[80%]"
              key={index}
            >
              <img
                className="w-1/3 max-xl:w-[365px] h-1/3 max-xl:pb-8 rounded-lg xl:pr-1"
                src={location.photos[0]}
                alt={location.title}
              />
              <div className="font-bold xl:pl-1 xl:w-[60%] ">
                <h1 className="text-black text-xl w-[80%]">{location.title}</h1>
                <h2 className="pb-1 text-lg xl:w-full">
                  {location.description.slice(0, 100)} ...
                </h2>
                <a
                  href={location.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#26c6da] pb-6 block w-[100%]"
                >
                  อ่านต่อ
                </a>
                <p className="pb-2">
                  หมวด{" "}
                  {location.tags.slice(0, -1).map((tag, index) => (
                    <a
                      key={index}
                      onClick={() => handleTag(tag)}
                      className="cursor-pointer underline mr-2"
                    >
                      {tag}
                    </a>
                  ))}
                  และ{" "}
                  <a
                    onClick={() =>
                      handleTag(location.tags[location.tags.length - 1])
                    }
                    className="cursor-pointer underline"
                  >
                    {location.tags[location.tags.length - 1]}
                  </a>
                </p>
                <div className="w-full flex gap-2 flex-wrap rounded-lg justify-between max-md:justify-evenly">
                  <div className="flex gap-2 flex-wrap max-md:w-[300px]">
                    {location.photos.slice(1).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        className="w-24 h-24 rounded-lg max-md:w-[80px] max-md:h-[80px]"
                        alt={`Preview ${index}`}
                      />
                    ))}
                  </div>
                  <a
                    href={location.url}
                    className="flex justify-center items-center  max-md:hidden"
                    onClick={(event) => {
                      event.preventDefault();
                      navigator.clipboard.writeText(location.url);
                    }}
                  >
                    <img
                      className="w-20 h-24 ml-auto mt-2 max-md:hidden"
                      src={linkImage}
                      alt="Link"
                    />
                  </a>
                </div>
                <hr className="mt-4 border-gray-300 xl:hidden" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

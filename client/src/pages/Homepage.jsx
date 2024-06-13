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
    <div className="container">
      <div className="header">
        <h1 className="title">เที่ยวไหนดี</h1>
        <div className="findTogether">
          <p>ค้นหาที่เที่ยว</p>
          <input
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            value={search}
            onChange={handleSearchBar}
            className="product-text-input"
          ></input>
          <hr />
        </div>
      </div>
      <div className="product-list">
        {locations.map((location, index) => {
          return (
            <div className="product" key={index}>
              <img className="preview" src={location.photos[0]}></img>
              <div className="detail-container">
                <h1 className="location-title pb1">{location.title}</h1>
                <h2 className="description pb1">
                  {location.description.slice(0, 100)} ...
                </h2>
                <a href={location.url} target="_blank" className="readMore">
                  อ่านต่อ
                </a>
                <p className="mt1 pb1">
                  หมวด{" "}
                  {location.tags.slice(0, -1).map((tag, index) => {
                    return (
                      <a
                        key={index}
                        onClick={() => handleTag(tag)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          marginRight: "5px",
                        }}
                      >
                        {tag}{" "}
                      </a>
                    );
                  })}
                  และ{" "}
                  <a
                    onClick={() =>
                      handleTag(location.tags[location.tags.length - 1])
                    }
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {location.tags[location.tags.length - 1]}
                  </a>
                </p>
                <div>
                  <div className="miniPreviewAndLink">
                    {location.photos.slice(1).map((photo, index) => (
                      <img key={index} src={photo} className="miniPreview" />
                    ))}
                    <a
                      href={location.url}
                      className="linkImg"
                      onClick={(event) => {
                        event.preventDefault();
                        navigator.clipboard.writeText(location.url);
                      }}
                    >
                      <img src={linkImage}></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

import logo from "./logo.svg";
import "./App.css";
import { createClient } from "pexels";
import { useEffect, useState } from "react";
import Photo from "./Photo";

function App() {
  const [photo, setphoto] = useState([]);
  const [input, setinput] = useState("");
  const [pagenr, setpagenr] = useState(1);
  const [curated, setcurated] = useState(false);

  // Adjust the environment variable name
  const client = createClient(process.env.React_App_Key);

  useEffect(() => {
    const fetchCuratedPhotos = async () => {
      try {
        const result = await client.photos.curated({
          per_page: 20,
          page: pagenr,
        });
        setphoto(result.photos);
      } catch (error) {
        console.error("Error fetching curated photos:", error);
      }
    };

    fetchCuratedPhotos();
  }, [pagenr]);

  const searchbyvalue = async () => {
    setpagenr(1);
    setcurated(true);
    const query = input;
    const result = await client.photos.search({
      query,
      per_page: 20,
      page: pagenr,
    });
    setphoto(result.photos);
  };

  const increasepagenr = () => {
    setpagenr((state) => state + 1);
    searchbybuttons();
  };
  const deccreasepagenr = () => {
    setpagenr((state) => state - 1);
    searchbybuttons();
  };

  const searchbybuttons = async () => {
    const fetchCuratedPhotos = async () => {
      try {
        const result = await client.photos.curated({
          per_page: 20,
          page: pagenr,
        });
        setphoto(result.photos);
      } catch (error) {
        console.error("Error fetching curated photos:", error);
      }
    };
  };

  return (
    <div>
      <header>
        <input
          value={input}
          type="text"
          placeholder="Search a Photo..."
          onChange={(e) => setinput(e.target.value)}
        />
        <button disabled={!input} onClick={searchbyvalue}>
          Search
        </button>
      </header>
      <div className="photobody" id="photobody">
        <div className="right" onClick={increasepagenr}>
          {">"}
        </div>
        <div className="left" onClick={deccreasepagenr}>
          {"<"}
        </div>
        {photo?.map((item) => (
          <Photo
            key={item.id}
            src={item.src.landscape}
            photographer={item.photographer}
          />
        ))}
        <a href="#photobody"></a>
      </div>
    </div>
  );
}

export default App;

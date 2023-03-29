import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";           


export default function App() {
    const [query, setQuery] =useState("");

    const [loading , setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [photos, setPhotos] = useState([]);
    const getPhotos = async (type) => {
        let url = 'https://api.pexels.com/v1/search?query=people';
        if (data?.next_page ) {
            url = data.next_page;
        }

        if (data.prev_page) {
            url = data.prev_page;
        }
        setLoading(true);
        await fetch(url , {
            headers: {
                Authorization: "hcGjREpZlTsspnSwg0P4oGM8xVLMQ9JXeKAeBIYCwjnHNtQWLurLr2hG",
            },
        })
        .then((resp) =>{
            console.log(resp);
            return resp.json();
        })
        .then((res) => {
            setLoading (false);
            setData(res);
            console.log(res);

            setPhotos([...photos,...res.photos]);


        });
    };

const containerStyle = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
        "width": "100%",
    "flex-flow": "wrap"
}

const boxStyle = {
    "width": "50%",
    "display": "flex"
    
}

const imageStyle = {
   "object-fit": "contain",
    "width": "500px",
    "height": "500px",
    "padding":"10px" 
}

    useEffect(() => {
        getPhotos();
    }, []);

    const onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            getPhotos();
        }
    };
    return (
        <div>
        <input
        className="inputSearch"
        oneKeyDown={onKeyDownHandler}
        
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        />
        { loading && <h1>Fetching...</h1> }
        < div className="container" style={containerStyle}>
            {photos?.map((item, index) => {
                return (
                    <div className="box" style={boxStyle} key ={index}>
                        <img src={item.src
                            .medium} alt= {item.id} style={imageStyle} />
                        </div>
                 );
            })}
        </div>,

        <div>
            <button disabled={data?.page } onClick={() =>getPhotos("back")}>
                Prev
            </button>
            <button onClick={() => getPhotos("next")}>NEXT</button>
        </div>
</div>
);
    }

   
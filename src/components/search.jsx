import React, { useState, useEffect } from "react";

function Search() {
  const axios = require("axios");
  let isPresent = {};
  let catArr = {};
  let keys = [];

  const [category, setCategory] = useState();
  const [search, setSearch] = useState("");
  const [catArray, setCatArray] = useState([]);
  const [displayDes, setDisplayDes] = useState();

  useEffect(function () {
    axios.get("https://api.publicapis.org/entries").then((res) => {

      for (let i = 0; i < res.data.entries.length; i++) {
        isPresent[res.data.entries[i].Category] = {};
      }

      keys = Object.keys(isPresent);
      setCategory(keys);

      for (let i = 0; i < keys.length; i++) {
        catArr[keys[i]] = [];
        let temp = [];

        for (let j = 0; j < res.data.entries.length; j++) {
          if (res.data.entries[j].Category == keys[i]) {
            temp.push(res.data.entries[j]);
          }
        }

        catArr[keys[i]] = temp;
      }

      setCatArray(catArr);
    })
  })
  
  function handleSearch (src) {
    if(category.includes(src) == true){
      console.log("from handle")
      for(let i=0; i<category.length; i++){
        if(category[i] == src){
          setDisplayDes(catArray[src])
        }
      }
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search"
          className=" m-4 w-2/5 border border-gray-400 rounded text-center p-1 m-2"
        />
      </div>


      {displayDes == undefined ? ( 
        <div className="text-center text-xl font-bold ">
        Category
        {
          category != undefined &&
          category.map((cat) => (
            <div onClick={(e)=>{
              setSearch(cat);
              handleSearch(cat);
            }}
            className="text-center p-3 bg-stone-300 m-2 cursor-pointer bg-red-200">
          {cat}
          </div>
          ))
        }
        </div>
      ) : (
        <div>
          <div className="text-center text-xl font-bold" > Showing Results </div>
          {
            displayDes.map((obj)=>(
              <div className="text-center p-3 bg-stone-300 m-2 cursor-pointer" >
                {obj.Description}
              </div>
            ))
          }
        </div>  
      )}
    </div>
  );
}

export default Search;

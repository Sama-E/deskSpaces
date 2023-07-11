import moment from "moment";
import "/src/assets/css/pages/blog/blogPostNew.scss";
import axios from "axios";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";


const Categories = [
  {
    id: 1,
    name: "technology",
    title:"Technology",
  },
  {
    id: 2,
    name: "algorithms",
    title:"Algorithms",
  },
  {
    id: 3,
    name: "real_estate",
    title:"Real Estate",
  },
  {
    id: 4,
    name: "food",
    title:"Food",
  },
  {
    id: 5,
    name: "economics",
    title:"Economics",
  },
  {
    id: 6,
    name: "blockchain",
    title:"BlockChain",
  },
  {
    id: 6,
    name: "science",
    title:"Science",
  },
]

const BlogPostNew = () => {
  //Edit blogpost state
  const state = useLocation().state

  //Condition for edit blogpost
  const [value, setValue] = useState(state?.body || "");
  const [title, setTitle] = useState(state?.title ||"");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat ||"");

  console.log(cat)

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("http://localhost:8802/api/upload", formData)
      return res.data;
    } catch (err) {
      console.log(err)

    }
  }

const handlePublish = async (e) => {
  e.preventDefault();
  const imgUrl = upload();

  try {
    state 
      ? await axios.put(`http://localhost:8802/api/blogposts/${state.id}`, {
        title,
        body: value,
        cat,
        img: file ? imgUrl : "",
      })
      : await axios.post(`http://localhost:8802/api/blogposts/new`, {
        title,
        body: value,
        cat,
        img: file ? imgUrl : "",
      })
  } catch (err) {
    console.log(err)
  }
}


  return (
    <div className="blogPostNew">
      <div className="content">
        <input 
          value={title}
          type="text" 
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill 
            className="editor" 
            theme="snow" 
            value={value}
            onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <p>
            <b>Status: </b> Draft
          </p>
          <p>
            <b>Visibility: </b> Public
          </p>
          <input 
            style={{ display:"none" }} 
            type="file" 
            id="file" 
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {Categories.map(category => (
            <div className="cat">
              <input 
                key={category.id} 
                type="radio"
                checked={cat === category.name}
                name="cat" 
                value={category.name} 
                id={category.name}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category.name}>{category.title}</label>
            </div>
          ))}
        </div>
        <div className="item">
          <h1>Tags</h1>
          <input type="text" id="tag" name="tag"/>
          <button className="tagButton">Add Tag</button>
        </div>
      </div>
    </div>
  )
}

export default BlogPostNew;
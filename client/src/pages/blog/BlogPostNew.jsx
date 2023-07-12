import moment from "moment";
import "/src/assets/css/pages/blog/blogPostNew.scss";
import axios from "axios";
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { makeRequestBlog } from "/services/axios";
import { useMutation } from "@tanstack/react-query";


const Categories = [
  {
    id: 1,
    name: "technology",
    title:"Technology",
  },
  {
    id: 2,
    name: "news",
    title:"News",
  },
  {
    id: 3,
    name: "business",
    title:"Business",
  },
  {
    id: 4,
    name: "food",
    title:"Food",
  },
  {
    id: 5,
    name: "science",
    title:"Science",
  },
]

const BlogPostNew = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  //Edit blogpost state
  const state = useLocation().state

  //Condition for edit blogpost
  const [value, setValue] = useState(state?.body || "");
  const [title, setTitle] = useState(state?.title ||"");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat ||"");
  const [tag, setTag] = useState(state?.tag ||"");

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequestBlog.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

//New BlogPost Mutation

//Mutation updates new blogposts
const mutationNew = useMutation({
  mutationFn:
    (newBlogPost) =>{
      return makeRequestBlog.post("/blogposts/new", newBlogPost);
    },
  onSuccess: () => {
    navigate("/blog");
  },
});

//Update BlogPost Mutation

//Mutation updates blogposts
const mutationUpdate = useMutation({
  mutationFn:
    (updateBlogPost) =>{
      return makeRequestBlog.put(`/blogposts/${state.id}`, updateBlogPost);
    },
  onSuccess: () => {
    navigate("/blog");
  },
});

const handlePublish = async (e) => {
  e.preventDefault();
  let imgUrl ="";

  imgUrl = await upload(file);

  try {
    state 
      ? mutationUpdate.mutate({
        title,
        body: value,
        cat,
        tag,
        img: file ? imgUrl : "",
      })
      : mutationNew.mutate({
        title,
        body: value,
        cat,
        tag,
        img: imgUrl,
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
                checked={cat === category.title}
                name="cat" 
                value={category.title} 
                id={category.title}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category.name}>{category.title}</label>
            </div>
          ))}
        </div>
        <div className="item">
          <h1>Tags</h1>
          <input 
            type="text" 
            id="tag" 
            value={tag} 
            name="tag"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default BlogPostNew;
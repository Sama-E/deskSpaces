import "/src/assets/css/pages/blog/blogPostNew.scss";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
]

const BlogPostNew = () => {
  const [value, setValue] = useState('');

console.log(value)


  return (
    <div className="blogPostNew">
      <div className="content">
        <input type="text" placeholder="Title" />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display:"none" }} type="file" id="file" name=""/>
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {Categories.map(category => (
            <div className="cat">
              <input key={category.id} type="radio" name="cat" value={category.name} id={category.name} />
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
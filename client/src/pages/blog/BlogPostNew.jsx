import "/src/assets/css/pages/blog/blogPostNew.scss";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogPostNew = () => {
  const [value, setValue] = useState('');

console.log(value)


  return (
    <div className="blogPostNew">
      <div className="content">
        <input type="text" placeholder="Title" />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">i1</div>
        <div className="item">i2</div>
      </div>
    </div>
  )
}

export default BlogPostNew;
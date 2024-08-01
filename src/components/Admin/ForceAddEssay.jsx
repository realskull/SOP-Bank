// src/components/admin/ForceAddEssay.jsx
import React, { useState } from 'react';

const ForceAddEssay = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add essay logic here
  };

  return (
    <div>
      <h2>Force Add Essay</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <button type="submit">Add Essay</button>
      </form>
    </div>
  );
};

export default ForceAddEssay;

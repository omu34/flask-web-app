import React, { useState } from "react";
import ApiService from "../Components/ApiService";

function Form(props) {
  const [title, setTitle] = useState(props.article.title);
  const [body, setBody] = useState(props.article.body);
  const updateArticle = () => {
    ApiService.updateArticle(props.article.id, { title, body })
      .then((resp) => props.updatedData(resp))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        {props.article ? (
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="body" className="form-label" />
            Content
            <textarea
              type="text"
              className="form-control"
              row="3"
              cols="80"
              placeholder="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button onClick={updateArticle} className="btn btn-success mt-3 ">
              update
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Form;

import "./App.css";
import { useState, useEffect } from "react";
import { ArticleList } from "./Components/ArticleList";
import { Form } from "./Components/Form";

function App() {
  const [articles, setArticles] = useState([]);
  const [editedArticle, setEditedArticle] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3400/get", {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setArticles(resp))
      .catch((error) => console.log(error));
  }, []);
  const editArticle = (article) => {
    // console.log("hello")
    setEditedArticle(article);
  };

  return (
    <div className="App">
      <h1>Web App React Course</h1>
      <ArticleList articles={articles} editArticle={editArticle} />
      {editedArticle ? <Form article={editedArticle} /> : null}
    </div>
  );
}

export default App;

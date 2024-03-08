export default class ApiService {
  static UpdateArticle(id, body) {
    return fetch(`http://127.0.0.1:3400/update/&{id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}

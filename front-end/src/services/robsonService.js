import http from "../http-common";

class robsonService {
  getAll() {
    return http.get(`/robsoners/`);
  }

  get(name) {
    console.log(name)
    return http.get(`/robsoners/${name}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new robsonService();

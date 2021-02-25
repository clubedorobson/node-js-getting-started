import http from "../http-common";

class seasonalService {
  getAll() {
    return http.get(`/stadiums`);
  }

  get(name) {
    console.log(name)
    return http.get(`/stadiums/${name}`);
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

export default new seasonalService();

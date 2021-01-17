import http from "../http-common";

class clubesService {
  getAll(clubId) {
    return http.get(`/membros/${clubId}`);
  }

  get(id, clubId) {
    return http.get(`/membros/${clubId}/${id}`);
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

export default new clubesService();

import http from "../http-common";

class clubesService {
    getAll(clubId) {
        return http.get(`/partidas/${clubId}`);
    }

    get(id, partidaId) {
        return http.get(`/partidas/${partidaId}/${id}`);
    }

    getSeasons(clubId) {
        return http.get(`/partidas/seasons/${clubId}`)
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

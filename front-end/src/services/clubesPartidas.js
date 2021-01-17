import http from "../http-common";

class clubesPartidasService {
    getAll(clubId) {
        return http.get(`/clubesPartidas/${clubId}`);
    }

    get(id, partidaId) {
        return http.get(`/clubesPartidas/${partidaId}/${id}`);
    }

    getBySeason(clubId, seasonId) {
        return http.get(`/clubesPartidas/${clubId}/${seasonId}`)
    }

    getSeasons(clubId) {
        return http.get(`/clubesPartidas/seasons/${clubId}`)
    }

    create(data) {
        return http.post("/clubesPartidas", data);
    }

    update(id, data) {
        return http.put(`/clubesPartidas/${id}`, data);
    }

    delete(id) {
        return http.delete(`/clubesPartidas/${id}`);
    }

    deleteAll() {
        return http.delete(`/clubesPartidas`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new clubesPartidasService();

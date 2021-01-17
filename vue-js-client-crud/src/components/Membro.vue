<template>
  <div v-if="currentMembro" class="edit-form">
    <h4>Membro</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentMembro.proName"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentMembro.favoritePosition"
        />
      </div>

      <!--<div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>-->
    </form>

    <!--<button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>-->
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import membrosService from "../services/membrosService";

export default {
  name: "membro",
  data() {
    return {
      currentMembro: null,
      message: ''
    };
  },
  methods: {
    getMembro(id, clubId) {
      membrosService.get(id, clubId)
        .then(response => {
          this.currentMembro = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /*updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },*/

    /*updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },*/

    /*deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }*/
  },
  mounted() {
    this.message = '';
    console.log(this.$route.params)
    this.getMembro(this.$route.params.id, this.$route.params.clubId);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

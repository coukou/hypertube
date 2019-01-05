<template>
  <div>
    <video ref="player" width="640" height="360" controls>
      <source :src="source" type="video/webm">
    </video> 
    <div v-if="downloading">
      <div>{{ $t('currently_downloading') }}</div>
    </div>
    <!-- comments part -->
    <div>
      <hr />
      <h2>{{ $t('sections.comment_section') }}</h2>
      <hr />
      <div class="comment-form">
        <n3-textarea
          class="comment-input"
          v-model="comment"
          :placeholder="$t('placeholder.comment')"
          min-height="100px"
        ></n3-textarea>
        <n3-button @click.native="sendComment">submit</n3-button>
      </div>
      <hr />
      <div class="comment" v-for="(comment, key) of sortedComments" :key="key">
        <router-link :to="`/app/profile/${comment.author}`">
          <div class="comment-author">{{ comment.author_firstname }} {{ comment.author_lastname }}</div>
        </router-link>
        <div>{{ comment.text }}</div>
      </div>
    </div>
    <loading-dots v-if="loadingComments"></loading-dots>
  </div>
</template>

<script>
import LoadingDots from "@/components/LoadingDots.vue";
import LibraryService from "@/services/library";
import ProfileService from "@/services/profile";
import { WebVTT } from "vtt.js";

export default {
  components: {
    LoadingDots
  },
  data() {
    return {
      comment: undefined,
      comments: [],
      cues: {},
      source: this.getSource(),
      loadingComments: false,
      downloading: false
    };
  },
  created() {
    this.player = {};
    this.fetchComment();
    this.updateMetadata();
  },
  mounted() {
    var player = this.$refs.player;
    player.addEventListener("loadedmetadata", () => {
      const track = player.addTextTrack("captions", "English", "en");
      track.mode = "showing";
      this.player.track = track;
      this.updateSubtitles();
    });
  },
  computed: {
    sortedComments() {
      return this.comments.sort((a, b) => b.date - a.date);
    }
  },
  methods: {
    updateSubtitles() {
      if (!this.player.track) return;
      const { id, episode, quality } = this.$route.params;
      const token = this.$store.getters.accessToken;
      const url = `http://192.168.99.100:3000/sub?anime=${id}&episode=${episode}&quality=${quality}&at=${token}`;
      fetch(url)
        .then(res => {
          res.text().then(vtt => {
            const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
            parser.oncue = cue => {
              cue.id = `${cue.startTime}->${cue.endTime}:${cue.text}`;
              if (!this.cues[cue.id]) {
                this.cues[cue.id] = cue;
                this.player.track.addCue(cue);
              }
            };
            parser.parse(vtt);
            parser.flush();
          });
        })
        .catch(() => {});
    },
    updateMetadata() {
      const { id, episode, quality } = this.$route.params;
      const token = this.$store.getters.accessToken;
      const url = `http://192.168.99.100:3000/info?anime=${id}&episode=${episode}&quality=${quality}&at=${token}`;
      fetch(url).then(res => {
        res
          .json()
          .then(data => {
            this.updateSubtitles();
            if (!data.downloaded) {
              if (!this.downloading) this.downloading = true;
              setTimeout(this.updateMetadata, 5000);
            } else {
              if (this.downloading) {
                this.downloading = false;
                this.reloadVideo();
              }
            }
          })
          .catch(() => {});
      });
    },
    reloadVideo() {
      const player = this.$refs.player;
      const ctime = player.currentTime;
      player.load();
      player.play();
      player.currentTime = ctime;
    },
    fetchComment() {
      const { id, episode } = this.$route.params;
      LibraryService.getComments({ anime: id, episode }, comment => {
        this.$store.dispatch("getProfile", comment.author).then(profile => {
          console.log(comment);
          comment.author_firstname = profile.getFirstName();
          comment.author_lastname = profile.getLastName();
          this.comments.push(comment);
        });
        this.loadingComments = false;
      });
      setTimeout(() => {
        this.loadingComments = false;
      }, 2000);
      this.loadingComments = true;
    },
    getSource() {
      const { id, episode, quality } = this.$route.params;
      const token = this.$store.getters.accessToken;
      return `http://192.168.99.100:3000/video?anime=${id}&episode=${episode}&quality=${quality}&at=${token}`;
    },
    sendComment() {
      const { id, episode } = this.$route.params;
      LibraryService.commentEpisode(id, episode, this.comment)
        .then(comment => {
          const c = comment.toObject();
          const p = this.$store.getters.profile;
          c.author_firstname = p.firstName;
          c.author_lastname = p.lastName;
          this.comments.push(c);
          this.comment = "";
        })
        .catch(err => {
          this.n3Toast({
            text: this.$t(this.$t(err.message)),
            type: "danger",
            placement: "top",
            closeOnClick: true
          });
        });
    }
  }
};
</script>

<style scoped>
.comment-form {
  display: flex;
  flex-direction: column;
}

.comment-input {
  width: 100% !important;
}

.comment-form > * {
  margin-bottom: 10px;
}

.comment {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.comment-author {
  font-weight: bold;
}
</style>

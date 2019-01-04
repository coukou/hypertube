<template>
  <div>
    <video ref="player" width="640" height="360" controls>
      <source :src="source" type="video/webm">
    </video> 
    <div v-if="downloading">
      <div>We are currently downloading your anime on our server.</div>
      <div>You'll get video duration / seeking when file downloaded.</div>
      <div>Stream may be unstable.</div>
    </div>
    <!-- comments part -->
    <div>
      <hr />
      <h2>Comment section</h2>
      <hr />
      <div class="comment-form">
        <n3-textarea
          class="comment-input"
          v-model="comment"
          placeholder="Type your comment here..."
          min-height="100px"
        ></n3-textarea>
        <n3-button @click.native="sendComment">submit</n3-button>
      </div>
      <hr />
      <div class="comment" v-for="(comment, key) of comments" :key="key">
        <div class="comment-author">{{ comment.author }}</div>
        <div>{{ comment.text }}</div>
      </div>
    </div>
    <loading-dots v-if="loadingComments"></loading-dots>
  </div>
</template>

<script>
import LoadingDots from "@/components/LoadingDots.vue";
import LibraryService from "@/services/library";
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
  methods: {
    updateSubtitles() {
      if (!this.player.track) return;
      const { id, episode, quality } = this.$route.params;
      const url = `http://localhost:3000/sub?anime=${id}&episode=${episode}&quality=${quality}`;
      fetch(url).then(res => {
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
      });
    },
    updateMetadata() {
      const { id, episode, quality } = this.$route.params;
      const url = `http://localhost:3000/info?anime=${id}&episode=${episode}&quality=${quality}`;
      fetch(url).then(res => {
        res.json().then(data => {
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
        });
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
        this.loadingComments = false;
        this.comments.push(comment);
      });
      this.loadingComments = true;
    },
    getSource() {
      const { id, episode, quality } = this.$route.params;
      return `http://localhost:3000/video?anime=${id}&episode=${episode}&quality=${quality}`;
    },
    sendComment() {
      const { id, episode } = this.$route.params;
      LibraryService.commentEpisode(id, episode, this.comment).then(comment => {
        this.comments.push(comment.toObject());
        this.comment = "";
      });
    }
  },
  computed: {}
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

<template>
  <div class="face-recognition">
    <div class="btn">
      <el-button type="primary" @click="startVideo">开启摄像头</el-button>
      <el-button type="danger" @click="stopVideo">关闭摄像头</el-button>
    </div>
    <div class="camera-area">
      <video id="video" ref="video" autoplay muted playsinline>请开启摄像头识别人脸</video>
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';

export default {
  name: 'FaceRecognition',
  data () {
    return {
      video: null,
      canvas: null,
      stream: null,
      timer: null,
      modelsLoaded: false,
      canvas: null
    }
  },
  mounted () {
    this.loadModels();
  },
  methods: {
    async loadModels () {
      this.modelsLoaded = false;
      await faceapi.loadSsdMobilenetv1Model('./models');
      await faceapi.loadFaceLandmarkTinyModel('./models');
      await faceapi.loadFaceExpressionModel('./models');
      await faceapi.loadAgeGenderModel('./models');
      this.modelsLoaded = true;
    },
    async startVideo () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.$refs.video.srcObject = this.stream;
          this.$refs.video.addEventListener('play', this.detectFace);

          // 播放视频
          while (!this.modelsLoaded) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          await this.$refs.video.play();
        } catch (err) {
          console.error("用户拒绝了网站访问摄像头: ", err);
        }
      }
    },
    async detectFace () {
      const expressionMapping = {
        angry: "生气",
        disgusted: "厌恶",
        fearful: "害怕",
        happy: "高兴",
        sad: "伤心",
        surprised: "惊讶",
        neutral: "自然"
      };
      this.timer = setInterval(async () => {
        this.$refs.canvas.width = this.$refs.video.videoWidth;
        this.$refs.canvas.height = this.$refs.video.videoHeight;
        const detections = await faceapi.detectAllFaces(this.$refs.video)
          .withFaceLandmarks(true)
          .withAgeAndGender()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, { width: this.$refs.video.videoWidth, height: this.$refs.video.videoHeight });
        this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        faceapi.draw.drawDetections(this.$refs.canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(this.$refs.canvas, resizedDetections)
        // faceapi.draw.drawFaceExpressions(this.$refs.canvas, resizedDetections);
        resizedDetections.forEach(result => {
          const { age, gender, genderProbability, expressions } = result;
          const genderChinese = gender === 'male' ? '男性' : '女性';
          let expressionTexts = [];
          for (let [expressionKey, expressionValue] of Object.entries(expressions)) {
            if (expressionValue > 0.5) {
              const expressionChinese = expressionMapping[expressionKey];
              expressionTexts.push(`表情：${expressionChinese} (${expressionValue.toFixed(2)})`);
            }
          }
          new faceapi.draw.DrawTextField(
            [
              `年龄: ${Math.round(age)}`,
              `性别: ${genderChinese} (${Math.round(genderProbability)})`,
              ...expressionTexts
            ],
            { x: result.detection.box.bottomLeft.x, y: result.detection.box.bottomLeft.y }
          ).draw(this.$refs.canvas);
        });

      }, 300);
    },
    stopVideo () {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    }
  },
  beforeDestroy () {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
  }
}
</script>
<style scoped>
.face-recognition {
  padding-top: 20px;
}

.btn {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.camera-area {
  width: 320px;
  position: relative;
  margin: 0 auto;
}

.camera-area video {
  width: 100%;
  height: auto;
}

.camera-area canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
</style>
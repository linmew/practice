<template>
  <div class="home">
    <h1>Welcome to Home Page</h1>
    <router-link to="/RemoveBackground" class="navigate-btn">
      背景移除
    </router-link>
    <router-link to="/FaceRecognition" class="navigate-btn">
      人脸识别
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.navigate-btn {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  color: white;
  background-color: #4CAF50;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.navigate-btn:hover {
  background-color: #45a049;
}
</style>
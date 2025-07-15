<template>
    <div>
        <nav>
            <router-link to="/">Home | </router-link>
            <router-link to="/about">About | </router-link>
            <router-link to="/kakaologin">kakaologin | </router-link>
            <router-link to="/naverlogin">naverlogin | </router-link>
            <router-link to="/googlelogin">googlelogin | </router-link>
        </nav>
        <!-- <router-view />는 라우터 설정에 등록된 컴포넌트를 자동으로 보여줍니다. -->
        <router-view />
    </div>
</template>
<script></script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>

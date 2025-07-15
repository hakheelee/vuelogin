<template>
    <div>
        <!-- 구글로그인 : loginvue24 -->
        <!-- 로그인 버튼 -->
        <button v-if="!isLoggedIn" @click="login" class="google-button">
            <img src="@/assets/google-login.png" alt="Login with Google" class="google-button-img" />
        </button>
        <!-- 로그아웃 버튼 -->
        <button v-if="isLoggedIn" @click="logout" class="logout-button">Logout</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'; // Vue의 반응형 변수 및 상태 관리를 위한 ref 함수
import { googleSdkLoaded } from 'vue3-google-login'; 


const oauthClientId = process.env.VUE_APP_OAUTH_CLIENT;

// 로그인 상태를 관리하는 반응형 변수
const isLoggedIn = ref(false); //초기 로그아웃상태여야함


const login = () => {

    googleSdkLoaded((google) => {
        // OAuth 2.0 클라이언트 초기화
        google.accounts.oauth2
            .initCodeClient({
                client_id: oauthClientId, 
                scope: 'email profile openid', 
                callback: (response) => {
                    
                    // 구글 인증에 성공한 후 호출되는 콜백 함수
                    console.log('응답을 처리합니다.', response);
                    // 로그인 상태를 true로 업데이트
                    isLoggedIn.value = true;
                }
            })
            .requestCode(); // 인증 코드를 요청합니다.
    });
};

/**
 * 로그아웃 처리
 * 로그인 상태를 초기화하고, 세션 정리 등 추가 작업을 수행합니다.
 */
const logout = () => {
    
    console.log('User logged out');
    isLoggedIn.value = false;
};
</script>
<style scoped>
.google-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.google-button-img {
    width: 200px; /* 버튼 이미지 크기 */
    height: auto;
    display: block;
}

.google-button:hover {
    opacity: 0.9; /* 마우스 오버 시 효과 */
}

.logout-button {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #357ae8; /* 마우스 오버 시 색상 변경 */
}
</style>

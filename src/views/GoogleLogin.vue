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
    console.log('OAuth Client ID:', oauthClientId); // 디버깅용

    try {
        // Google Identity Services 직접 사용
        if (window.google && window.google.accounts) {
            const client = window.google.accounts.oauth2.initCodeClient({
                client_id: oauthClientId,
                scope: 'email profile openid',
                ux_mode: 'popup',
                callback: (response) => {
                    console.log('구글 응답:', response);
                    if (response.code) {
                        isLoggedIn.value = true;
                        alert('로그인 성공!');
                    } else if (response.error) {
                        console.error('로그인 오류:', response.error);
                        alert('로그인 실패: ' + response.error);
                    }
                }
            });
            client.requestCode();
        } else {
            // 기존 vue3-google-login 사용
            googleSdkLoaded((google) => {
                google.accounts.oauth2
                    .initCodeClient({
                        client_id: oauthClientId,
                        scope: 'email profile openid',
                        ux_mode: 'redirect', // 리디렉션 모드로 변경
                        redirect_uri: 'https://hakheelee.github.io/vuelogin/',
                        callback: (response) => {
                            console.log('응답을 처리합니다.', response);
                            if (response.code) {
                                isLoggedIn.value = true;
                                alert('로그인 성공!');
                            } else if (response.error) {
                                console.error('로그인 오류:', response.error);
                                alert('로그인에 실패했습니다: ' + response.error);
                            }
                        }
                    })
                    .requestCode();
            });
        }
    } catch (error) {
        console.error('로그인 초기화 오류:', error);
        alert('로그인을 초기화하는 중 오류가 발생했습니다.');
    }
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

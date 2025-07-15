<template>
    <div>
        <div id="naverIdLogin" v-if="!accessToken"></div>
        <button type="button" @click="logout" v-if="accessToken">로그아웃</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            naverLogin: null,
            accessToken: null
        };
    },
    mounted() {
        this.initializeNaverLoginButton();
    },
    methods: {
        initializeNaverLoginButton() {
            try {
                // 현재 도메인을 기반으로 callbackUrl 설정
                const currentDomain = window.location.origin;
                const callbackUrl = `${currentDomain}/naverlogin`;
                const clientId = process.env.VUE_APP_NAVER_CLIENT_ID || 'auC8kDcoRx6AZ7q_uI6Z';

                this.naverLogin = new window.naver.LoginWithNaverId({
                    clientId: clientId,
                    callbackUrl: callbackUrl,
                    isPopup: false,
                    loginButton: { color: 'green', type: 3, height: 60 }
                });
                this.naverLogin.init();

                this.naverLogin.getLoginStatus((status) => {
                    if (status) {
                        this.checkLoginStatus();
                    } else {
                        console.log('로그인되지 않은 상태입니다.');
                    }
                });
            } catch (error) {
                console.error('네이버 로그인 초기화 중 오류 발생:', error);
            }
        },
        checkLoginStatus() {
            if (!this.naverLogin) {
                console.error('네이버 로그인 객체가 초기화되지 않았습니다.');
                return;
            }
            this.naverLogin.getLoginStatus((status) => {
                if (status) {
                    const email = this.naverLogin.user.getEmail();
                    if (!email) {
                        alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
                        this.naverLogin.reprompt();
                        return;
                    }
                    this.accessToken = this.naverLogin.accessToken.accessToken;
                    console.log('로그인 성공!', email);
                } else {
                    console.log('callback 처리에 실패하였습니다.');
                }
            });
        },
        logout() {
            if (!this.accessToken) {
                console.log('로그인 상태가 아닙니다.');
                return;
            }

            const logoutUrl = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=auC8kDcoRx6AZ7q_uI6Z&client_secret=FubU5cdFU2&access_token=${this.accessToken}&service_provider=NAVER`;

            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = logoutUrl;
            document.body.appendChild(iframe);

            this.accessToken = null;

            this.$nextTick(() => {
                this.initializeNaverLoginButton();
            });

            console.log('로그아웃 요청이 실행되었습니다.');
        }
    }
};
</script>

<template>
    <div>
        <a id="custom-login-btn" v-if="!isLoggedIn" @click="kakaoLogin">
            <img
                src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
            />
        </a>
        <button type="button" v-if="isLoggedIn" @click="kakaoLogout">카카오 로그아웃</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            isLoggedIn: false
        };
    },
    mounted() {
        if (!window.Kakao.isInitialized()) {
            const kakaoKey = process.env.VUE_APP_KAKAO_KEY || '33d8c15972efdd0260e97b12ff581cd9';
            window.Kakao.init(kakaoKey);
        }
    },
    methods: {
        kakaoLogin() {
            try {
                window.Kakao.Auth.login({
                    scope: 'profile_image, profile_nickname',
                    success: this.getKakaoAccount,
                    fail: (error) => {
                        console.error('카카오 로그인 실패:', error);
                        alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
                    }
                });
            } catch (error) {
                console.error('카카오 로그인 초기화 오류:', error);
                alert('카카오 로그인을 초기화하는 중 오류가 발생했습니다.');
            }
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    const profile = kakao_account.profile_image;
                    const nickname = kakao_account.profile_nickname;

                    console.log('profile', profile);
                    console.log('nickname', nickname);
                    console.log(kakao_account);

                    this.isLoggedIn = true;
                    alert('로그인 성공!');
                },
                fail: (error) => {
                    alert('로그인에 실패했습니다. 다시 시도해주세요.');
                    console.log(error);
                }
            });
        },
        kakaoLogout() {
            if (!window.Kakao.Auth.getAccessToken()) {
                console.log('Not logged in.');
                return;
            }
            window.Kakao.Auth.logout((response) => {
                console.log('access token:', window.Kakao.Auth.getAccessToken());
                console.log('log out:', response);
                this.isLoggedIn = false;
            });
        }
    }
};
</script>

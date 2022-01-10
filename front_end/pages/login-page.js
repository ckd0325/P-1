export default function drawLoginPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<div class="login-signup-box"></div>`
    const $loginSignUpBox = document.querySelector(".login-signup-box");

    // 로그인 버튼 클릭 이벤트 구현 예정!!
    $loginSignUpBox.innerHTML += `<input id="write-id" type="text" placeholder="id를 입력하시오" style="height:40px"><input class="blue-button" type="button" value="회원가입" data-link="sign-up"/><input class="blue-button" type="button" value="로그인" data-link="구현 필요!!" />`;
}
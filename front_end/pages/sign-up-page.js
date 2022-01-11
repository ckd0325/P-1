export default function drawSignUpPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<div class="login-signup-box"></div>`
    const $loginSignUpBox = document.querySelector(".login-signup-box");

    // 로그인 버튼 클릭 이벤트 구현 예정!!
    $loginSignUpBox.innerHTML += `<input id="write-id" type="text" placeholder="id를 입력하시오" style="height:40px"><input class="blue-button" type="button" value="나가기" data-link="login" /><input class="blue-button" id="sign-up-user" type="button" value="회원가입" data-link="login" />`;

    const $signUpButton = document.querySelector('#sign-up-user');
    $signUpButton.addEventListener('click', () => {
        sendUserInfo(document.getElementById("write-id").value)
    });
}

function sendUserInfo(userId) {
    const id = userId;
    console.log("id 전송: " + id);

    axios.post("/sign-up-user", {
            id: id,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}
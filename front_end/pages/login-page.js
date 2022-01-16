export let id = '익명';

export default function drawLoginPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<div class="login-signup-box"></div>`
    const $loginSignUpBox = document.querySelector(".login-signup-box");

    // 로그인 버튼 클릭 이벤트 구현 예정!!
    $loginSignUpBox.innerHTML += `<input id="write-id" type="text" placeholder="id를 입력하시오" style="height:40px"><input class="blue-button" type="button" value="회원가입" data-link="sign-up"/><input class="blue-button" id="login" type="button" value="로그인" data-link="free-bulletin" />`;

    const $loginButton = document.querySelector('#login');
    $loginButton.addEventListener('click', () => {
        login(document.getElementById("write-id").value)
    });
}

const login = async(userId) => {
    id = userId;
    let result;
    console.log(`입력한 ID: ${id}`);
    try {
        const response = await axios.post("login", { id: id, }); // DB에 해당하는 id가 있으면 true 반환
        result = response.data;
    } catch (err) {
        console.log(err);
    }
    if (result === true) {
        const $logIcon = document.getElementById('login-button');
        $logIcon.textContent = "Log out";
        alert(`환영합니다 ${id}님!!`);
    } else {
        alert('존재하지 않는 ID입니다.');
    }
}
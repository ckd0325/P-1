import drawMainPage from "./pages/main-page.js";
import drawWritingPage from "./pages/write-post-page.js"
import drawLoginPage from "./pages/login-page.js"
import drawSignUpPage from "./pages/sign-up-page.js";

export let category = ['자유 게시판', '비밀 게시판', '정보 게시판', '홍보 게시판', 'Sw 게시판']

let onSlidingMenu = 0;
let currentBulletin = '자유 게시판';

/***********************라우터 설정********************** */
const router = async() => {
    const routes = [
        { path: "/", view: drawMainPage },
        { path: "/write-post", view: drawWritingPage },
        { path: "/login", view: drawLoginPage },
        { path: "/sign-up", view: drawSignUpPage },
    ];

    const pageMatches = routes.map((route) => {
        return {
            route,
            isMatch: route.path === location.pathname,
        };
    });

    let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
    console.log(pageMatches);
    match.route.view();

}


/**************버튼 누르면 페이지 이동 ************/
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            history.pushState(null, null, e.target.dataset.link);
            router();
        }
    });
    router();
});

/*****************Ajou Memo 클릭 시 이동********************/
/*
document.getElementById("main-button").addEventListener("click", (e) => {
    history.pushState(null, null, location.origin);
    router();
})
*/

/*****************Log in 클릭 시 이동**********************/
/*
document.getElementById("login-button").addEventListener("click", (e) => {
    history.pushState(null, null, e.target.dataset.link);
    router();
})


window.addEventListener("popstate", () => {
    router();
})
*/


/**************메뉴버튼 클릭시 게시글 목록 표시*************/
const $slidingMenuButton = document.getElementById('sliding-menu-button');
document.body.innerHTML += `<div class="sliding-menu"></div>`;
const $slidingMenu = document.querySelector('.sliding-menu');
$slidingMenu.innerHTML += `<ul></ul>`
const $bulletinList = document.querySelector('.sliding-menu ul');
category.forEach((element) => {
    $bulletinList.innerHTML += `<li>${element}</li>`;
});
const bulletinList = document.querySelector(".sliding-menu ul");
bulletinList.addEventListener("click", (event) => {
    currentBulletin = event.target.textContent;
    console.log(currentBulletin);
})

//$slidingMenu.setAttribute("style", "display:block;");
document.getElementById('sliding-menu-button').addEventListener("click", () => {
    console.log('clicked');
    if (onSlidingMenu === 0) {
        $slidingMenu.setAttribute("style", "display:block;");
        onSlidingMenu = 1;
    } else {
        $slidingMenu.setAttribute("style", "display:none;");
        onSlidingMenu = 0;
    }
});
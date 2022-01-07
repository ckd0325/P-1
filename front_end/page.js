let category = ['자유 게시판', '비밀 게시판', '정보 게시판', '홍보 게시판', 'Sw 게시판']

let onSlidingMenu = 0;
let currentBulletin = '자유 게시판';

/***********************라우터 설정********************** */
const router = async() => {
    const routes = [
        { path: "/", view: () => console.log("Viewing free-bulletin") },
        { path: "/write-post", view: drawWritingPage },
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

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            history.pushState(null, null, e.target.dataset.link);
            router();
        }
    });
    router();
});

window.addEventListener("popstate", () => {
    router();
})


/**************메뉴버튼 클릭시 게시글 목록 표시*************/
const $slidingMenuButton = document.querySelector('.sliding-menu-button');
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
document.querySelector('.sliding-menu-button').addEventListener("click", () => {
    console.log('clicked');
    if (onSlidingMenu === 0) {
        $slidingMenu.setAttribute("style", "display:block;");
        onSlidingMenu = 1;
    } else {
        $slidingMenu.setAttribute("style", "display:none;");
        onSlidingMenu = 0;
    }
});

/******************메인 페이지********************/

/******************게시글 작성 페이지 생성********************/
const drawWritingPage = () => {
    document.body.innerHTML += `<div class="create-post"></div>`;
    const $createPost = document.querySelector(".create-post");

    //게시판 선택
    $createPost.innerHTML += `<select name="게시판을 선택해 주세요" style="height:40px"></select>`;
    const $select = document.querySelector(".create-post select");
    $createPost.appendChild($select);
    category.forEach((element) => {
        let i = document.createElement('option');
        i.setAttribute("value", element);
        i.textContent = element;
        $select.appendChild(i);
    })

    //제목칸
    $createPost.innerHTML += `<input id="title" type="text" placeholder="제목을 입력해 주세요" style="height:40px">`;

    //내용칸
    $createPost.innerHTML += `<input id="content" type="text" placeholder="내용" style="height:400px">`;

    //'글쓰기' 버튼
    document.body.innerHTML += `<div class="writing"></div>`
    const $writing = document.querySelector(".writing");

    $writing.innerHTML += `<input type="button" value="작성">`;
    const $writeButton = document.querySelector(".writing input");

    $writeButton.addEventListener("click", (e) => {
        const select = $select.value;
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        console.log(select + title + content);

        axios.post("/write-post", {
                select: select,
                title: title,
                content: content,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    })
}
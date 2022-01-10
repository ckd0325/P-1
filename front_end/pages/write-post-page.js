import { category } from "../index.js";

/******************게시글 작성 페이지 생성********************/
export default function drawWritingPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<div class="create-post"></div>`;
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
    $createPost.innerHTML += `<div class="writing"></div>`
    const $writing = document.querySelector(".writing");

    $writing.innerHTML += `<input type="button" value="작성">`;
    const $writeButton = document.querySelector(".writing input");

    $writeButton.addEventListener("click", () => {
        sendPostInfo($select.value, document.getElementById("title").value, document.getElementById("content").value)
    });
}

function sendPostInfo(selectValue, titleValue, contentValue) {
    const select = selectValue;
    const title = titleValue;
    const content = contentValue;
    console.log("게시글 전송: " + select + title + content);

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
}
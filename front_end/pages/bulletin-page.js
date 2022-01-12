import { currentBulletin } from "../index.js";

export default function drawBulletinPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    //게시글 이름과 '등록하기' 버튼 그리기
    $rootContent.innerHTML += `<div class="bulletin-and-writing"></div>`;
    const $bulletinAndWriting = document.querySelector(".bulletin-and-writing");
    $bulletinAndWriting.innerHTML += `<div id="bulletin-name">${currentBulletin}</div><div id="write-post" data-link="write-post">등록하기</div>`;

    //게시글 목록 그리기
    $rootContent.innerHTML += `<div class="bulletin-list"></div>`;

    //게시글 목록 번호
    $rootContent.innerHTML += `<div class="bulletin-list-number"></div>`;
}
import { currentBulletin } from "../index.js";

export default async function drawBulletinPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<div class="bulletin-page-box"></div>`;
    const $bulletinPageBox = document.querySelector(".bulletin-page-box");

    //게시글 이름과 '등록하기' 버튼 그리기
    $bulletinPageBox.innerHTML += `<div class="bulletin-and-writing"></div>`;
    const $bulletinAndWriting = document.querySelector(".bulletin-and-writing");
    $bulletinAndWriting.innerHTML += `<div id="bulletin-name">${currentBulletin}</div><div id="write-post" data-link="write-post">등록하기</div>`;

    //게시글 목록 그리기
    $bulletinPageBox.innerHTML += `<table class="bulletin-list"></table>`;
    const $bulletinList = document.querySelector(".bulletin-list");


    //게시글 목록 번호
    $bulletinPageBox.innerHTML += `<div class="bulletin-list-number"></div>`;
}
import { currentBulletin } from "../index.js";

let currentPage = 1;
let numOfPost; // 게시글의 개수
let pageSize = 6; // 한 페이지에 띄울 수 있는 최대 게시글 수

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
    //게시글 페이지 번호
    $bulletinPageBox.innerHTML += `<div class="bulletin-list-pages"></div>`;
    const $bulletinListPages = document.querySelector(".bulletin-list-pages");

    try { //현재 게시판의 총 게시글 수 구하기
        const response = await axios.get(`post-number/${currentBulletin}`); //현재 게시판의 게시글 가져오기
        numOfPost = response.data[0].count;
    } catch (err) {
        console.log(err);
    }
    console.log(numOfPost);

    drawListAndPages($bulletinList, $bulletinListPages, currentPage, numOfPost);
}

function drawListAndPages($bulletinList, $bulletinListPages, currentPage, numOfPost) {
    const numOfPage = Math.floor((numOfPost / pageSize) + 1); // 페이지 수

    for (let i = 0; i < numOfPage; i++) {
        $bulletinListPages.innerHTML += `<input class="page" type="button" value="${i+1}">`;
    }

    $bulletinListPages.addEventListener('click', (e) => {
        if (e.target.matches('.page')) {
            drawBulletinList(Number(e.target.value));
        }
    })
}

async function drawBulletinList(page) {
    try { //현재 페이지 번호 보낸 뒤에 게시글 정보 받기
        const response = await axios.get(`bulletin-list/${page}`);
    } catch (err) {
        console.log(err);
    }
}
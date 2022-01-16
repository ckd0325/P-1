import { postNum } from "./bulletin-page.js";
import { currentBulletin } from "../index.js";
import { id } from "./login-page.js";

export default async function drawPostPage() {
    let title, date, content;

    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<div class="post-box"></div><div class="delete-edit"></div>`;
    const $postBox = document.querySelector('.post-box');
    const $deleteEdit = document.querySelector('.delete-edit');
    $postBox.innerHTML +=
        `<div class="bulletin-writer">
      <div>${currentBulletin}</div>
      <div>${id}</div>
    </div>
    <div class="title">
    </div>
    <div class="content">
    </div>`;

    const $bulletinWriter = document.querySelector('.bulletin-writer');
    const $title = document.querySelector('.title');
    const $content = document.querySelector('.content');

    try { //게시글 정보 가져오기
        const response = await axios.get(`post/${currentBulletin}/${postNum}`);
        title = response.data[0].title;
        date = response.data[0].date;
        content = response.data[0].content;
    } catch (err) {
        console.log(err);
    }

    $title.textContent = title;
    $content.textContent = content;
}
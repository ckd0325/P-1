export default function drawFreeBulletinPage() {
    const $rootContent = document.querySelector(".root-content");
    while ($rootContent.hasChildNodes()) {
        $rootContent.removeChild($rootContent.firstChild);
    }

    $rootContent.innerHTML += `<input type="button" value="글쓰기" data-link="write-post" />`

}
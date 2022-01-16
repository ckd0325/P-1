## 22/01/07
### 진행 상황
1. 글쓰기 버튼 반복 클릭시 요소가 계속되서 추가되는 이슈 해결
  - 버튼 누를 때마다 DOM을 모두 지우고 다시 그리게 함

2. 'Log in' 클릭 시 로그인 페이지로 이동

3. 로그인 페이지에서 '회원가입' 클릭시 회원가입 페이지로 이동. 이동해서 '나가기' 클릭 시 다시 로그인 페이지로 이동

4. 로그인/회원가입 페이지 css 작업: 둘이 형식 동일

### 이슈
1. 사이드 바 클릭시 기존 DOM들이 밀리는 현상
2. 'Log in' 클릭 이후 'Ajou memo' 클릭 시 링크가 변하지 않음
3. live server 사용 시 'listing directory'라는 곳으로 이동


## 22/01/10
### 진행 상황
1. 사이드 바 밀림 이슈 해결 - z-index 사용 및 CSS 일부 수정
2. **'Log in' 클릭 이후 'Ajou memo' 클릭 시 링크가 변하지 않음** 이슈
    - 메인 페이지 = 자유 게시판이니 클릭 시 '/free-bulletin'으로 url 변경하게끔 수정
    - pushState의 세번째 argument에 ""(빈 문자열)을 넣으면 주소가 변하지 않는 것으로 추측되는데 정확한 이유는 찾지 못함
3. 글쓰기 클릭 이벤트 기명 함수로 변경
4. 회원가입 페이지에서 아이디 입력 후 '회원가입' 클릭 시 'users' table에 id 추가됨 확인


## 22/01/11
### 진행 상황
1. 로그인 페이지에서 id 입력 후 **'로그인'** 클릭하면 입력한 id가 DB에 있는지 확인
    
    - 있다면 '환영'경고창 띄우고 상단바 'Log in'을 'Log out'으로 변경한 뒤 게시판 페이지로 이동.
    - 없다면 '해당 ID 존재X' 경고창 띄우고 게시판 페이지로 이동.
2. 사이드 메뉴 CSS 적용
3. 사이드 메뉴 게시판 클릭하면 해당하는 url로 변경하고 해당 게시판 이름 표시

### 이슈
1. 게시판 페이지에서 '게시판 이름, 등록하기 버튼 / 게시글 목록 / 목록 번호' 분리 안됨.

## 22/01/12
### 진행 상황
1. 게시글 페이지 CSS 수정하여 11일자 이슈 해결
2. 게시글 작성 시 DB에 날짜, 제목, 내용 DB에 기록
    - 'select box'에 값을 읽어오는데 문제가 있었음 -> 내가 'select box'에서 옵션을 선택한 뒤에 querySelector나 getElementById를 사용해야 했음.

### 해야 할 것
1. 글 작성 후 해당하는 게시판 페이지로 이동하게 하기
2. 게시글 페이징 방법 생각해보기

## 22/01/13
### 진행 상황
- 페이징 방법 구상하는데 시간을 많이 할애했음 이것저것 시도해본뒤 결정한 페이징 방법은 이러함.(현재 4.까지 구현)
    1. 사이드바의 게시판 페이지를 클릭하여 특정 게시판에 따라 url 변경
    2. 해당 게시판 DB에 있는 row의 개수를 읽어옴
    3. 읽어온 row 수를 이용하여 우선 페이지 버튼을 만듦(한 페이지에 게시글 6개 표시인데 게시글이 19개면 '1 2 3 4' 4개의 버튼이 생성되어야함)
    4. 페이지 버튼에 이벤트 리스너를 장착하여 클릭시 클릭한 페이지의 번호를 서버에 전송
    5. 받아온 페이지 번호를 이용하여 해당 페이지에 필요한 게시글 정보만 다시 클라이언트에 전송
    6. 클라이언트는 이를 수신하여 테이블 테그 적절하게 추가.

### 해야 할 것
- 이후 게시판의 게시글 제목을 클릭했을 때 상세 페이지로 이동하는 부분도 생각해야함
    - 막연한 생각은 게시글 클릭했을 때 해당 제목을 서버에 보내서 해당하는 열만 가져오게 하면 되지 않을까 생각 중.

## 22/01/16
### 진생 상황
- 페이징 기능 구현(13일자 페이징 방법 .4부터 다시 진행)
    1. **'현재 게시판, 페이지 개수, 총 게시글 수, 클릭한 페이지 번호'** 를 서버에 전달한다.
    2. 서버에서 전달받은 값을 이용해 현재 페이지에 띄어야할 게시글들만 DB에서 가져온 후 클라이언트에 전송한다.
    3. 클라이언트는 수신한 데이터를 이용하여 테이블의 열을 추가한다. 이때 제목을 클릭하면 postNum(post-page.js에서 사용가능) 변수를 클릭한 게시글의 PK로 초기화해준다.
    4. 얻은 PK를 이용하여 다시 서버에 요청을 보내 해당 PK를 가진 게시글 데이터를 가져온다.
    5. 해당 데이터를 이용해 게시글 조회 페이지를 완성한다.

### 미구현 사항들
- 불완전한 로그인: ID만을 사용, 로그아웃 기능X(현재는 로그아웃 클릭 시 다른 ID를 입력받아 로그인 가능)
- 게시글 작성자 기능X: 현재는 작성자가 '익명'으로만 설정된다. 초반에 DB설계 때부터 꼬인 것 같다.
- 글 삭제, 수정 기능 미구현
- 많이 허술한 CSS
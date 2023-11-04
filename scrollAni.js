const $topBtn = document.querySelector(".moveTopBtn");

// 버튼 클릭 시 맨 위로 이동
$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}






const images =[];

for(let i = 1; i<91; i++)
{
    images[i] = "img/" + i + ".png";
}

const preload = (images) => () => {
    images.forEach((image) => {
        const img = new Image();
        img.src = image;
    });
};

const addLoadEvent = (func) => {
    const onloadEvent = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (onloadEvent) {
                onloadEvent();
            }
            func();
        }
    }
}

addLoadEvent(preload(images));


console.log(images[40]);























// /* 프리로드시 온로드 코드*/ 
// const preloader = () => {
//     console.log("hi!!");
//     document.getElementById("preload1").style.background = "url(img/) no-repeat -9999px -9999px";
//     document.getElementById("preload2").style.background = "url(img/) no-repeat -9999px -9999px";
//     document.getElementById("preload3").style.background = "url(img/) no-repeat -9999px -9999px";
// };

// const addLoadEvent = (func) => {
//     const onloadEvent = window.onload;
//     if (typeof window.onload != 'function') {
//         window.onload = func;
//     } else {
//         window.onload = () => {
//             if (onloadEvent) {
//                 onloadEvent();
//             }
//             func();
//         }
//     }
// };

// addLoadEvent(preloader);












let windowWidth;
let windowHeight;

let scrollY = 0;
let relativeScrollY = 0;
let totalScrollHeight = 0;
let currenScene = 0;
let calAnimationVal;

let prevDurations = 0;
let pixelDuration = 0;

let openingImgs = ["ani00.png", "ani01.png"];

for(let i = 0; i < 100; i++)
{

    openingImgs[i] = "ani" + i + ".png";
}

//프리로드 코드 불러오는거 찾기. onload//
//사진 용량은 적어야 함. 불러오는 데에 용량이 크면 안되기에 작은 사이즈로 줄이기//
// 무브발로 불러와서 0부터 30, 30부터 60, 60부터 90을 한개의 시퀀스 총 3개의 시퀀스면서 3개의 스크롤이라고 생각하고 만들어야 함//  

// 사진 위치 고정하는 건 방식1.은 이미지와 타입을 그냥 png로 뽑아서 크기를 지정해서 넣는방식// 
// 방식2.은 플렉스설정돼 있는 컨테이너가 있고, 그 아래에 다이브로 해서 이미지를 감싸고, 그 다이브박스를 앱솔루트를 하면, 고정된 값을 가질 수 있다. 여기서 전체 화면의 절반 픽셀에서 30rem 정도를 빼면 딱 절반값이 나온다. 딱 절반값까진 아닌데 얼추 맞게 나옴. // 



// scene 0, 1, 2, 3, 4
let animationKeyframes = [
    { // scroller - in
        animationVal:{
            opacity:[1, 0],
            textBox:[0, 500]
        }
    },
    { // scroller - out
        animationVal:{
            opacity:[0, 0],
            textBox:[500, 500]
        }
    },
    { // contents0 - 1
        animationVal:{
            opacity:[0, 1],
            imgMove:[0, 0],
            imgChange:[1, 30]
        }
    },
    { // contents0 - 2
        animationVal:{
            // imgMove:[0, -100],
            imgChange:[31, 60]
        }
    },
    { // contents0 - 3
        animationVal:{
            opacity:[1, 0],
            imgMove:[0, -100],
            imgChange:[61, 90]
        }
    },
    { // contentsA in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    },
    { // contentsA out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60]
        }
    },
    { // contentsB in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    },
    { // contentsB out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60]
        }
    },
    { // contentsC in
        animationVal:{
            opacity:[0, 1],
            textBox:[-60, 0],
            textBox2:[60, 0]
        }
    },
    { // contentsC out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60],
            textBox2:[0, 60]
        }
    },
    { // contentsD in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    },
    { // contentsD out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60]
        }
    },
    { // contentsE in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    },
    { // contentsE out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60]
        }
    },
    { // contentsF in
        animationVal:{
            opacity:[0, 1],
            textBox:[-60, 0],
            textBox2:[60, 0]
        }
    },
    { // contentsF out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60],
            textBox2:[0, 60]
        }
    },
    { // contentsG in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    },
    { // contentsG out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60]
        }
    },
    { // contentsH in
        animationVal:{
            opacity:[0, 1],
            textBox:[-60, 0],
            textBox2:[60, 0]
        }
    },
    { // contentsH out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60],
            textBox2:[0, 60]
        }
    },
    { // contentsI in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0],
            textBox2:[60, 0],
            textBox3:[-60, 0],
        }
    },
    { // contentsI out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60],
            textBox2:[0, 60],
            textBox3:[0, -60],
        }
    },
    { // contentsJ in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    },
    { // contentsJ out
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -60]
        }
    },
    { // contentsK in
        animationVal:{
            opacity:[0, 1],
            textBox:[60, 0]
        }
    }
]

let elemBody = document.body;

function init()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    render();
    resizeHandler();
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

}

function scrollHandler()
{
    scrollY = window.pageYOffset;

    if(scrollY < 0 || scrollY > (totalScrollHeight - windowHeight))
    {
        return;
    }

    if(scrollY > pixelDuration+prevDurations)
    {
        prevDurations += pixelDuration;
        currenScene++;
    }
    else if(scrollY < prevDurations)
    {
        currenScene--;
        prevDurations -= pixelDuration;
    }

    relativeScrollY = scrollY - prevDurations;

    render(currenScene);
}

function resizeHandler() //애니메이션 프래임 수를 조정한다.
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    totalScrollHeight = 0;
    pixelDuration = windowHeight * 0.5;

    for( let i = 0; i < animationKeyframes.length; i++)
    {
        totalScrollHeight += pixelDuration;
    }
    totalScrollHeight += windowHeight;

    elemBody.style.height = totalScrollHeight + 'px';
}

function render(nowState)
{
    let targetElem = document.querySelectorAll('.container');

    switch(nowState)
    {
        case 0:{ // scroller - in
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[0].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[0].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[0].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 1:{ // scroller - out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[0].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[1].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[0].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';

            targetElem[1].querySelector('.imgBox').style.opacity = 0;
        }break;
        case 2:{ // contents0 - 1
            targetElem[0].querySelector('.scrolldown').style.opacity = 0;

            let opacityVal, moveVal, imgSq;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            let testImgBox = document.querySelector("#mainImgBox");
            //console.log(testImgBox);
            opacityVal = calcAni(animationKeyframes[2].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[2].animationVal.imgMove);
            imgSq = calcAni(animationKeyframes[2].animationVal.imgChange);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';

            testImgBox.src = images[Math.round(imgSq)];
        }break;
        case 3:{ // contents0 - 2
            let imgSq;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            let testImgBox = document.querySelector("#mainImgBox");
            //console.log(testImgBox);
            imgSq = calcAni(animationKeyframes[3].animationVal.imgChange);
            scrollAniElem[0].style.opacity = 1;

            // targetElem[1].querySelector('.textBox').style.opacity = 0;
            // targetElem[1].querySelector('.textBox').style.opacity = 0;

            testImgBox.src = images[Math.round(imgSq)];
        }break;
        case 4:{ // contents0 - 3
            let opacityVal, moveVal, imgSq;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            let testImgBox = document.querySelector("#mainImgBox");
            //console.log(testImgBox);
            opacityVal = calcAni(animationKeyframes[4].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[4].animationVal.imgMove);
            imgSq = calcAni(animationKeyframes[4].animationVal.imgChange);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';

            testImgBox.src = images[Math.round(imgSq)];

            targetElem[2].querySelector('.textBox').style.opacity = 0;
        }break;
        case 5:{ // contentsA in
            targetElem[1].querySelector('.imgBox').style.opacity = 0;
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[2].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[5].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[5].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
           // targetElem[1].querySelector('.textBox').style.opacity = 0;
        }break;
        case 6:{ // contentsA out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[2].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[6].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[6].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
            targetElem[3].querySelector('.intro').style.opacity = 0;
        }break;
        case 7:{ // contentsB in 
            targetElem[2].querySelector('.textBox').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[3].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[7].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[7].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 8:{ // contentsB out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[3].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[8].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[8].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
            targetElem[4].querySelector('.intro2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[4].querySelector('.intro2_2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[4].querySelector('.intro2_3').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */

            // let timeVal;
            // let scrollAniElem = targetElem[2].querySelectorAll('.sa');
            // timeVal = calcAni(animationKeyframes[4].animationVal.time);
            
            // let myVideo = document.querySelector('#myVideo');
            // myVideo.currentTime = timeVal;
        }break;
        case 9:{ // contentsC in
            targetElem[3].querySelector('.intro').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveValA, moveValB, moveValC;
            let scrollAniElem = targetElem[4].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[9].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[9].animationVal.textBox); 
            moveValB = calcAni(animationKeyframes[9].animationVal.textBox); 
            moveValC = calcAni(animationKeyframes[9].animationVal.textBox2); 
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';

        }break;
        case 10:{ // contentsC out
            let opacityVal, moveValA, moveValB, moveValC;
            let scrollAniElem = targetElem[4].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[10].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[10].animationVal.textBox); 
            moveValB = calcAni(animationKeyframes[10].animationVal.textBox); 
            moveValC = calcAni(animationKeyframes[10].animationVal.textBox2); 
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';
            targetElem[5].querySelector('.expense').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 11:{ // contentsD in
            targetElem[4].querySelector('.intro2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[4].querySelector('.intro2_2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[4].querySelector('.intro2_3').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[5].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[11].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[11].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 12:{ // contentsD out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[5].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[12].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[12].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
            targetElem[6].querySelector('.world').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 13:{ // contentsE in
            targetElem[5].querySelector('.expense').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[6].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[13].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[13].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 14:{ // contentsE out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[6].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[14].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[14].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
            targetElem[7].querySelector('.death').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 15:{ // contentsF in
            targetElem[6].querySelector('.world').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveValA, moveValB, moveValC;
            let scrollAniElem = targetElem[7].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[15].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[15].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[15].animationVal.textBox);
            moveValC = calcAni(animationKeyframes[15].animationVal.textBox2);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';
        }break;
        case 16:{ // contentsF out
            let opacityVal, moveValA, moveValB, moveValC;
            let scrollAniElem = targetElem[7].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[16].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[16].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[16].animationVal.textBox);
            moveValC = calcAni(animationKeyframes[16].animationVal.textBox2);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';
            targetElem[8].querySelector('.return').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 17:{ // contentsG in
            targetElem[7].querySelector('.death').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[7].querySelector('.death2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[7].querySelector('.death3').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[8].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[17].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[17].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 18:{ // contentsG out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[8].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[18].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[18].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
            targetElem[9].querySelector('.fence1').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[9].querySelector('.fence2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 19:{ // contentsH in
            targetElem[8].querySelector('.return').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveValA, moveValB;
            let scrollAniElem = targetElem[9].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[19].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[19].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[19].animationVal.textBox2);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateX(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
        }break;
        case 20:{ // contentsH out
            let opacityVal, moveValA, moveValB;
            let scrollAniElem = targetElem[9].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[20].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[20].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[20].animationVal.textBox2);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateX(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            targetElem[10].querySelector('.preserve1').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[10].querySelector('.preserve2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[10].querySelector('.preserve3').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */

        }break;
        case 21:{ // contentsI in
            targetElem[9].querySelector('.fence1').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[9].querySelector('.fence2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveValA, moveValB, moveValC;
            let scrollAniElem = targetElem[10].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[21].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[21].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[21].animationVal.textBox2);
            moveValC = calcAni(animationKeyframes[21].animationVal.textBox3);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';
        }break;
        case 22:{ // contentsI out
            let opacityVal, moveValA, moveValB, moveValC;
            let scrollAniElem = targetElem[10].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[22].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[22].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[22].animationVal.textBox2);
            moveValC = calcAni(animationKeyframes[22].animationVal.textBox3);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';
            targetElem[11].querySelector('.environ').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 23:{ // contentsJ in
            targetElem[10].querySelector('.preserve1').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[10].querySelector('.preserve2').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            targetElem[10].querySelector('.preserve3').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[11].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[23].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[23].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
        case 24:{ // contentsJ out
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[11].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[24].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[24].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
            targetElem[12].querySelector('.thought').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
        }break;
        case 25:{ // contentsK in
            targetElem[11].querySelector('.environ').style.opacity = 0; /* 스크롤 빠르게 하면 안보이게 해주는 코드 */
            let opacityVal, moveVal;
            let scrollAniElem = targetElem[12].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[25].animationVal.opacity);
            moveVal = calcAni(animationKeyframes[25].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveVal + 'px)';
        }break;
    }
}

function calcAni(value)
{
    return( relativeScrollY / pixelDuration) * (value[1] - value[0]) + value[0];
}

init();
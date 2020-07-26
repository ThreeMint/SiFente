const banner = document.querySelector('.banner');
const banner_header = document.querySelector('.banner-header');
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');
const navbar2 = document.querySelector('#navbar2');
// 防抖函数
function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 顶部菜单显示
let isMenuShow = true;; //不显示
window.addEventListener('resize', function () {
  if (window.innerWidth <= 768) {
    isMenuShow = true;
    // navbar.style.display = 'none';
    navbar2.style.display = 'none';
  } else {
    isMenuShow = false;
    // navbar.classList.remove("animate__animated", "animate__fadeInDown", "animate__fadeOutUp");
    // navbar.style.display = '';
    navbar2.style.display = '';
  }
})

menuBtn.addEventListener('click', function () {
  if (!isMenuShow) {
    navbar2.classList.remove("animate__fadeInDown");
    navbar2.classList.add("animate__animated", "animate__fadeOutUp")
    // navbar.style.display = 'none';
    setTimeout(() => {
      navbar2.style.display = 'none';
    }, 500)
    isMenuShow = true;
  } else {
    navbar2.classList.remove("animate__fadeOutUp");
    navbar2.classList.add("animate__animated", "animate__fadeInDown")
    navbar2.style.display = 'block';

    isMenuShow = false;
  }
})

// 轮播图
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const imageSlider = document.querySelector(".image-slider");

const slides = document.querySelectorAll(".slider");
// 当前正在播放的幻灯片
var currentIndex = 0;
// 播放方向，前进或后退。false后退，true前进
var forward = true;
// 自动播放间隔，5秒
var interval = 5000;
next.addEventListener("click", handleNextClicked);
prev.addEventListener("click", handlePrevClicked);

// 鼠标事件
function mouseEvent(element) {
  // 鼠标移入停止播放
  element.addEventListener("mouseenter", function () {
    console.log(111);
    clearInterval(slider_timer);
    slider_timer = null; //释放，清楚定时器
  });
  // 鼠标移出继续播放
  element.addEventListener("mouseleave", function () {
    //开启定时器
    slider_timer = setInterval(forward ? handleNextClicked : handlePrevClicked, interval);
  });
}
// next,prev停止轮播
mouseEvent(next);
mouseEvent(prev);

// 自动播放
var slider_timer = setInterval(forward ? handleNextClicked : handlePrevClicked, interval);

function handleNextClicked() {
  let current = slides[currentIndex];
  current.classList.remove("current");
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  slides[currentIndex].classList.add("current");
}

function handlePrevClicked() {
  let current = slides[currentIndex];
  current.classList.remove("current");
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  slides[currentIndex].classList.add("current");
}

// back to top
//动画函数
//obj,目标对象  target，目标位置    
function animate(obj, target, callback) {
  //解决：先清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    //步长值写道定时器的里面
    var step = (target - window.pageYOffset) / 10;
    //需要判断条件,正的往大了取整，负的往小了取整
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (window.pageYOffset == target) {
      //停止定时器
      clearInterval(obj.timer);
      // 回调函数写到定时器结束里面
      if (callback) {
        callback();
      }
    }
    window.scroll(0, window.pageYOffset + step);
  }, 15);
}

const backTop = document.querySelector('.back-content');
backTop.addEventListener('click', function () {
  animate(window, 0);
});
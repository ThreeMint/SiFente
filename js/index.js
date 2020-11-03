const banner = document.querySelector('.banner');
const banner_header = document.querySelector('.banner-header');
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');
const navbar2 = document.querySelector('#navbar2');

menuBtn.addEventListener('click', function () {
  navbar2.classList.toggle("navbar-move");
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
var interval = 4000;
next.addEventListener("click", handleNextClicked);
prev.addEventListener("click", handlePrevClicked);

// 鼠标事件
function mouseEvent(element) {
  // 鼠标移入停止播放
  element.addEventListener("mouseenter", function () {
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

const fullbar = document.querySelector('.fullbar');
const fullbarItem = document.querySelector('.fullbar-item');
const review = document.querySelector('.reviews');
const reviewCount = document.querySelector('#comment-count .title-number');
let cHeight = document.documentElement.clientHeight;
let finished = true;//scroll事件中，执行一次标记
document.addEventListener('scroll', (e) => {
  let sTop = document.documentElement.scrollTop;

  let fheight = fullbar.offsetTop - (cHeight * 0.75);
  if (sTop >= fheight) {
    fullbarItem.classList.add("fullbar-show");
  }

  let reviewHeight = review.offsetTop - (cHeight * 0.5);
  if (finished && sTop >= reviewHeight) {
    finished = false;
    DynamicNumber.show("co-count", 3016);
  }
})


/**
 * 在指定的 DOM 元素中动态显示数值
 * 作者：triplestudio@sina.com
 *
 * @param elementId :  DOM 元素ID
 * @param number  :  数值
 */
var DynamicNumber = {};
DynamicNumber.NumberList = {};
DynamicNumber.show = function (elementId, number) {
  // 1. 已建立过对象直接调用
  var dynaNum = this.NumberList[elementId];
  if (dynaNum) {
   dynaNum.step = 0;
   dynaNum.desNumber = number;
   dynaNum.render();
   return;
  }
  // 2. 创建动态数字绘制对象
  dynaNum = new function (_elementId) {
   this.elementId = _elementId;
   this.preNumber = 0; // 变化过程值
   this.desNumber = 0; // 目标数值，最终显示值
   this.step = 0;  // 变化步长，支持正向反向
   // 绘制过程
   this.render = function () {
    // （1）结束条件
    if (this.preNumber == this.desNumber) {
     this.step = 0;
     return;
    }
    // （2）步长设置（计划 2 秒完成 40*50=2000）
    if (this.step == 0) {
     this.step = Math.round((this.desNumber - this.preNumber) / 40);
     if (this.step == 0) this.step = (this.desNumber - this.preNumber > 0) ? 1 : -1;
    }
    // （3）走一步
    this.preNumber += this.step;
    if (this.step < 0) {
     if (this.preNumber < this.desNumber) this.preNumber = this.desNumber;
    } else {
     if (this.preNumber > this.desNumber) this.preNumber = this.desNumber;
    }
    // （4）显示
    document.getElementById(this.elementId).innerHTML = this.preNumber;
    // （5）每秒绘制 20 次（非精确值）
     var _this = this;
     setTimeout(function () {
       _this.render();
     }, 50);
   };
  } (elementId);
  // 3. 登记绑定元素ID 
  DynamicNumber.NumberList[elementId] = dynaNum;
  // 4. 调用绘制
  dynaNum.step = 0;
  dynaNum.desNumber = number;
  dynaNum.render();
};

// setInterval(function () { 
//   DynamicNumber.show("co-count", DynamicNumber.NumberList["co-count"].desNumber + 300);
// }, 5000);
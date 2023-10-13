const pen = document.getElementById("pen");
const pencheck = document.getElementById("pencheck");
const eraser = document.getElementById("eraser");
const erasercheck = document.getElementById("erasercheck");
const reset = document.getElementById("reset");

const board = document.getElementById("board");
const bodyall = document.getElementById("main");

const colorButton = document.getElementById("colorButton");
const colorpicker = document.getElementById("colorpicker");
const colorBlock = document.getElementById("colorBlock");
const colorStrip = document.getElementById("colorStrip");

const colorcode = document.querySelector(".colorcode");

const ctxB = board.getContext("2d");
let painting = false;

//colorButton을 눌렀을 때 colorpicker가 보이도록
//colorButton가 아닌 것을 눌렀을 때 colorpicker가 사라지도록
function showcolorpicker(e) {
  const target = e.target;

  if(target.id == "colorButton" 
    || target.id == "colorpicker" 
    || target.id == "colorBlock" 
    || target.id == "colorStrip"
    || target.classList.contains("colorcode"))
    {
      colorpicker.style.display = "block";
    } 
    else {
      colorpicker.style.display = "none";
    }
}

bodyall.addEventListener("click", showcolorpicker);


//colorpicker 구현
  const ctx1 = colorBlock.getContext("2d");
  const width1 = colorBlock.width;
  const height1 = colorBlock.height;

  const ctx2 = colorStrip.getContext('2d');
  const width2 = colorStrip.width;
  const height2 = colorStrip.height;

  let x = 0;
  let y = 0;
  let drag = false;
  let rgbaColor = "rgba(255,0,0,1)";

  ctx1.rect(0, 0, width1, height1); //사각형을 추가
  fillGradient();

  ctx2.rect(0, 0, width2, height2); //사각형을 추가

  //colorStrip 그라데이션
  let grd1 = ctx2.createLinearGradient(0, 0, 0, height2);
  grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
  grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
  grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
  grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
  grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
  grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
  grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
  ctx2.fillStyle = grd1;
  ctx2.fill();

  //colorStrip을 눌렀을 때 colorBlock의 그라데이션 값 변경 함수
  function click(e) {
    x = e.offsetX;
    y = e.offsetY;
    let imageData = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = `rgba(${imageData[0]},${imageData[1]},${imageData[2]},1)`;
    fillGradient();
  }

  //colorBlock 그라데이션 함수
  function fillGradient() {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width1, height1);

    let grdWhite = ctx1.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, "rgba(255,255,255,1)");
    grdWhite.addColorStop(1, "rgba(255,255,255,0)");
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);

    let grdBlack = ctx1.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, "rgba(0,0,0,0)");
    grdBlack.addColorStop(1, "rgba(0,0,0,1)");
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
  }

  //colorBlock에서 컬러를 가져오는 함수
  function changeColor(e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = `rgba(${imageData[0]},${imageData[1]},${imageData[2]},1)`;
    colorButton.style.backgroundColor = rgbaColor;
    ctxB.strokeStyle = rgbaColor;
  }

  function mousedown(e) {
    drag = true;
    changeColor(e);
  }

  function mousemove(e) {
    if (drag) {
      changeColor(e);
    }
  }

  function mouseup(e) {
    drag = false;
  }

  colorStrip.addEventListener("click", click, false);

  colorBlock.addEventListener("mousedown", mousedown, false);
  colorBlock.addEventListener("mouseup", mouseup, false);
  colorBlock.addEventListener("mousemove", mousemove, false);

//RGB값, Hex값 적용하기
// const input = document.querySelectorAll("input");
// const R = document.getElementById("R");
// const G = document.getElementById("G");
// const B = document.getElementById("B");
// const hex = document.getElementById("hex");

// function inputColorcode () {
//   if(Number(R.value) && Number(R.value) >= 0 && Number(R.value) <= 255) {
//     console.log(R.value)
//     // rgbaColor = `rgba(${R.value},${G.value},${B.value},1)`;
//   } else {
//     console.log("err")
//   }
// }

// R.addEventListener("change", () => {
//   console.log(input.id)
//   inputColorcode();
// })


//그림판 구현

//그리기 구현
pencheck.addEventListener("click", () => {
  console.log(pencheck.checked);

  if(pencheck.checked == true){
    ctxB.lineWidth = 2.5;
  
    function stopPainting () {
      painting = false;
    }

    function startPainting () {
      painting = true;
    }

    function onMouseMove (e) {
      x = e.offsetX;
      y = e.offsetY;
      if(!painting){
        ctxB.beginPath();
        ctxB.moveTo(x, y);
      } else {
        ctxB.lineTo(x,y);
        ctxB.stroke();
      }
    }

    function onMouseDown(){
      painting = true;
    }
    
    pen.style.backgroundColor = "#e0e0e0"

    board.addEventListener("mousemove", onMouseMove);
    board.addEventListener("mousedown", startPainting);
    board.addEventListener("mouseup", stopPainting);
    board.addEventListener("mouseleave", stopPainting);
    
  }else {
    pen.style.backgroundColor = "#ffffff"
    board.removeEventListener("mousemove", onMouseMove);
    board.removeEventListener("mousedown", startPainting);
    board.removeEventListener("mouseup", stopPainting);
    board.removeEventListener("mouseleave", stopPainting);
  }
})



erasercheck.addEventListener("click", () => {
  console.log(erasercheck.checked)
  if(erasercheck.checked == true){
    eraser.style.backgroundColor = "#e0e0e0"
    ctxB.strokeStyle = "white"
    ctxB.lineWidth = 10;
  }else {
    eraser.style.backgroundColor = "#ffffff"
  }
})

reset.addEventListener("click", () => {
  ctxB.clearRect(0, 0, board.width, board.height)
})



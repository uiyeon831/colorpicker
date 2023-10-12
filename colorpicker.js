const pen = document.getElementById("pen");
const eraser = document.getElementById("eraser");
const reset = document.getElementById("reset");

const board = document.getElementById("board");
const bodyall = document.getElementById("main");

const colorButton = document.getElementById("colorButton");
const colorpicker = document.getElementById("colorpicker");
const colorBlock = document.getElementById("colorBlock");
const colorStrip = document.getElementById("colorStrip");


//colorButton을 눌렀을 때 colorpicker가 보이도록
//colorButton가 아닌 것을 눌렀을 때 colorpicker가 사라지도록
bodyall.addEventListener("click", e => {
  const target = e.target;

  if(target.id == "colorButton" 
    || target.id == "colorpicker" 
    || target.id == "colorBlock" 
    || target.id == "colorStrip")
    {
      colorpicker.style.display = "block";
    } 
    else {
      colorpicker.style.display = "none";
    }
})


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
  ctx2.fill(); // 고정

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



// pen.addEventListener("click", )

// eraser.addEventListener("click", )

// reset.addEventListener("click", )


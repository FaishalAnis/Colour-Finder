const clrPkrBtn = document.getElementById("color-picker-section");
const hexData = document.getElementById("hex-data");
const rgbData = document.getElementById("rgb-data");
const colorDataContainer = document.getElementById("color-data");
const pickerIcon = document.getElementById("picker-icon");
const pickedColorContainer = document.getElementsByClassName(
  "color-picker-section"
)[0];
// console.log(pickedColorContainer);

console.log(colorDataContainer);

const eyeDropper = new EyeDropper();

clrPkrBtn.addEventListener("click", () => {
  eyeDropper
    .open()
    .then((result) => {
      updateColorValues(result);
    })
    .catch((e) => {
      console.error(e);
    });
});

colorDataContainer.addEventListener("click", function (event) {
  //coping color values
  //    console.log(event);
  const value_el = event.target;
  //   console.log(event.target);
  navigator.clipboard.writeText(value_el.innerText);
  //   console.log("copied: ", value_el.innerText);
});

function updateColorValues(result) {
  const hexValue = result.sRGBHex;
  //updating color in colour picker container
  pickedColorContainer.style.backgroundColor = hexValue;
  //force ui to repaint to encounter ui not updating issue
  pickedColorContainer.offsetHeight;

  //updating hex
  hexData.innerText = hexValue;

  //updating rgb
  let rgbVal = getRGB(hexValue);
  rgbData.innerText = `rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`;

  //add border to pickedColorContainer if hex is #ffffff or white
  //   console.log(hexValue);

  if (hexValue == "#ffffff") {
    console.log("white detected");
    pickedColorContainer.style.border = "1px black solid";
    pickerIcon.style.color = "black";
  } else {
    pickedColorContainer.style.border = "none";
    pickerIcon.style.color = "white";
  }
}

function getRGB(hex) {
  //parsing hex to rgb
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
}

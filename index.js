const colorSelector = document.getElementById("color-selector");
const getColor = document.getElementById("get-color");
const schemes = document.getElementById("schemes");

getColor.addEventListener("click", () => {
  const colorHex = colorSelector.value.slice(1);
  const modeScheme = schemes.value.toLowerCase();

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${modeScheme}&count=5`
  )
    .then((res) => res.json())
    .then((data) => getColors(data));

  const getColors = (arr) => {
    let html = "";
    let counter = 0;
    for (color of arr.colors) {
      counter++;
      html += /*html*/ `
            <div class="returned-color" style="
            background-color: ${color.hex.value};
            ">
            <button id="hex${counter}" class="color-select-btn" data-color="${color.hex.value}">${color.hex.value}</button>
            </div>
        `;
    }
    container.innerHTML = html;
  };
});

document.addEventListener("click", (e) => {
  if (e.target.id.includes("hex")) {
    navigator.clipboard
      .writeText(e.target.dataset.color)
      .then(() => {
        alert(`${e.target.dataset.color} successfully copied`);
      })
      .catch(() => {
        alert("something went wrong");
      });
  }
});

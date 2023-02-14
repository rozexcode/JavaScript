const letters = "ABCDEFGHAIJKLMNOQPRSTUWXYZ";

const navContainer = document.querySelector(".nav__container");
const navLinks = document.querySelectorAll(".nav__link");
const navSelectionArea = document.querySelectorAll(".nav__item");

const matrixContainer = document.querySelector(".matrix__container");

let navNumber = 0;

const effect = function (word) {
  let iterations = 0;

  const interval = setInterval(() => {
    word.innerText = word.innerText
      .split("")
      .map((_, i) => {
        if (i < iterations + 1) {
          return word.dataset.value[i];
        }
        return letters[Math.floor(Math.random() * 25)];
      })
      .join("");

    if (iterations >= word.dataset.value.length) clearInterval(interval);

    iterations += 1 / 3;
  }, 30);
};

const select = function (e) {
  e.closest(".nav__item").children[0].innerText = ">";
  e.closest(".nav__item").children[1].classList.add("nav__selected");
};
const unSelect = function (e) {
  e.closest(".nav__item").children[0].innerText = "";
  e.closest(".nav__item").children[1].classList.remove("nav__selected");
};

const navSelection = function () {
  navLinks.forEach((link) => unSelect(link));
  select(navLinks[navNumber - 1]);
};

// handle events
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    unSelect(e.target);
    select(e.target);
    effect(e.target);
  }
};

navContainer.addEventListener("mouseover", (e) => handleHover(e));

navContainer.addEventListener("mouseout", function (e) {
  navLinks.forEach((link) => unSelect(link));
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    if (navNumber < navContainer.children.length) navNumber += 1;
    else navNumber = 1;
    effect(navLinks[navNumber - 1]);
    navSelection();
  }
  if (e.key === "ArrowUp") {
    if (navNumber > 1) navNumber -= 1;
    else navNumber = navContainer.children.length;
    effect(navLinks[navNumber - 1]);
    navSelection();
  }
});

// matrix

// solution 1
// create a column of symbols
// make it out of random symbols
// make right color theme to them
// multiply the effect
// spread it in random way across the dedicated section

// 1 column: generate a x number of symbols, which are hidden
//

// solution 2
// create a MOCK column of <span>Symbol</span> kind of characters,
// that are iterable and adjustable, can change class, color and innerText
// apply the matrix effect, but not on whole column but only on specific letters - SPANS

const symbols =
  "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!@#$%^&*()+-={}[]|;:'/?`~";

const randomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const random = function (max) {
  return Math.floor(Math.random() * max);
};

const generateRandomSymbol = function () {
  return symbols.at(random(20));
};

const generateSingleColumnOfLetters = function (length) {
  let output = "";
  for (let i = 0; i < length; i++) {
    output += generateRandomSymbol();
  }
  return output;
};

const matrixSampleText = generateSingleColumnOfLetters(40);

const matrixColumn = document.querySelector(".matrix__column");

const matrixArr = matrixSampleText.split("").map((letter) => {
  return `<span class="matrix__letter matrix__letter--hidden" style="color: green;">${letter}</span>`;
});

// console.log(matrixArr);

// console.log(matrixArr.join(""));
// createMatrixColumn();

let matrixArr2 = "";

const matrixColumnTemplateIterated = function (q) {
  for (let i = 0; i < q; i++) {
    matrixArr2 += `<span class="matrix__letter matrix__letter--hidden" data-index="${i}">I</span>`;
  }
};

// column lenght
matrixColumnTemplateIterated(60);
console.log(matrixArr2);

const matrixColumnTemplate = `<div class="matrix__column">${matrixArr2}</div>`;
// const matrixColumnTemplate = `<div class="matrix__column">IIII</div>`;

const matrixContainerMax = matrixContainer.getBoundingClientRect().width / 20;

const createMockColumns = function () {
  matrixContainer.insertAdjacentHTML("beforeend", matrixColumnTemplate);
};

for (let i = 0; i <= 50; i++) {
  createMockColumns();
}

// for (let i = 0; i < matrixContainer.childNodes[3].childElementCount; i++) {
//   setTimeout(() => {
//     matrixContainer.childNodes[3].children[i].innerText = "X";
//     matrixContainer.childNodes[3].children[i].style.color = "green";
//   }, 500 * i);
// }

// for (let i = 0; i < matrixContainer.childNodes[3].childElementCount; i++) {
//   setTimeout(() => {
//     matrixContainer.childNodes[3].children[i + 20].innerText = "X";
//     matrixContainer.childNodes[3].children[i + 20].style.color = "green";
//   }, 500 * i);
// }

// matrixContainer.insertAdjacentHTML("beforeend", matrixColumnTemplate);
// matrixContainer.insertAdjacentHTML("beforeend", matrixColumnTemplate);
// matrixContainer.insertAdjacentHTML("beforeend", matrixColumnTemplate);

// matrixColumn.insertAdjacentHTML("afterbegin", matrixArr.join(""));

// matrixEffect(matrixColumn);

const matrixCreateColumns = function () {
  const singleHTMLsymbolColumn = generateSingleColumnOfLetters(
    randomMinMax(30, 40)
  )
    .split("")
    .map((letter) => {
      return `<span class="matrix__letter matrix__letter--hidden">${letter}</span>`;
    });

  // singleHTMLsymbolColumn.unshift(`<div class="matrix__column">`);
  // singleHTMLsymbolColumn.push(`</div>`);
  singleHTMLsymbolColumn.join("");
  // console.log(singleHTMLsymbolColumn.join(""));
  // matrixContainer.insertAdjacentHTML(
  //   "beforeend",
  //   singleHTMLsymbolColumn.join("")
  // );
  return singleHTMLsymbolColumn;
  // return singleHTMLsymbolColumn.join(""); //ZMIANA TERAZ
};

console.log(matrixCreateColumns().join());
let i = 0;
// while (i < 30) {
//   // matrixContainer.children[5].innerHTML = "<span>k</span>";
//   // console.log(matrixContainer.childNodes[5]);
//   // // console.log(matrixContainer.childNodes[5].closest);
//   // i++;
// }

// matrixContainer.childNodes[5].innerHTML = matrixCreateColumns().join("");
// console.log(matrixContainer.childNodes[5]);

// setTimeout(() => {
//   matrixContainer.childNodes.forEach((column) => {
//     matrixEffect(column);
//   });
// }, 100);

// const matrixEffect = function (matrixColumn) {

//   matrixColumn.childNodes.forEach((child, i, arr) => {
//     setTimeout(function () {
//       if (i <= arr.length - 1) {
//         //behind
//         if (i > 0) {
//           matrixColumn.childNodes[i - 1].style.color = "rgb(12, 235, 38)";
//           matrixColumn.childNodes[i - 1].classList.add("matrix__letter--temp1");
//         }
//         //first
//         if (child.classList.contains("matrix__letter--hidden"))
//           child.classList.remove("matrix__letter--hidden");
//         child.style.color = "white";
//       }
//       if (i === arr.length - 1) {
//         child.style.color = "rgb(12, 235, 38)";
//         child.classList.add("matrix__letter--temp1");
//       }
//     }, i * 200);
//   });
// };

let fin = false;

const matrixEffect = function (matrixColumn, timer) {
  for (let i = 0; i < matrixColumn.childElementCount; i++) {
    setTimeout(function () {
      // console.log(i);
      //behind
      if (i > 0) {
        matrixColumn.childNodes[i - 1].style.color = "rgb(12, 235, 38)";
        matrixColumn.childNodes[i - 1].classList.add("matrix__letter--temp1");
      }
      //first
      // if (matrixColumn.childNodes[i]?.classList)
      matrixColumn.childNodes[i].classList.remove("matrix__letter--hidden");
      matrixColumn.childNodes[i].innerHTML = generateRandomSymbol();
      matrixColumn.childNodes[i].style.color = "white";

      if (i === matrixColumn.childElementCount - 1) {
        matrixColumn;
        i = 0;
        // console.log("finito" + i);
        matrixColumn.childNodes.forEach((symbol) => {
          symbol.classList.remove("matrix__letter--temp1");
          symbol.classList.add("matrix__letter--hidden");
        });
      }
      // console.log(matrixColumn.childNodes[i]);
    }, i * timer);
  }
};

// setInterval(() => matrixEffect(matrixContainer.childNodes[3], 200), 10000);
// matrixEffect(matrixContainer.childNodes[3], 200);

// matrixContainer.childNodes.forEach((child) => {
//   matrixEffect(child, 200);
//   setInterval(() => matrixEffect(child, 200), 12000);
// });

matrixContainer.childNodes.forEach((child) => {
  matrixEffect(child, randomMinMax(0.5, 0.7) * 1000); // generates a random number between 0 and 1000
  setInterval(
    () => matrixEffect(child, Math.floor(Math.random() * 1000)),
    6000
  );
});

// matrixEffect(matrixContainer.childNodes[3], 200);
// matrixEffect(matrixContainer.childNodes[5]);
// calculate number of columns based of viewport
// create mock/class columns for matrixColumns to be put in
//

// matrixContainer.childNodes[5].innerHTML = matrixCreateColumns();

let introMatrix = 0;

// matrixContainer.addEventListener("mouseover", function (e) {
//   console.log(e.target.lastElementChild);
//   const letter = e.target.lastElementChild;
//   const column = e.target.closest(".matrix__column");
//   console.log(column);
// });

// for (let i = 1; i < 10000; i++) {
//   setTimeout(() => {
//     // let 5 = random(matrixContainerMax);
//     matrixContainer.childNodes[5].innerHTML = matrixCreateColumns();
//     matrixEffect(matrixContainer.childNodes[5]);
//   }, 1000 * i);
// }

// matrixContainer.childNodes[5].innerHTML = matrixCreateColumns();
// matrixEffect(matrixContainer.childNodes[5]);

// setTimeout(() => {
//   matrixContainer.childNodes[5].innerHTML += matrixCreateColumns();
//   matrixEffect(matrixContainer.childNodes[5]);
// }, 2000);

// while (introMatrix < 1000) {
//   setTimeout(() => {
//     matrixContainer.childNodes[random(matrixContainerMax)].innerHTML =
//       matrixCreateColumns();
//     matrixEffect(matrixContainer.childNodes[random(matrixContainerMax)]);
//   }, 30 * introMatrix);
//   introMatrix++;
// }

// matrixContainer.childNodes.forEach((column, i) => {
//   setTimeout(() => {
//     column.innerHTML = matrixCreateColumns();
//     matrixEffect(column);
//   }, 50 * i);
// });

// setTimeout(() => {
//   matrixContainer.childNodes.forEach((column, i) => {
//     setTimeout(() => {
//       column.innerHTML = matrixCreateColumns();
//       matrixEffect(column);
//     }, 50 * i);
//   });
// }, 5000);

// matrixEffect(matrixContainer.childNodes[]);

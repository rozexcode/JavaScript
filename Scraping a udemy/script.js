"use strict";

// get number of total hours from a udemy course

const infoArray = document.querySelectorAll(".section--progress--3R0vk");

const timesArr = Array.from(infoArray).map((text) => {
  let time = text.querySelector("span").innerText;
  return time.slice(time.indexOf("|") + 2);
});

const timeMap = timesArr.map((time) => {
  const splitTimes = time.match(/\d+/g);
  if (splitTimes.length === 2) return splitTimes;
  else return ["0", splitTimes].flat();
});

console.log(timeMap);
let hours = 0;
let minutes = 0;

timeMap.forEach((time) => {
  hours += +time[0];
  minutes += +time[1];
});

console.log(
  `${hours + Math.trunc(minutes / 60)} hours, ${minutes % 60} minutes `
);

// testing

// const infoArray = document.querySelectorAll(".section--progress--3R0vk");

// let text1 = infoArray[0].querySelector("span").innerText;
// text1.slice(text1.indexOf("|") + 2); // 22 min

// const times = Array.from(infoArray).map(text => {
//   return text.querySelector('span').innerText;
// });

// infoArray.forEach(text => {
//   console.log(text.querySelector('span').innerText);
// });

// infoArray.forEach(text => {
//   let time = text.querySelector('span').innerText;
//   console.log(time.slice(time.indexOf('|') + 2));
// });

// const times = Array.from(infoArray).map((text) => {
//   let time = text.querySelector("span").innerText;
//   return time.slice(time.indexOf("|") + 2);
// });

// const timesArr = [
//   "22 min",
//   "4 godz. 41 min",
//   "4 godz. 33 min",
//   "4 min",
//   "2 godz. 4 min",
//   "56 min",
//   "3 godz. 54 min",
//   "3 godz. 7 min",
//   "5 godz. 34 min",
//   "2 godz. 37 min",
//   "6 godz. 8 min",
//   "3 godz. 15 min",
//   "5 godz. 18 min",
//   "4 godz. 10 min",
//   "3 godz. 59 min",
//   "5 godz. 1 min",
//   "3 godz. 50 min",
//   "8 godz. 23 min",
//   "59 min",
//   "4 min",
//   "1 min",
// ];

// console.log(Number.parseInt(timesArr[1], 10));

// const thenum = timesArr[2].match(/\d+/g);
// console.log(thenum);

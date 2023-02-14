"use strict";
/*
https://www.codewars.com/kata/6344701cd748a12b99c0dbc4/train/javascript

The set of words is given. Words are joined if the last letter of one word and the first letter of another word are the same. Return true if all words of the set can be combined into one word. Each word can and must be used only once. Otherwise return false.

Input
Array of 3 to 7 words of random length. No capital letters.

Example true
Set: excavate, endure, desire, screen, theater, excess, night.
Millipede: desirE EndurE ExcavatE ExcesS ScreeN NighT Theater.

Example false
Set: trade, pole, view, grave, ladder, mushroom, president.
Millipede: presidenT Trade. */

let aaatest2 = "test";

const testfunction = function () {
  var aaatest = "test";
};

function solution(input) {
  const words = input.slice();
  const checkArr = [];
  const newArr = [];
  let key = "";
  let matching = "";
  let indexOfKey = "";
  const resetCheckArr = function () {
    checkArr.length = 0;
    checkArr.push(...words);
  };

  resetCheckArr();
  console.log(checkArr);

  newArr[0] = checkArr[0];
  for (let i = 0; i <= words.length; i++) {
    key = newArr.at(-1);
    console.log(`check ARR --- [${checkArr}]`);
    console.log(`KEY ${key}`);

    // find KEY in checkArr and delete it
    indexOfKey = checkArr.findIndex((word) => word === key);
    indexOfKey !== -1 ? checkArr.splice(indexOfKey, 1) : "";

    console.log(checkArr.filter((word) => key.at(-1) === word.at(0)));

    // find MATCHING
    matching = checkArr.find((word) => key.at(-1) === word.at(0));
    console.log(`MATCHING: ${matching}`);

    if (matching) newArr.push(matching);
    else break;

    // matching ? newArr.push(matching) : console.log("no matching");
  }
  console.log(newArr);
  console.log(checkArr);
}

solution(["east", "e", "e", "t", "t", "e", "time"]);

let girl = 21;

const test = function () {
  console.log(girl);
  girl = 20;
};
test();

// solution([
//   "excavate",
//   "endure",
//   "desire",
//   "excess",
//   "night",
//   "screen",
//   "theater",
// ]);
// solution(['endure', 'screen', 'excess']);
// solution(['excess', 'screen', 'endure']);

// THOUGHT PROCESS AND CONTEMPLATING MY LIFE CHOICES

// APPROACH 3
//
// KEY = newArr[-1]
// delete KEY from checkArr
// add KEY to newArr
// in checkArr find MATCHING for KEY
// find returns matching ? add matching to newArr : break;

//screen', 'endure', 'excess', 'yeti', 'norway',

// SCREEN -> endure', 'excess', 'yeti', 'norway' .find(n) -> NORWAY
// [screen, norway] -> norway .find(y) -> yeti
// [screen, norway, yeti] -> yeti .find(i) -> push do arr [[screen, norway, yeti], __]
// ENDURE .find(e) -> excess
// [endure, excess]  excess .find(s) -> screen
// [endure, excess, screen, norway, yeti]

//excavate, desire, screen, theater, excess, night, endure

// [excavate] -> excess
// [excavate,excess] .find(s) -> screen
// [excavate,excess,screen] .find(n) -> night

// no, dog, on, good

// [no] .find(o) - on
// [no, on] find(n) - null
// [dog] .find(g) - good
//

//APPROACH 1

// screen - norway -> dodaj do array [[screen, norway]]
// endure - excess -> dodaj do array [[screen, norway], [endure, excess]]
// excess - screen -> dodaj do array [[screen, norway], [endure, excess],[excess, screen]]
// yeti - nie ma
// norway - yeti ->  dodaj do array [[screen, norway], [endure, excess],[excess, screen], [norway, yeti]]

// APPROACH 2
// excavate, desire, screen, theater, excess, night, endure

// 1: true // EXCAVATE, desire, screen, theater, excess, night, endure
// 2: true // excavate, DESIRE, screen, theater, excess, night, endure
// 3: true // excavate, desire, SCREEN, theater, excess, night, endure
// 4: fals // excavate, desire, screen, THEATER, excess, night, endure
// 5: true // excavate, desire, screen, theater, EXCESS, night, endure
// 6: true // excavate, desire, screen, theater, excess, NIGHT, endure
// 7: true // excavate, desire, screen, theater, excess, night, ENDURE

//trade, pole, view, grave, ladder, mushroom, president.

// 1: fals // TRADE, pole, view, grave, ladder, mushroom, president
// 2: fals // trade, POLE, view, grave, ladder, mushroom, president
// 3: fals // trade, pole, VIEW, grave, ladder, mushroom, president
// 4: fals // trade, pole, view, GRAVE, ladder, mushroom, president
// 5: fals // trade, pole, view, grave, LADDER, mushroom, president
// 6: fals // trade, pole, view, grave, ladder, MUSHROOM, president
// 7: true // trade, pole, view, grave, ladder, mushroom, PRESIDENT

// east, e, e, t, t, e, time

// 1: true // EAST, e, e, t, t, e, time
// 2: true // east, E, e, t, t, e, time
// 3: true // east, e, E, t, t, e, time
// 4: true // east, e, e, T, t, e, time
// 5: true // east, e, e, t, T, e, time
// 6: true // east, e, e, t, t, E, time
// 7: true // east, e, e, t, t, e, TIME

//no, dog, on, good

// 1: true //NO, dog, on, good
// 2: TRUE //no, DOG, on, good
// 3: TRUE//no, dog, ON, good
// 4:  TRUE//no, dog, on, GOOD
// true should == false

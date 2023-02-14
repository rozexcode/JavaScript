"use strict";

function parseInt(string) {
  console.log(`Input: ${string}`);
  const dictionary = new Map([
    [0, ["zero"]],
    [1, ["one"]],
    [2, ["two"]],
    [3, ["three"]],
    [4, ["four"]],
    [5, ["five"]],
    [6, ["six"]],
    [7, ["seven"]],
    [8, ["eight"]],
    [9, ["nine"]],
    [10, ["ten"]],
    [11, ["eleven"]],
    [12, ["twelwe"]],
    [13, ["thirteen"]],
    [14, ["fourteen"]],
    [15, ["fifteen"]],
    [16, ["sixteen"]],
    [17, ["seventeen"]],
    [18, ["eighteen"]],
    [19, ["nineteen"]],
    [20, ["twenty"]],
    [30, ["thirty"]],
    [40, ["forty"]],
    [50, ["fifty"]],
    [60, ["sixty"]],
    [70, ["seventy"]],
    [80, ["eighty"]],
    [90, ["ninety"]],
    ["00", ["hundred"]],
    ["000", ["thousand"]],
    ["000000", ["milion"]],
  ]);
  const splitLiteralNums = string.split(" ");
  const literalNums = [];
  splitLiteralNums.forEach((num) => {
    if (num.includes("-")) {
      literalNums.push(num.split("-"));
    } else {
      literalNums.push([num]);
    }
  });

  console.log(literalNums);

  // console.log(literalNums2[0][0][0]);
  const numeralNumArr = [];
  let output = [];
  for (const [index, num] of literalNums.entries()) {
    output = [];
    for (let i = 0; i < num.length; i++) {
      for (const [key, [value]] of dictionary) {
        if (num[i] === value) {
          output.push(key);
        }
      }
    }
    numeralNumArr.push(output);
  }

  console.log(numeralNumArr);

  for (const [index, [...num]] of numeralNumArr.entries()) {
    if (num.length > 0) {
      const sum = num.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      numeralNumArr[index] = sum;
    }
  }
  console.log(numeralNumArr);

  for (let i = 0; i <= numeralNumArr.length; i++) {
    if (typeof numeralNumArr[i + 1] === "string") {
      numeralNumArr[i] = Number(`${numeralNumArr[i]}${numeralNumArr[i + 1]}`);
    }
  }
  console.log(numeralNumArr);

  const refactoredNumeralNums = numeralNumArr.filter(
    (word) => typeof word === "number"
  );

  const sum = refactoredNumeralNums.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  console.log(sum);

  // const numeralNums = [];
  // console.log(`literal numbers: ${literalNums}`);
  // literalNums.forEach((word, i) => {
  //   for (const [key, [value]] of dictionary) {
  //     if (word === value) numeralNums.push(key);
  //   }
  // });
  // console.log(numeralNums);
  // for (let i = 0; i <= numeralNums.length; i++) {
  //   if (typeof numeralNums[i + 1] === "string") {
  //     numeralNums[i] = Number(`${numeralNums[i]}${numeralNums[i + 1]}`);
  //   }
  // }
  // const refactoredNumeralNums = numeralNums.filter(
  //   (word) => typeof word === "number"
  // );
  // console.log(`After refactor: ${refactoredNumeralNums}`);

  // const sum = refactoredNumeralNums.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue
  // );

  // console.log(`sum: ${sum}`);
  return;
}

const input = "twenty-six thousand three hundred and fifty-nine";

parseInt("one milion three-hundred-thousand three hundred and fifty-nine");
parseInt("one milion three-hundred thousand three hundred and fifty-nine");

//zrobic slownik/konwerter na numbery
//rozdzielic/pogrupowac one, ten, one hunder, one thousand, ten thousand, one hunderd thousand, one milion

//
// eleven  11
//twenty-one 21
// two hundred seventy-six 200 76
// five thousand eleven 5000 11
// ten thousand seventy-seven 10000 77
// ten thousand eight hundred seventy seven 10000 800 77 -> 10000+800+70+7 = 10877
// twenty-six thousand three hundred and fifty-nine  26 1000 300 59
//seven thousand five hundred thirty-three
// 7 1000 5 100 33

//if comtains hundred

// ten thousand eight hundred seventy-seven
// jesli item po prawej == hundred || thousand || milion -> przypisz odpowiednią ilosc 0
// musi przerabiac konkretne zwroty na liczby, a nastepnie sumowac je grupami

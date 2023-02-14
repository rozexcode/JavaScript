"use strict";
// In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.

// Any digit followed by all zeros: 100, 90000
// Every digit is the same number: 1111
// The digits are sequential, incementing†: 1234
// The digits are sequential, decrementing‡: 4321
// The digits are a palindrome: 1221 or 73837
// The digits match one of the values in the awesomePhrases array
// const givenNumber = "1335";

function isInteresting(num, awesomePhrases) {
  const awesomePh = awesomePhrases;
  const attemptRange = 2;
  let outputNumber = 0;
  let output = "";
  num = Number(num);

  const tests = {
    isZeros: (num) => /^[0]+$/.test(num.slice(1)),
    isSame: (num, i) => num[0] === num[i] || false,
    incrementing: (num, i) => {
      i--;

      if (num.slice(-1) == 0 && num.slice(-2, -1) == 9) {
        // num = num[0] - 1).concat(num);
        num = num.slice(0, -1);
        num = num[0] - 1 + num;
      }

      return Number(num[i]) === Number(num[i + 1]) - 1 || false;
    },

    decrementing: (num, i) => {
      i--;
      return Number(num[i]) === Number(num[i + 1]) + 1 || false;
    },
    //890

    isPalindrome: (num) => num === num.split("").reverse().join("") || false,

    isAwesomePhrase: (num) => awesomePh.includes(Number(num)),
  };

  const attempt = function (num) {
    // console.log(`TRY ${num}`);
    let output = "";
    for (const [testName, test] of Object.entries(tests)) {
      for (let i = 1; i < num.length; i++) {
        output = test(num, i);

        if (output === false) break;
      }
      // console.log(`${testName}: ${output}`);
      if (output === true) break;
    }

    // console.log(`${num}: ${output}`);
    return output;
  };

  if (attempt(num.toString()) === true && num > 99) {
    outputNumber = 2;
  } else if (num >= 98) {
    for (let i = 1; i <= attemptRange; i++) {
      output =
        attempt(Number(num - Number(i)).toString()) ||
        attempt(Number(num + Number(i)).toString());
      if (output === true) {
        outputNumber = 1;
        break;
      }
    }
  }
  console.log(`${num}: ${outputNumber}`);
  return outputNumber;
}

isInteresting(97, [1337, 6969]);

// isLastZeroRef: function (num, i) {
//   let outputZero = "";
//   if (num.slice(-1) == 0 && num.slice(-2, -1) == 9) {
//     if (i < num.slice(0, -1)) {
//       console.log((outputZero = tests.incrementing(num.slice(0, -1), i)));
//       return (outputZero = tests.incrementing(num.slice(0, -1), i));
//     }
//   }
// },

// const incrementing = (num, i) => {
//   i--;
//   // console.log(Number(num[i]) === Number(num[i + 1]));
//   return Number(num[i]) === Number(num[i + 1]) - 1 || false;
// };

// const num = "67890";
// const testnum =
//   num.slice(-1) == 0 && num.slice(-2, -1) == 9 ? num.slice(0, -1) : num;

// let output = "";
// for (let i = 1; i < testnum.length; i++) {
//   output = incrementing(testnum, i);
//   if (output === false) break;
// }
// console.log(output);

// isInteresting(7890, [1337, 256]); // 0

// const incrementing = (num, i) => {
//   i--;

//   if (
//     num.slice(-1) == 0 &&
//     num.slice(-2, -1) == 9 &&
//     i == num.lastIndexOf("0")
//   ) {
//     console.log(`${i} Mam to`);
//   }
//   return Number(num[i]) === Number(num[i + 1]) - 1 || false;
// };

// const num = "7890";
// let output = "";
// for (let i = 0; i < num.length - 1; i++) {
//   output = Number(num[i]) === Number(num[i + 1]) - 1 || false;
//   console.log(`pierwsza:${i} ${output} ${Number(num[i + 1]) - 1}`);
//   if (
//     num.slice(-1) == 0 &&
//     num.slice(-2, -1) == 9 &&
//     i - 1 == Number(num.lastIndexOf("0")) - 1
//   ) {
//     output = true;
//     console.log(`PO IFIE`);
//   }
//   console.log(output);
// }

//if [-1] i [-2] == 9,0 => delete last digit
//if ([-1] == 9 && [-2] == 0) && i == current pos: return true

// const isZeros = (num) => /^[0]+$/.test(num.slice(1));

// //Refactor
// const isSameRef = (num, i) => num[0] === num[i] || false;

// //Refactor
// const incrementingRef = (num, i) => {
//   i--;
//   return Number(num[i]) === Number(num[i + 1]) - 1 || false;
// };

// //refactor
// const decrementingRef = (num, i) => {
//   i--;
//   return Number(num[i]) === Number(num[i + 1]) + 1 || false;
// };

// const isPalindrome = (num) => num === num.split("").reverse().join("") || false;

// //original
// const isSame = (num) => {
//   let output = "";
//   const firstNum = num[0];
//   for (let i = 1; i < num.length; i++) {
//     output = firstNum === num[i] || false;
//     if (output === false) break;
//   }
//   return output;
// };

// //original
// const incrementing = (num) => {
//   let output = "";
//   for (let i = 0; i < num.length - 1; i++) {
//     output = Number(num[i]) === Number(num[i + 1]) - 1 || false;
//     // console.log(`${output} ${num[i]} ${num[i + 1] - 1}`);
//     if (output === false) break;
//   }
//   return output;
// };

// //original
// const decrementing = (num) => {
//   let output = "";
//   for (let i = 0; i < num.length - 1; i++) {
//     output = Number(num[i]) === Number(num[i + 1]) + 1 || false;
//     // console.log(`${output} ${num[i]} ${Number(num[i + 1]) + 1}`);
//     if (output === false) break;
//   }
//   return output;
// };

// console.log("123321".slice(-3, -2));

// console.log("12345".split("").reverse().join(""));

// const password = "grekjh2";

// const alphanumeric1 = function (password) {
//   let output = "";
//   if (password === password.replace(/ /g, "")) {
//     password.length > 1 ? (output = true) : (output = false);
//   } else {
//     output = false;
//   }
//   return output;
// };

// console.log(alphanumeric(password));

// const alphanumeric = (password) =>
//   password.length > 1 &&
//   password &&
//   password === password.replace(/ /g, "") &&
//   password === password.replace("_", "") &&
//   /[a-zA-Z]/.test(password);

// console.log(alphanumeric(password));
// console.log(/[a-z]/i);

// const validSymbols = [/[a-zA-Z]/, /^\d+$/];

// // console.log(/^[a-zA-Z]+$/);

// const alphanumeric = (password) => /^[a-zA-Z\d]+$/.test(password);
// console.log(/^\d+$/.test(password));

// console.log(
//   password.length > 1 && password && password === password.replace(/ /g, "")
// );

// recieve camelCase string, function should convert it to normal string
"use strict";

const toNormalString = function (string) {
  const output = string
    .split("")
    .map((letter) => {
      if (letter === letter.toUpperCase()) return " " + letter.toLowerCase();
      else return letter;
    })
    .join("");

  return output.at(0).toUpperCase() + output.slice(1);
};

console.log(toNormalString("helloGuysItsYaBoi"));

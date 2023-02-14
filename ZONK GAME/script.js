"use strict";

function getScore(dice) {
  const diceSorted = dice.sort();
  console.log(diceSorted);

  const straight = function (input, points) {
    // 1+3, 2+2, 3+1 === same ? true : false
    const arr = input.reverse().map((num, i) => {
      return num + i;
    });
    return arr.every((num) => num === arr[0]) ? points : "Zonk";
  };

  const threePars = function (input, points) {
    if (input.length < 6) return "Zonk";

    // xx yy zz, xxx
  };

  const countEveryApperance = function (input) {
    console.log(
      input.reduce((acc, cur) => {
        if (cur === 2) acc + 1;
      })
    );

    //   console.log(
    //     input.map((num) => {
    //       input.reduce((acc, cur) => {
    //         if (cur === num) return (acc += 1);
    //       });
    //     })
    //   );
  };

  countEveryApperance(diceSorted);

  // console.log(straight(diceSorted, 1000));
  console.log(threePars(diceSorted, 750));
}

getScore([2, 2, 3, 3, 6, 6]);

/* Zonk is addictive dice game. In each round player rolls 6 dice. Then (s)he composes combinations from them. Each combination gives certain points.

Then player can take one or more dice combinations to his hand and re-roll remaining dice or save his score. Dice in player's hand won't be taken into account in subsequent rolls.

If no combinations can be composed - situation is called "zonk". Player thrown zonk loses all points in this round and next player moves. So it's player decision when to reroll and when to stop and save his score.

Your task is simple - just evaluate current roll and return maximum number of points can be scored from it. If no combinations can be made - function must return string "Zonk" (without quotes).

here are different variations of Zonk. In this kata, we will use most common table of combinations:

Combination	Example roll	Points
Straight (1,2,3,4,5 and 6)	6 3 1 2 5 4	1000 points
Three pairs of any dice	2 2 4 4 1 1	750 points
Three of 1	1 4 1 1	1000 points
Three of 2	2 3 4 2 2	200 points
Three of 3	3 4 3 6 3 2	300 points
Three of 4	4 4 4	400 points
Three of 5	2 5 5 5 4	500 points
Three of 6	6 6 2 6	600 points
Four of a kind	1 1 1 1 4 6	2 × Three-of-a-kind score (in example, 2000 pts)
Five of a kind	5 5 5 4 5 5	3 × Three-of-a-kind score (in example, 1500 pts)
Six of a kind	4 4 4 4 4 4	4 × Three-of-a-kind score (in example, 1600 pts)
Every 1	4 3 1 2 2	100 points
Every 5	5 2 6	50 points


*/

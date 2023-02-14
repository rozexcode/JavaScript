//Wikipedia: The regular paperfolding sequence, also known as the dragon curve sequence, is an infinite automatic sequence of 0s and 1s defined as the limit of inserting an alternating sequence of 1s and 0s around and between the terms of the previous sequence:

// 1

// 1 1 0

// 1 1 0 1 1 0 0

// 1 1 0 1 1 0 0 1 1 1 0 0 1 0 0

function* paperFold() {
  let arr = [[1]];

  while (true) {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        item.unshift([1]);
        item.push([0]);
      }
    });

    arr = arr.flat();
    yield arr.join("");
  }
}

const take = (n) =>
  function* (gen) {
    while (n-- > 0) yield gen.next().value;
  };
console.log(Array.from(take(3)(paperFold())));

//////////////////

// Planning and thinking*

// starts with 1 = KEY
// -1 from KEY.append(1)
// 1 from KEY.append(0)

// arr = [[1]]
// flat arr = [ 1 ]

// unshift([1]) && push([0])
// = [[1] 1 [0]]

// //[1 1 0]
// i    i
// [[1] 1 [0]]

// [[110] 1 [100]]
// i  i   i  i

// [[110] 1 [100] 1 [110] 0 [100]]
//   i i     i i     i i     i i

// [ [[1] 1 [0]] 1 [[1] 0 [0]] ]

// [[1]  1   [0] 1   [1] 0 [0]   1 [1]    1      [0]  0 [1]  0  [0]]
// [110] 1 [100] 1 [110] 0 [100] 1 [110] [110] [100] 0 [110] 0 [100]

// const arr1 = [[[1], 1, [0]], 1, [[1], 0, [0]]];
// [[1] 1 [0] 1 [1] 0 [0]]

// console.log(arr1.flat());

// arr1.flat().forEach(item => {
//   if (Array.isArray(item)) {
//     item.unshift([1]);
//     item.push([0]);
//   }
// });

// console.log(arr1.flat().flat());

// const paperFold = function (max) {
//   let arr = [[1]];

//   for (let i = 0; i < max; i++) {
//     arr.forEach(item => {
//       if (Array.isArray(item)) {
//         item.unshift([1]);
//         item.push([0]);
//       }
//     });

//     arr = arr.flat();
//     console.log(arr);
//   }
//   console.log(arr.join(''));
//   return arr.join('');
// };

// console.log(paperFold(2));

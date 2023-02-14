'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    let html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/////////////////////////////////////////////////

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));

const movementsDescriptions = movements.map((mov, i, arr) => {
  return `Movement ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(mov)}`;
});

const createUserNames = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserNames(accounts);

const withdrawals = movements.filter(mov => mov < 0);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const max = movements.reduce((acc, curr) => {
  if (acc > curr) return acc;
  else return curr;
}, movements[0]);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(interest => (interest * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      console.log(arr);
      return interest >= 1;
    })
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// const calcDisplayWithdraw = function (movements) {
//   const outcome = movements
//     .filter(mov => mov < 0)
//     .reduce((acc, curr) => acc + curr, 0);
//   labelSumOut.textContent = `${Math.abs(outcome)}€`;
// };

// const calcInterest = function (account) {
//   const interest = account.movements
//     .filter(mov => mov > 0)
//     .map(interest => (interest * account.interestRate) / 100)
//     .filter((interest, i, arr) => {
//       console.log(arr);
//       return interest >= 1;
//     })
//     .reduce((acc, curr) => acc + curr, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

let currentAccount = '';
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => inputLoginUsername.value === acc.username
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

//transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferToAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    transferToAcc &&
    currentAccount.balance >= amount &&
    transferToAcc?.username !== currentAccount.username
  ) {
    console.log('transfer valid');
    currentAccount.movements.push(-amount);
    transferToAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked');
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    inputCloseUsername.value = inputClosePin.value = '';

    //del account
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  //100         //10
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

const calcAverageHumanAge = function (dogsAge) {
  const humansAge = dogsAge.map(age => {
    if (age <= 2) return age * 2;
    else return 16 + age * 4;
  });

  const adultDogs = humansAge.filter(age => age >= 18);

  const avgHumanAge = adultDogs.reduce(
    (acc, curr, _, arr) => acc + curr / arr.length,
    0
  );

  console.log(humansAge);
  console.log(adultDogs);

  console.log(avgHumanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const calcAverageHumanAgeChain = dogsAge => {
  return dogsAge
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);
};

console.log(calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]));

const totalDeposit = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, curr) => acc + curr, 0);
console.log(totalDeposit);

//
//

function squareDigits(num) {
  return Number(
    num
      .toString()
      .split('')
      .map(num => num * num)
      .join('')
  );
}

console.log(squareDigits(91));

const arr = [[[1], 2, 3], 4, 5, [6, 7], 8];
console.log(arr.flat(-1));

const accountMovements = accounts.map(acc => acc.movements);

const allMovements = accountMovements.flat();
const overallBalance = allMovements.reduce((acc, curr) => acc + curr, 0);
console.log(overallBalance);

// flat
const overallBalanceChain = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, curr) => acc + curr, 0);

console.log(overallBalanceChain);

//flatMap

const overallBalanceChain2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);

console.log(overallBalanceChain2);

console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

//rosnąco
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

console.log(movements);

//malejąco
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(movements);

movements.sort((a, b) => a - b);
movements.sort((a, b) => b - a);

console.log(movements);

// const randomDiceRolls = Array.from({ length: 100 }, (a, b) =>
//   Math.trunc(Math.random() * (6 - 1) + 1)
// );

// console.log(randomDiceRolls);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')) //map() function inside .from()
  );
  console.log(movementsUI);
});

const bankDepositSum = accounts
  .flatMap(mov => mov.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);

//counting elements in array
console.log(accounts.flatMap(mov => mov.movements));
const numDeposits1000 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1000);

//getting new objects from .reduce()
const { deposits, withdrawals2 } = accounts
  .flatMap(mov => mov.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals2'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals2: 0 }
  );

console.log(deposits, withdrawals2);

const toTitleCase = function (title) {
  const exeptions = ['a', 'and', 'an', 'the', 'with', 'but', 'or', 'on'];

  const Capitalize = function (word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exeptions.includes(word) ? word : Capitalize(word)))
    .join(' ');
  return Capitalize(titleCase);
};

console.log(toTitleCase('This is a very nice title'));
console.log(toTitleCase('An amazing title or something'));
console.log(toTitleCase('and SOMETHING on the nice screen'));

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀 */

console.log('---------------------------------------');

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }`
);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too Little`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const okayFood = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);

console.log(okayFood);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsCopy);

console.log('-----------------');
/*
The set of words is given. Words are joined if the last letter of one word and the first letter of another word are the same. Return true if all words of the set can be combined into one word. Each word can and must be used only once. Otherwise return false.

Input
Array of 3 to 7 words of random length. No capital letters.

Example true
Set: excavate, endure, desire, screen, theater, excess, night.
Millipede: desirE EndurE ExcavatE ExcesS ScreeN NighT Theater.

Example false
Set: trade, pole, view, grave, ladder, mushroom, president.
Millipede: presidenT Trade. */

function solution(words) {
  const wordsCopy = words.slice();
  const wordsLetters = wordsCopy.map(word => word.at(0) + word.at(-1));
  console.log(wordsLetters);
  const testWord = 'ms';
  wordsLetters.forEach(word => {
    console.log(wordsLetters.find(letter => letter.at(0) === word.at(-1)));
  });

  console.log(`${wordsLetters} --`);
}

solution(['screen', 'endure', 'excess']);
// solution(['endure', 'screen', 'excess']);
// solution(['excess', 'screen', 'endure']);
// /https://www.codewars.com/kata/6344701cd748a12b99c0dbc4/train/javascript

// wez x wyraz, dodaj do NewArr
// usun x wyraz z checkArr
// w checkArr znajdz wyraz - (y) do ktoego pasuje x
// TRUE: dodaj y do NewArr, x=y
//

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

// screen - norway -> dodaj do array [[screen, norway]]
// endure - excess -> dodaj do array [[screen, norway], [endure, excess]]
// excess - screen -> dodaj do array [[screen, norway], [endure, excess],[excess, screen]]
// yeti - nie ma
// norway - yeti ->  dodaj do array [[screen, norway], [endure, excess],[excess, screen], [norway, yeti]]

// Rozmyslanie 2
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

// no, dog, on, good

// [no] .find(o) - on
// [no, on] find(n) - null
// [dog] .find(g) - good
//

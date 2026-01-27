// const getFirstElement = <T>(array:T[]):T => {
//   return array[0]
// }
//
// // Пример 1: Массив чисел
// const numbers = [1, 2, 3, 4, 5]
// console.log(getFirstElement(numbers)) // 1
//
// // Пример 2: Массив строк
// const words = ["hello", "world", "typescript"]
// console.log(getFirstElement(words)) // 'hello'


// const filterArray1 = (array:number[ ], predicate:(arg:number)=>boolean):number[] => {
//   // code
//   return array.filter(predicate);
// }
//
// const filterArray2 = (array: string[], predicate: (arg: string) => boolean): string[] => {
//   // code
//   return array.filter(predicate)
// }
//
// const filterArray = <T>(array: T[], predicate: (arg: T) => boolean): T[] => {
//   // code
//   return array.filter(predicate)
// }
//
// // Пример 1: Фильтрация чисел
// const numbers = [1, 2, 3, 4, 5]
// const isEven = (num: number) => num % 2 === 0
//
// console.log(filterArray(numbers, isEven)) // [2, 4]
//
// // Пример 2: Фильтрация строк
// const words = ['hello', 'world', 'typescript']
// const startsWithT = (word: string) => word.startsWith('t')
//
// console.log(filterArray(words, startsWithT)) // ["typescript"]


// const mapArray = () => {
//   // code
// }

// const mapArray1 = (arr:number[], transform:(arr:number)=> string) => {
//   // code
//   return arr.map(transform)
// }
//
// const mapArray2 = (arr: string[], transform: (arr: string) => number) => {
//   // code
//   return arr.map(transform)
// }

// const mapArray = <T, V>(arr: T[], transform: (arr: T) => V):V[] => {
//   return arr.map(transform)
// }
//
// // Пример 1: Преобразование чисел в строки
// const numbers = [1, 2, 3, 4]
// const transformNumberToString = (num: number) => `Number: ${num}`
//
// console.log(mapArray(numbers, transformNumberToString)) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
//
// // Пример 2: Преобразование строк в их длины
// const words = ['hello', 'world', 'typescript']
// const getLength = (word: string) => word.length
//
// console.log(mapArray(words, getLength)) // [5, 5, 10]
//
// // Пример 3: Преобразование объектов в строки
// type Person = { name: string; age: number }
// const people: Person[] = [
//   { name: 'Agnes', age: 25 },
//   { name: 'Robert', age: 30 },
// ]
// const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
//
// console.log(mapArray(people, toDescription)) // ["Agnes is 25 years old", "Robert is 30 years old"]


// const updateArray1 = (arg:string[], el:string) => {
//   // code
//   if (arg.includes(el)){
//     return arg
//   }else{
//     let newArg = []
//     newArg = [...arg, el]
//     return newArg
//   }
// }
//
// const updateArray2 = (arg: number[], el: number) => {
//   // code
//   if (arg.includes(el)) {
//     return arg
//   } else {
//     let newArg = []
//     newArg = [...arg, el]
//     return newArg
//   }
// }

// const updateArray = <T>(arg: T[], el: T):T[] => {
//   return arg.includes(el) ? [...arg] : [...arg, el]
// }
//
// // Строки
// const stringArray = ["apple", "banana", "cherry"]
// console.log(updateArray(stringArray, "banana")) // ['apple', 'banana', 'cherry']
// console.log(updateArray(stringArray, "strawberry")) // ['apple', 'banana', 'cherry', 'strawberry']
//
// // Числа
// const numberArray = [1, 2, 3]
// console.log(updateArray(numberArray, 2)) // [1, 2, 3]
// console.log(updateArray(numberArray, 4)) // [1, 2, 3, 4]
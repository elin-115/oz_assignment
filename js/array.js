// 배열 (Array)

let numbers = [1, 2, 3, 4, "10", true];

console.log(numbers[0]);
console.log(numbers.at[-1])

for (const num of numbers) {
    console.log(num);
}
numbers.slice(1, 3)
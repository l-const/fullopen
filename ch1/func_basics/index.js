class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

let p_class = Person

console.log(p_class.toString())

function hello(x) {
   return x * 10
}

let y = hello(3);
console.log("hello", y)

//fs.writeFileSync("ex.txt", "hello\n")
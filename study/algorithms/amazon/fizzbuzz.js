function fizzBuzz(n) {
    for (let i = 1; i <= n; i++){
        if (n % 15 != 0){
            console.log("FizzBuzz")
        } else if (n % 3 != 0 ) {
            console.log("Fizz")
        } else if (n % 5 != 0){
            console.log("Buzz")
        } else {
            console.log(n)
        }
    }

}

console.log(fizzBuzz(15))

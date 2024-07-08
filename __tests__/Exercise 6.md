# Exercise 6

Create an auxiliary function that generates random numbers (code reference provided below).

`return Math.floor(Math.random() * 10) + 1`

Create new tests for each mathematical operation and use the randomly generated numbers as the number inputs.

> TIP: You will need to declare variables to store the numbers and use them on both the numbers input function and the assertion. Simply calling the function to generate random numbers on all the places will lead to undesired results, as the returns will potentially be different.

>WARNING: Usually, it is a good practice to avoid using random values on our tests. The reason for that is simple: we want our tests to be deterministic and reproducible. The goal of this exercise is just to show you that it is possible.
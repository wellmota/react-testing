# React Testing

Welcome to your first steps in React Testing!

The goal of these exercises is to give you a brief introduction to Unit testing on React.

We will be using Jest and the React Testing Library as our testing tools!

# Getting Started

First of all, make sure that you're using the Node LTS version (v18.20.2)

Clone this repo and run the `npm install` command to install the dependencies.

After the dependencies have been installed, you can run `npm run dev` to check out the project on your browser.

# The Project
As the main goal of this workshop is to get started on React Testing, we will be using a simple calculator app.

It consists basically of a few "components":
- Results displayer
- Two number inputs
- Four buttons
  - Each button is attached to a specific function that gets the two numbers inserted on the inputs, does the desired mathematical operation and displays the result on the screen.

Before we dive into creating our tests, you must notice the existence of a few test-related attributes on the code.

On the `page.tsx` file (which is inside `src/app` folder), you can notice the existence of several `data-testid` attributes on different components. There are seven in total, they being:
- Result
- Number 1 Input
- Number 2 Input
- Add Button
- Subtract Button
- Multiply Button
- Divide Button

The `data-testid` plays an important role during tests, and we will get into more depth about it when the time comes. For now, you can keep in mind just that they exist and that they "ID"entify something.

Additionally, if you check the scripts on `package.json` file, you might notice a test script there. As you might infer, this script will be executed when we run `npm test` on the console. The `--watchAll` flag will tell Jest to watch all the tests and run them again if any are modified.

To finish, there's a `jest.config.ts` file in the root directory. This file is used to configure some options Jest provides us.

By setting the `dir` to ./, jest will look for test files under all folders when we run the test script.

We are also configuring our Coverage Provider as V8 (the engine Node runs on) and our test environment as JSDOM.

You can get more information about that file [here](https://jestjs.io/docs/configuration)

# Setup your Test file
Before we start writing our tests, it's important to do a proper setup. So, let's create a dedicated file specifically for our tests.

If you have explored the project structure a little bit, you might have noticed a directory called `__tests__`.

It's a convention to place your test files inside this folder.

That said, *CREATE A FILE* under the `__tests__` directory. It must end with the `.test.js` extension, as Jest will automatically look for those files when the test script is executed. You can also change `test` by `spec` and `js` by `ts` (if you are using TypeScript). You can name the file at your wish, but it's a good practice to name it after the component that will run the tests.

A few examples of how you could name your file:
- Index.test.js
- Home.test.js
- Calculator.test.js

# Writing your first Tests
## Imports
To begin writing the code for our tests we need to make a few imports.

First, import the Home component itself so we can render and interact with it in our tests.

We also need to import a few functions from the React Testing Library (`@testing-library/react`) to help us select elements, simulate user interactions and make assertions about what's on the screen. In our case, we will need to import those functions:
- fireEvent
- screen
- render
- act

We will get into details for each of these when the time comes.

Lastly, import `@testing-library/jest-dom` to provide additional assertion methods that help test the presence of elements in the DOM.

By the finish of this section, your code should look like this:

    import Home from "../src/app/page";
    import { fireEvent, screen, render, act } from "@testing-library/react";
    import "@testing-library/jest-dom";

## The Tests Suite
We begin our test file by defining a test suite. A test suite is a collection of related tests that collectively verify the functionality of a piece of code, like a component or a feature. It serves as a container for all the individual tests related to the component or feature.

To create our test Suite, we use the Jest global function `describe()`. This function takes in two arguments:
- The first is a descriptive string that tells you what the suite is testing
- The second is a function that will execute when the test is run.
You can check the Docs for this function [here](https://jestjs.io/docs/api#describename-fn).

You can set up the function argument as an arrow function.

    describe("Calculator", () => {

    })

## Your first test
For our first test, let's check if the Calculator is rendered correctly.

Inside the test suite, we can define individual tests. For that, we make use of another Jest global function: `test()`, which takes similar arguments as `describe()`: the first one is a descriptive string and the second one is a callback function containing the actual code that performs the test. `test()` is also available under the `it()` alias. You can check the Docs for that function [here](https://jestjs.io/docs/api#testname-fn-timeout).

    it("Renders the Calculator", () => {
    
    })

The first thing we need to do is render our Component in a virtual DOM. For that, we make use of a function from React Testing library: `render()`. This function takes in as argument the component we wish to render.

    it("Renders the Calculator", () => {
      render(<Home />);
    })

With our component rendered on the virtual DOM, we can start making assertions. Assertions are like checks that verify if our code is working as expected. They compare the actual outcome of our code to the expected outcome.

To make assertions, we can use even another Jest global function: `expect()`. It is used every time we want to test a value. It also gives us access several "matchers" that let us validate different things. For more information, you can check the docs for Expect [here](https://jestjs.io/docs/expect#expectvalue).

In addition, `@testing-library/jest-dom"` provides custom DOM elements for jest. You can check the full list on their [GitHub page](https://github.com/testing-library/jest-dom), but one really important is `toBeInTheDocument()`. This matcher allows us to assert whether an element is present in the document or not.

If we combine the assertion with that matcher we would have something like this:
    expect().toBeInTheDocument()
But expect what, exactly to be in the document? 🤔

This is where the imports from `@testing-library/react` will be very handy. `screen` is a global object that gives us access to the virtual DOM that was rendered by the test. We can think of it as a way to interact with the rendered output of our component.

This object also gives us access to a range of queries, one of them being `getByTestId()`. As you might imagine, this function will take in a string as the argument and will try to find the element with that string as the Test ID. It is important to notice that this argument is case-sensitive, so `Result` and `result` are different from each other.
A guide to all the available queries can be found [here](https://testing-library.com/docs/queries/about/#types-of-queries).

If you recall our code exploration, we have a bunch of `data-testid` on our components that can be used to get them and make an assertion. So, with no further ados, let's check if the Result is rendered on the screen!

    it("Renders the Calculator", () => {
      render(<Home />);
      expect(screen.getByTestId("result")).toBeInTheDocument();
    })

You can now run your first test by running `npm test` on your console.

If you followed along, your first test has run and it has passed!

## Simulating a Failing Test
As for the matchers, `expect()` also has a few modifiers. One of them is `.not`. Using this modifier will let you test the opposite of a test. You can check the Docs for the modifiers [here](https://jestjs.io/docs/expect#modifiers).

For example, were we to test if the Result is NOT rendered, we would simply need to add `.not` on our assertion:
    it("Renders the Calculator", () => {
      render(<Home />);
      expect(screen.getByTestId("result")).not.toBeInTheDocument();
    })

If you run `npm test` again, your test will fail. The system message says exactly what we would expect: that a component with the Test ID result should not be on the screen but one was found.

You can go ahead and remove the Result displayer on `page.tsx`, but make sure to undo this change before moving on to the next section.

## Simulating User Interactions
Now that we've verified our component renders correctly, let's move on to testing its functionality. Our calculator should be able to add two numbers, so we'll simulate a user performing this action.

We will create a new test within our suite and, like before, render our App:

    it("Adds Numbers", () => {
      render(<Home />)
    })

Now, we need to find the input fields where the user will enter their numbers and the "Add" button that triggers the calculation. As before, we can use `screen.getByTestId()` to locate those elements. However, this time, let's store the result of this function on variables so we can use it again later on and don't need to keep calling this function every time.

    it("Adds Numbers", () => {
      render(<Home />);
      const num1Input = screen.getByTestId("num1");
      const num2Input = screen.getByTestId("num2");
      const addBtn = screen.getByTestId("add");
    })

Now that we have our Inputs and the add Button, we can simulate a user interaction. To simulate interactions that will cause changes on the DOM, make asynchronous operations or re-render our components we must wrap them into an `act()` function.

`act()` takes in a function as its first argument and calls it to apply to the DOM. After it is executed, we can make assertions. It is, essentially, a safety measure to ensure our tests are consistent and reliable.

You should use `act()` whenever you are:
- Rendering a component
- Simulating user events
- Updating state or props
- Performing any action that might trigger a re-render or asynchronous behavior: This includes things like timers, network requests, or effects that update the DOM after the initial render.

You might notice that to render our component using `render(<Home />)` we didn't wrap it into an `act()` block. That's because, internally, the render function already does that for us. However, since we will now simulate the user events, we need to use it.

To fire the user events, we can use `fireEvent` from `@testing-library/react`. This allows us to fire DOM events. For a full list of the DOM Events and their properties, check out the library GitHub page [here](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js).

Our targets will be our inputs, and we will change their values to 2.

After that, we wish to click on the button. Since we have already stored the DOM reference on the variable "addBtn", this can be easily achieved by accessing the `click()` event.

Our code now should look like this:

    it("Adds Numbers", () => {
      render(<Home />);
      const num1Input = screen.getByTestId("num1");
      const num2Input = screen.getByTestId("num2");
      const addBtn = screen.getByTestId("add");
      act(() => {
        fireEvent.change(num1Input, { target: { value: 2 } });
        fireEvent.change(num2Input, { target: { value: 2 } });
        addBtn.click();
      })
    })

Now that we have run our interactions, we can do our assertions. Once again, let's look for the result component by its ID and let's check if its content is 4. This time, instead of simply checking if the component is visible on the page, we can use `toHaveTextContent()` to ensure that the expected value has been shown.

That said, this should be the end code for our test:

    it("Adds Numbers", () => {
      render(<Home />);
      const num1Input = screen.getByTestId("num1");
      const num2Input = screen.getByTestId("num2");
      const addBtn = screen.getByTestId("add");
      act(() => {
        fireEvent.change(num1Input, { target: { value: 2 } });
        fireEvent.change(num2Input, { target: { value: 2 } });
        addBtn.click();
      })
      const result = screen.getByTestId("result");
      expect(result).toHaveTextContent(4);
    })

You can now run the tests again and see the magic happening! Try playing a little bit with the parameters on the fireEvent and the expected result to simulate failures and other behaviors you might want.

# Exercises
On the `__tests__` folder, you will find four files with exercise instructions. Do your best and try to complete them to practice your testing skills!

# Useful Resources
- [React Testing Library Documentation](https://testing-library.com/docs/)
- [Jest Documentation](https://jestjs.io/docs/)
- [React Testing Library: User Event Examples](https://testing-library.com/docs/user-event/intro)
- [JEST-DOM](https://github.com/testing-library/jest-dom)
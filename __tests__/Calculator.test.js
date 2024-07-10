import Home from "../src/app/page"
import { fireEvent, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"


beforeEach(() => {
  render(<Home />)
})

const elementShouldRender = (element, label) => {
  const elementNode = screen.getByTestId(element)
  expect(elementNode).toBeInTheDocument()
  if (label !== undefined) {
    expect(elementNode).toHaveTextContent(label)
  }
}

const inputNumberExecution = (n1, n2, operation) => {
  const num1Input = screen.getByTestId("num1")
  const num2Input = screen.getByTestId("num2")
  const operationBtn = screen.getByTestId(operation)

  act(() => {
    fireEvent.change(num1Input, { target: { value: n1 } })
    fireEvent.change(num2Input, { target: { value: n2 } })
    operationBtn.click()
  })
}

const randomNumbers = () => {
  const num1 = Math.floor(Math.random() * 100)
  const num2 = Math.floor(Math.random() * 100)
  return { num1, num2 }
}

describe("Calculator", () => {
  it("should render the calculator components within correct labels", () => {
    const elementsOnPage = {
      result: undefined,
      num1: undefined,
      num2: undefined,
      add: "Add",
      subtract: "Subtract",
      multiply: "Multiply",
      divide: "Divide",
    }

    Object.entries(elementsOnPage).forEach(([element, label]) => {
      elementShouldRender(element, label)
    })
  })

  it("should add numbers", () => {
    inputNumberExecution(2, 2, "add")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent("4")
  })

  it("should subtract numbers", () => {
    inputNumberExecution(2, 2, "subtract")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent("0")
  })

  it("should multiply numbers", () => {
    inputNumberExecution(2, 2, "multiply")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent("4")
  })

  it("should divide numbers", () => {
    inputNumberExecution(2, 2, "divide")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent("1")
  })
})

describe("Calculator with random numbers", () => {
  const randomTestNumbers = randomNumbers()

  it("should add random numbers", () => {
    inputNumberExecution(randomTestNumbers.num1, randomTestNumbers.num2, "add")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent(
      randomTestNumbers.num1 + randomTestNumbers.num2
    )
  })

  it("should subtract random numbers", () => {
    inputNumberExecution(randomNumbers.num1, randomNumbers.num2, "subtract")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent(randomNumbers.num1 - randomNumbers.num2)
  })

  it("should multiply random numbers", () => {
    inputNumberExecution(randomNumbers.num1, randomNumbers.num2, "multiply")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent(randomNumbers.num1 * randomNumbers.num2)
  })

  it("should divide random numbers", () => {
    inputNumberExecution(randomNumbers.num1, randomNumbers.num2, "divide")

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent(randomNumbers.num1 / randomNumbers.num2)
  })
}) 

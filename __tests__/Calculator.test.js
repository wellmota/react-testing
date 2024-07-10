import Home from "../src/app/page"
import { fireEvent, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Calculator", () => {
  it("should render the calculator", () => {
    render(<Home />)
    expect(screen.getByTestId("result")).toBeInTheDocument()
    expect(screen.getByTestId("num1")).toBeInTheDocument()
    expect(screen.getByTestId("num2")).toBeInTheDocument()
    expect(screen.getByTestId("add")).toBeInTheDocument()
    expect(screen.getByTestId("subtract")).toBeInTheDocument()
    expect(screen.getByTestId("multiply")).toBeInTheDocument()
    expect(screen.getByTestId("divide")).toBeInTheDocument()
  })

  it("should render correct labels", () => {
    render(<Home />)
    expect(screen.getByTestId("add")).toHaveTextContent("Add")
    expect(screen.getByTestId("subtract")).toHaveTextContent("Subtract")
    expect(screen.getByTestId("multiply")).toHaveTextContent("Multiply")
    expect(screen.getByTestId("divide")).toHaveTextContent("Divide")
  })

  it("should add numbers", () => {
    render(<Home />)
    const num1Input = screen.getByTestId("num1")
    const num2Input = screen.getByTestId("num2")
    const addBtn = screen.getByTestId("add")

    act(() => {
      fireEvent.change(num1Input, { target: { value: 3 } })
      fireEvent.change(num2Input, { target: { value: 1 } })
      addBtn.click()
    })

    const result = screen.getByTestId("result")
    expect(result).toHaveTextContent("4")
  })
})

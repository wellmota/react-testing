import Home from "../src/app/page"
import { fireEvent, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Calculator", () => {
  it("should render the calculator", () => {
    render(<Home />)
    expect(screen.getByTestId("result")).toBeInTheDocument()
  })
})

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as dayjs from "dayjs";
import PersonalInformation from "../../components/personal-information";
describe("PersonalInformation", () => {
  test("renders the form correctly", () => {
    render(<PersonalInformation />);

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("fullName")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("dob")).toBeInTheDocument();

    // Assert that the Next button is rendered
    expect(screen.getByText("nextButton")).toBeInTheDocument();
  });

  test("disables the Next button when form is empty", () => {
    render(<PersonalInformation />);

    // Assert that the Next button is initially disabled
    expect(screen.getByText("nextButton")).toBeDisabled();
  });

  test("enables the Next button when form is filled", async () => {
    render(<PersonalInformation />);

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("fullName"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "john.doe@example.com" },
    });

    const today = dayjs().subtract(18, "year").format("DD MMMM YYYY");

    const datepicker = screen.getByLabelText("dob");
    expect(datepicker).toBeVisible();

    datepicker.click();

    const eighteenthYearAgo = dayjs().subtract(18, "year").date();
    await waitFor(
      () => {
        expect(screen.getByText(eighteenthYearAgo)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    screen.getByText(eighteenthYearAgo).click();
    await waitFor(() => {
      expect(datepicker).toHaveValue(today);
    });

    await waitFor(() => {
      expect(screen.getByText("nextButton")).toBeEnabled();
    });
  });
});

import { ThemeProvider } from "next-themes";
import { render, screen, fireEvent } from "@testing-library/react";

import { ModeToggle } from "@/components/mode-toggle";

// Mock next-themes
const mockSetTheme = jest.fn();
const mockUseTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("ModeToggle", () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it("renders the mode toggle button", () => {
    mockUseTheme.mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModeToggle />
      </ThemeProvider>
    );

    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls setTheme when clicked", () => {
    mockUseTheme.mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles between light and dark theme", () => {
    mockUseTheme.mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});

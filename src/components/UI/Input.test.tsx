import { render, screen } from "@testing-library/react";

test("renders Input component with correct props", () => {

  render(
    <div className='flex flex-col items-start w-80'>
      <label htmlFor="test" className="block text-sm/6 font-medium text-gray-900">
        Test Label
      </label>
      <input
        id="test"
        name="test"
        type="text"
        placeholder="Test Placeholder"
        className="block w-full h-10 min-w-0 grow py-1.5 pl-1 pr-3 bg-white border border-1 border-gray-300 rounded-md text-base text-gray-900 placeholder:text-gray-400"
      />
      <p className='text-xs text-red-600 whitespace-normal'>Test Error</p>
    </div>
  );

  expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  expect(screen.getByText("Test Error")).toBeInTheDocument();
});

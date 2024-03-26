// jest.setup.js
// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });

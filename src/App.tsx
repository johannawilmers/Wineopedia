import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter basename="/project1">
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <Navigation />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

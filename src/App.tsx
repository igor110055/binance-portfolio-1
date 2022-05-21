import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PortfolioLocalProvider } from "./contexts/Portfolio/PortfolioLocalProvider";
import { Dashboard } from "./components/Dashboard/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App p-4">
      <QueryClientProvider client={queryClient}>
        <PortfolioLocalProvider>
          <Dashboard />
        </PortfolioLocalProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

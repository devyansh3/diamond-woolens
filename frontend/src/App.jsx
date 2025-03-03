import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductionProvider } from "./context/ProductionContext";
import Production from "./pages/Production";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import SalesAgents from "./pages/SalesAgents";

function App() {
  return (
    <ProductionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Production />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/salesagents" element={<SalesAgents />} />
        </Routes>

        {/* <Route path="/login" element={<SignInPage />} /> */}
      </BrowserRouter>
    </ProductionProvider>
  );
}

export default App;

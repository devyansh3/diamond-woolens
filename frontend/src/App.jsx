import { BrowserRouter, Route, Routes } from "react-router-dom";
import Production from "./pages/Production";
import AddNewProduction from "./pages/AddNewProduction";
import { ProductionProvider } from "./context/ProductionContext";

function App() {
  return (
    <ProductionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Production />} />
          <Route path="/newProduction" element={<AddNewProduction />} />
        </Routes>

        {/* <Route path="/login" element={<SignInPage />} /> */}
      </BrowserRouter>
    </ProductionProvider>
  );
}

export default App;

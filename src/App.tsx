import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;

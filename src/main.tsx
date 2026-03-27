// path: src/main.tsx
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { useGalleryStore } from "./store/galleryStore";

function Root() {
  const initAuth = useGalleryStore((s) => s.initAuth);
  const fetchItems = useGalleryStore((s) => s.fetchItems);

  useEffect(() => {
    initAuth();
    fetchItems();
  }, [initAuth, fetchItems]);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);

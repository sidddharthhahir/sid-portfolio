import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SmoothScroll } from "./components/SmoothScroll";

const App = () => (
  <MotionConfig reducedMotion="user">
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SmoothScroll>
  </MotionConfig>
);

export default App;

import { RecoilRoot } from 'recoil';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Authenticate from './pages/Authenticate';
import './styles/index.css';

declare global {
  interface Window {
    gtag: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);

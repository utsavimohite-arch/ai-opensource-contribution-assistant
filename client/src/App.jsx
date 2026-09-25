import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Repositories from "./pages/Repositories";
import RepositoryAnalysis from "./pages/RepositoryAnalysis";
import Issues from "./pages/Issues";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/repository/:owner/:repo" element={<RepositoryAnalysis />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Category from "./pages/Category";
import Prompt from "./pages/Prompt";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import {ToastContainer} from "react-toastify";

function App() {
  return (
      <BrowserRouter>
        <div className="w-[393px] h-screen mx-auto overflow-hidden border bg-primary">
          <ToastContainer
              autoClose={2000}
              closeOnClick={true}
          />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/category" element={<Category />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;

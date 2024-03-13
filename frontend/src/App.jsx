import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Layout from "./components/layout"
import History from "./pages/history"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout><Home /></Layout> } />
        <Route path="/history" element={ <Layout><History /></Layout> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

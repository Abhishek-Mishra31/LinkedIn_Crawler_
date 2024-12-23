import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import ScrapState from "./context/scrapeApi/ScrapState";

function App() {
  return (
    <ScrapState>
      <div className="App">
        <Navbar />
        <Page />
        <Home />
        <Footer />
      </div>
    </ScrapState>
  );
}

export default App;

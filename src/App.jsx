import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./views/Home";
import Call from "./views/Call";

function App() {
  return (
    <>
      <Header />
      {true ? <Call /> : <Home />}
      <Footer />
    </>
  );
}

export default App;

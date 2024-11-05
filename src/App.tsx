import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Todos } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/todos" element={<Todos />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

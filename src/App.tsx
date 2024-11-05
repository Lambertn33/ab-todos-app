import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Tasks } from "./pages";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

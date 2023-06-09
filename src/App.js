import './App.css';
import { Route } from "react-router-dom";
import Create from './views/create/create';
import Detail from './views/detail/detail';
import Home from './views/home/home';
import landing from "./views/landing/landing"

function App() {
  return (
    <div className="App">      
      <Route exact path="/" component={landing} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={Detail} />
      <Route path="/create" component={Create} />
      </div>
  );
}

export default App;

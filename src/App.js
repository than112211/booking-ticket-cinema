import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header'
import Loading from './components/loading/loading';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Home from './components/homepage/home';

function App() {
  return (
    <div className="App">
      <Loading></Loading>
      <Header></Header>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;

import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header'
import Loading from './components/loading/loading';

function App() {
  return (
    <div className="App">
      <Loading></Loading>
      <Header></Header>
      <Footer></Footer>
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="container">
        <div className="app__columns">
          <div className="app__main">
            <Posts />
          </div>

          <div className="app__sidebar">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

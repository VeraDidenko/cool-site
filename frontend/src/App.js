import React, {Fragment} from 'react';
import TopMenu from './Components/TopMenu/TopMenu';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Books from './Components/Books/Books';
import About from './Components/About/About';
import Orders from './Components/Orders/Orders';
import FormInput from './Components/Form/FormInput';
import MyBooksComponent from './Components/Books/Books';

const TopMenuWithRouter = withRouter(TopMenu);

function App() {
  return (

    <Router>
        <Fragment>
          <TopMenuWithRouter />
          <Route path="/" exact component={Home} />
          <Route path="/books" exact component={MyBooksComponent} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/about" exact component={About} />
          <Route path="/form" exact component={FormInput} />
        </Fragment>
      </Router>
      
  );
}

export default App;

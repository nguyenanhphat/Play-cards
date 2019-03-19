import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import routes from './routes';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            {this.showContent(routes)}
        </div>
      </Router>
    );
  }

  showContent(routes){
    let xhtml = null;
    xhtml =
      routes &&
      routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    return <Switch>{xhtml}</Switch>;
  }
}

export default App;

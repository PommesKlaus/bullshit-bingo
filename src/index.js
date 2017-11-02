import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import './index.css';
import ProtectedRoute from './helper/protectedRoute';
import Protected from './components/protected';
import App from './components/App';
import Login from './components/Login';
import registerServiceWorker from './helper/registerServiceWorker';

const muiTheme = getMuiTheme({
  appBar: {
      color: "#37517E",
      height: 50
  },
});

const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <div>
        <Route exact={true} path='/login/' component={Login} />
        <ProtectedRoute exact={true} path='/' component={App} />
        <ProtectedRoute exact={true} path='/protected' component={Protected} />
      </div>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import ProtectedRoute from './helper/protectedRoute';
import App from './components/App';
import Login from './components/Login';
import User from './components/User';
import registerServiceWorker from './helper/registerServiceWorker';

const Root = () => (
  <Router>
    <Container>
      <Route exact={true} path='/login/' component={Login} />
      <ProtectedRoute exact={true} path='/' component={App} />
      <ProtectedRoute exact={true} path='/profile' component={User} />
    </Container>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

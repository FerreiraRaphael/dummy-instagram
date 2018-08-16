import ReactDOM from 'react-dom';
import App from './App';
import { withApolloClient } from './apolloClient';
import './index.css';

ReactDOM.render(withApolloClient(App), document.getElementById('root'));

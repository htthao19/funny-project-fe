import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from 'pages/App/App';
import { store } from 'store';
import './index.css';

const Root = () => (
	<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
		<Provider store={store}>
			<App />
		</Provider>
	</GoogleOAuthProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

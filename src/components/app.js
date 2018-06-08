import { h } from 'preact';
import Guesser from './guesser';

if (typeof window !== 'undefined') {
	const navigator = window.navigator;
	if (typeof navigator !== 'undefined') {
		if ('serviceWorker' in navigator) {
			// eslint-disable-next-line compat/compat
			const serviceWorker = navigator.serviceWorker;
			if (serviceWorker.controller) {
				serviceWorker.controller.onstatechange = function(event) {
					if (event.target.state === 'redundant') {
						window.location.reload();
					}
				};
			}
		}
	}
}

const App = () => <div id="app"><Guesser /></div>;

export default App;

import { Component, h } from 'preact';

class Footer extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<footer class="footer">
				<a class="github-button" href="https://github.com/david-szabo97/github-guesser" data-show-count="true" aria-label="Star david-szabo97/github-guesser on GitHub">Star</a>
				<script async defer src="https://buttons.github.io/buttons.js" />
				<a href="https://twitter.com/messedcode_dave?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow me on Twitter</a>
				<script async defer src="https://platform.twitter.com/widgets.js" charset="utf-8" />
			</footer>
		);
	}

}

export default Footer;
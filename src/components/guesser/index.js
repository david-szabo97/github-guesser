import { Component, h } from 'preact';
import repos from '../../data/repos';
import Repo from '../repo';
import Stats from '../stats';
import Footer from '../footer';
import texts from '../../data/texts';

let gtag = () => {};
if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
	gtag = window.gtag;
}

class Guesser extends Component {

	randomize = ({ randomizeA = true, randomizeB = true, first = false }) => {
		if (this.state.sameSelected > 0 && this.state.sameSelected%5 === 0) {
			randomizeA = randomizeB = true;
			this.setState({ sameSelected: 1 });
		} else if (Math.random() >= 0.75) {
			randomizeA = randomizeB = true;
		}

		let a = (randomizeA) ? -1 : this.state.a, b = (randomizeB) ? -1 : this.state.b;

		do {
			if (randomizeA) a = Math.floor(Math.random() * repos.length);
			if (randomizeB) b = Math.floor(Math.random() * repos.length);
		} while (a === b || repos[a].stars === repos[b].stars);

		this.setState({ a, b, counterFinished: false, highlight: false, texts: (first) ? texts.getAll(0) : texts.getRandomAll() });
	}

	onSelectA = () => {
		if (this.state.aSelected || this.state.bSelected) return;
		if (this.state.lastSelected === 'a') this.setState({ sameSelected: this.state.sameSelected + 1 });
		else this.setState({ sameSelected: 1 });
		this.setState({ lastSelected: 'a', aSelected: true, bSelected: false });
	}

	onSelectB = () => {
		if (this.state.aSelected || this.state.bSelected) return;
		if (this.state.lastSelected === 'b') this.setState({ sameSelected: this.state.sameSelected + 1 });
		else this.setState({ sameSelected: 1 });
		this.setState({ lastSelected: 'b', aSelected: false, bSelected: true });
	}

	onCounterFinished = () => {
		if (this.state.highlight) return;
		this.setState({ highlight: true });

		let { a, b } = this.state;
		if (b > a) {
			let c = a;
			a = b;
			b = c;
		}
		if (this.isWinnerSelected()) {
			gtag('event', 'metric_wins', { metric2: 1 });
			gtag('event', 'win', {
				event_category: 'result',
				event_label: repos[a].owner + '/' + repos[a].name + '<<<<<>>>>>' + repos[b].owner + '/' + repos[b].name
			});
			this.setState({ wins: this.state.wins + 1 });
		} else {
			gtag('event', 'metric_losses', { metric3: 1 });
			gtag('event', 'loss', {
				event_category: 'result',
				event_label: repos[a].owner + '/' + repos[a].name + '<<<<<>>>>>' + repos[b].owner + '/' + repos[b].name
			});
			this.setState({ losses: this.state.losses + 1 });
		}
		setTimeout(() => this.setState({ counterFinished: true }), 650);
	}

	onTransitionEndA = (e) => {
		if (e.propertyName === 'transform' && this.state.aSelected && this.state.counterFinished) {
			this.randomize({ randomizeB: false });
			this.setState({ aSelected: false, bSelected: false, counterFinished: false });
		}
	}

	onTransitionEndB = (e) => {
		if (e.propertyName === 'transform' && this.state.bSelected && this.state.counterFinished) {
			this.randomize({ randomizeA: false });
			this.setState({ aSelected: false, bSelected: false, counterFinished: false });
		}
	}

	isWinnerSelected() {
		const { a, b, aSelected, bSelected } = this.state;
		const winnerA = repos[a].stars > repos[b].stars;
		const winnerSelected = (winnerA && aSelected) || (!winnerA && bSelected);

		return winnerSelected;
	}

	isDesktop() {
		return window.innerWidth > 768;
	}

	componentDidMount() {
		gtag('event', 'metric_mounted', { metric1: 1 });
		this.state = { wins: 0, losses: 0, sameSelected: 0 };
		this.randomize({ first: true });
	}

	render(props, { a, b, aSelected, bSelected, counterFinished, highlight, wins, losses, texts }) {
		if (typeof a === 'undefined' || typeof b === 'undefined') return;
		let aStyle = {};
		let bStyle = {};
		let winnerA = repos[a].stars > repos[b].stars;

		if (aSelected) {
			if (counterFinished) {
				if (this.isDesktop()) aStyle.transform = 'scale(0) rotate(360deg)';
				else this.onTransitionEndA({ propertyName: 'transform' });
			}
		}
		if (bSelected) {
			if (counterFinished) {
				if (this.isDesktop()) bStyle.transform = 'scale(0) rotate(360deg)';
				else this.onTransitionEndB({ propertyName: 'transform' });
			}
		}

		const selected = aSelected || bSelected;
		const winnerSelected = (winnerA && aSelected) || (!winnerA && bSelected);
		const h1Text = (highlight && winnerSelected) ? texts.winner :
									 (highlight && !winnerSelected) ? texts.loser :
									 (selected) ? texts.selected :
									 texts.thinking;

		/* eslint-disable react/no-danger */
		return (
			<div>
				<h1 dangerouslySetInnerHTML={{ __html: h1Text }} />

				<Stats wins={wins} losses={losses} />

				<div class={'repos ' + ((selected) ? 'repos--active' : '')} >
					<Repo onTransitionEnd={this.onTransitionEndA} highlight={highlight} winner={winnerA}
						selected={aSelected} active={selected} style={aStyle}
						data={repos[a]} onRepoClick={this.onSelectA} onCounterFinished={this.onCounterFinished}
					/>
					<Repo onTransitionEnd={this.onTransitionEndB} highlight={highlight} winner={!winnerA}
						selected={bSelected} active={selected} style={bStyle}
						data={repos[b]} onRepoClick={this.onSelectB} onCounterFinished={this.onCounterFinished}
					/>
				</div>

				<Footer />
			</div>
		);
	}
	/* eslint-enable */
}

export default Guesser;
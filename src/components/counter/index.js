import { Component, h } from 'preact';

class Counter extends Component {

	animCb() {
		if (this.state.startTime && !this.state.finished) {
			let t = (Date.now() - this.state.startTime) / this.props.duration;
			t = (t > 1) ? 1 : (t < 0) ? 0 : t;

			let d = (--t)*t*t+1;

			let value = this.props.renderValue(this.props.start + d * (this.props.end - this.props.start));
			let finished = t === 0;
			this.setState({ value, finished }, () => {
				if (finished) {
					this.props.onFinished();
				}

				window.requestAnimationFrame(() => this.animCb());
			});

			return;
		}

		window.requestAnimationFrame(() => this.animCb());
	}

	componentDidMount() {
		this.animCb();
		this.state = { startTime: Date.now(), finished: false };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.end !== this.props.end) {
			this.setState({ startTime: Date.now(), finished: false });
		}
	}

	render(props, { value }) {
		return <span>{value}</span>;
	}

}

export default Counter;
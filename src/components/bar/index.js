const Bar = ({ values }) => (
	<div class="bar">
		{values.map(value => <span style={{ width: value.percentage * 100 + '%', background: value.color }} />)}
	</div>
);

export default Bar;
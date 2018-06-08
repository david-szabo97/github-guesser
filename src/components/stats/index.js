const Stats = ({ wins, losses }) => {
	const total = wins + losses;

	if (!wins && !losses) {
		return (
			<div class="stats">
				<div class="stats__neutral">&nbsp;</div>
			</div>
		);
	}

	return (
		<div class="stats">
			<div class="stats__wins" style={{ width: wins / total * 100 + '%' }}>{wins}</div>
			<div class="stats__losses" style={{ width: losses / total * 100 + '%' }}>{losses}</div>
		</div>
	);
};

export default Stats;
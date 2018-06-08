const RepoLanguge = ({ name, color, percentage }) => (
	<div class="repo__language">
		<div class="repo__language__color" style={{ background: color }} />
		<div class="repo__language__name">{name}</div>
		<div class="repo__language__percentage">{(percentage * 100).toFixed(1)}%</div>
	</div>
);

export default RepoLanguge;
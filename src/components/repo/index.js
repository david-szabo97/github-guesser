import RepoLanguage from './repo-language';
import Counter from '../counter';
import Bar from '../bar';

const LANGUAGE_FALLBACK_COLOR = '#ccc';

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function counterPostProcessor(x) {
	return numberWithCommas(Math.floor(x));
}

const Repo = ({ data, onRepoClick, onCounterFinished, active, selected, winner, highlight, ...props }) => {
	const { owner, name, description, languages, topics, stars } = data;

	const filteredLanguages = languages.filter(lang => lang.percentage > 0.005).slice(0, 4);

	/* eslint-disable react/no-danger */
	return (
		<div class={'repo ' + ((active) ? 'repo--active ': ' ') + ((selected) ? 'repo--selected ' : 'repo--not-selected ') + ((highlight) ? ((winner) ? 'repo--winner': 'repo--loser') : '')} onClick={onRepoClick} {...props}>
			{(active) ? <div class="repo__overlay"><Counter onFinished={onCounterFinished} start={0} end={stars} duration={1500} renderValue={counterPostProcessor} /></div> : null}
			<div class="repo__header">
				<div class="repo__owner">{owner}</div>&nbsp;/&nbsp;<div class="repo__name">{name}</div>
			</div>

			{topics.length > 0 ? (<div class="repo__topics">{topics.map(topic => <span>{topic}</span>)}</div>) : null}
			<div class="repo__description" key={data.id}>{description}</div>

			<div class="repo__languages">
				{filteredLanguages.map(lang => <RepoLanguage {...lang} color={lang.color || LANGUAGE_FALLBACK_COLOR} />)}
			</div>

			{(languages.length > 0) ? (
				<Bar values={languages.map(lang => ({ ...lang, color: lang.color || LANGUAGE_FALLBACK_COLOR }))} />
			) : null}
		</div>
	);
	/* eslint-enable */
};

export default Repo;
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config, options, helpers) => {
	const { plugin } = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0] || {};
	if (plugin) {
		plugin.options.googleAnalyticsTrackingId = process.env.GA_TRACKING_ID || null;
	}

	config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src/public`, from: `**/*` }]) );
};
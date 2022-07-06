import React from 'react';

import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Checkbox from '../Checkbox';

function init(settings) {
	const initSettings = {
		enable: false,
		...settings,
	};

	return initSettings;
}

export default function Control(props) {
	const settings = init(props.settings);

	// Set the defaults
	React.useEffect(() => {
		props.onChange(settings, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (what) => (event) => {
		const value = event.target.value;

		if (['enable'].includes(what)) {
			settings[what] = !settings[what];
		} else {
			settings[what] = value;
		}

		props.onChange(settings, false);
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				{/* Todo: Check availability */}
				<Checkbox label={<Trans>Enable</Trans>} checked={settings.enable} onChange={handleChange('enable')} />
				<Typography variant="caption">
					<Trans>It makes the channel available as an RTMP stream.</Trans>
				</Typography>
			</Grid>
		</Grid>
	);
}

Control.defaulProps = {
	settings: {},
	onChange: function (settings, automatic) {},
};

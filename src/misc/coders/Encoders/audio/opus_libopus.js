import React from 'react';

import Grid from '@mui/material/Grid';

import Audio from '../../settings/Audio';
import Helper from '../../helper';

function init(initialState) {
	const state = {
		bitrate: '64',
		...initialState,
	};

	return state;
}

function createMapping(settings, stream, skills) {
	stream = Helper.InitStream(stream);
	skills = Helper.InitSkills(skills);

	const local = ['-codec:a', 'libopus', '-b:a', `${settings.bitrate}k`, '-shortest'];

	const mapping = {
		global: [],
		local: local,
		filter: [],
	};

	return mapping;
}

function Coder({ stream = {}, settings = {}, skills = {}, onChange = function (settings, mapping) {} }) {
	settings = init(settings);
	stream = Helper.InitStream(stream);
	skills = Helper.InitSkills(skills);

	const handleChange = (newSettings) => {
		let automatic = false;
		if (!newSettings) {
			newSettings = settings;
			automatic = true;
		}

		onChange(newSettings, createMapping(newSettings, stream, skills), automatic);
	};

	const update = (what) => (event) => {
		const value = event.target.value;

		const newSettings = {
			...settings,
			[what]: value,
		};

		handleChange(newSettings);
	};

	React.useEffect(() => {
		handleChange(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Audio.Bitrate value={settings.bitrate} onChange={update('bitrate')} allowCustom />
			</Grid>
		</Grid>
	);
}

const coder = 'libopus';
const name = 'Opus (libopus)';
const codec = 'opus';
const type = 'audio';
const hwaccel = false;

function summarize(settings) {
	return `${name}, ${settings.bitrate} kbit/s`;
}

function defaults(stream, skills) {
	const settings = init({});

	return {
		settings: settings,
		mapping: createMapping(settings, stream, skills),
	};
}

export { coder, name, codec, type, hwaccel, summarize, defaults, Coder as component };

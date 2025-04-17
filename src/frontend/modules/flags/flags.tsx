import { memo } from 'react';
import { EmojiAndText } from '../../common/emojiAndText';

//https://emoji.codes/

const flagList = [
	[ 'ÖSTERREICH', 'flag_at' ],
	[ 'ITALIEN', 'flag_it' ],
	[ 'DEUTSCHLAND', 'flag_de' ],
	[ 'IRLAND', 'flag_ie' ],
	[ 'USA', 'flag_us' ],
	[ 'FRANKREICH', 'flag_fr' ],
	[ 'BRASILIEN', 'flag_br' ],
	[ 'KANADA', 'flag_ca' ],
	[ 'SCHWEIZ', 'flag_ch' ],
	[ 'SPANIEN', 'flag_es' ],
	[ 'EU', 'flag_eu' ],
	[ 'GROSSBRITTANIEN', 'flag_gb' ],
	[ 'JAPAN', 'flag_jp' ],
	[ 'SCHWEDEN', 'flag_se' ],
];


export const Flags = memo(() => {
	return <EmojiAndText list={flagList} appearText={true} />;
});
Flags.displayName = 'Flags';

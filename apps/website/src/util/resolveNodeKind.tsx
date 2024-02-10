import { VscSymbolClass } from '@react-icons/all-files/vsc/VscSymbolClass';
import { VscSymbolEnum } from '@react-icons/all-files/vsc/VscSymbolEnum';
import { VscSymbolEnumMember } from '@react-icons/all-files/vsc/VscSymbolEnumMember';
import { VscSymbolEvent } from '@react-icons/all-files/vsc/VscSymbolEvent';
import { VscSymbolInterface } from '@react-icons/all-files/vsc/VscSymbolInterface';
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod';
import { VscSymbolParameter } from '@react-icons/all-files/vsc/VscSymbolParameter';
import { VscSymbolProperty } from '@react-icons/all-files/vsc/VscSymbolProperty';
import { VscSymbolVariable } from '@react-icons/all-files/vsc/VscSymbolVariable';

export function resolveKind(item: any) {
	switch (item) {
		case 'Class':
			return <VscSymbolClass aria-hidden className="flex-shrink-0" size={24} />;
		case 'Enum':
			return <VscSymbolEnum aria-hidden className="flex-shrink-0" size={24} />;
		case 'EnumMember':
			return <VscSymbolEnumMember aria-hidden className="flex-shrink-0" size={24} />;
		case 'Interface':
			return <VscSymbolInterface aria-hidden className="flex-shrink-0" size={24} />;
		case 'Property':
			return <VscSymbolProperty aria-hidden className="flex-shrink-0" size={24} />;
		case 'TypeAlias':
			return <VscSymbolVariable aria-hidden className="flex-shrink-0" size={24} />;
		case 'Variable':
			return <VscSymbolVariable aria-hidden className="flex-shrink-0" size={24} />;
		case 'Event':
			return <VscSymbolEvent aria-hidden className="flex-shrink-0" size={24} />;
		case 'Parameter':
		case 'TypeParameter':
			return <VscSymbolParameter aria-hidden className="flex-shrink-0" size={24} />;
		default:
			return <VscSymbolMethod aria-hidden className="flex-shrink-0" size={24} />;
	}
}

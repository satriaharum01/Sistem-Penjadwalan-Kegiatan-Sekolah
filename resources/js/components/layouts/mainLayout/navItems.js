import { v4 as uuid } from 'uuid';
// Icons
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'Dashboard',
		Icon: SpeedIcon,
		href: '/admin/dashboard',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Jadwal',
		Icon: CalendarMonthIcon,
		menuChildren: [
			{
				title: 'Atur Jadwal',
				href: '/admin/jadwal/setup',
			},
			{
				title: 'Data Jadwal',
				href: '/admin/jadwal/',
			},
			{
				title: 'Data Eskul',
				href: '/admin/eskul/',
			},
		]
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Mata Pelajaran',
		Icon: MenuBookIcon,
		menuChildren: [
			{
				title: 'Data Mapel',
				href: '/admin/mapel/',
			},
			{
				title: 'Tambah Mapel',
				href: '/admin/mapel/new',
			},
		]
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Kelas',
		Icon: StackedBarChartIcon,
		href: '/admin/kelas',
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Guru',
		Icon: GroupIcon,
		href: '/admin/guru',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Agenda',
		Icon: EventNoteIcon,
		menuChildren: [
			{
				title: 'Data Agenda',
				href: '/admin/agenda',
			}
		]
	}
];

export default NAV_LINKS_CONFIG;

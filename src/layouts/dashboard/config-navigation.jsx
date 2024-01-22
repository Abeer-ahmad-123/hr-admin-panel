import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },

  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: icon('ic_lock'),
  },
  {
    title: 'channals',
    path: '/channals',
    icon: icon('ic_analytics'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

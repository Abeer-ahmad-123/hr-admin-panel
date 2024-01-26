import { Helmet } from 'react-helmet-async';

import ChannelView from 'src/sections/channel/view/index';

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> channels | Admin Panel </title>
      </Helmet>

      <ChannelView />
    </>
  );
}

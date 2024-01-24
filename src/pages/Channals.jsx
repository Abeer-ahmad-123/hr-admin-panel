import React from 'react';
import { Helmet } from 'react-helmet-async';
import ChannalView from 'src/sections/Channals/view/index';

const Channals = () => (
  <>
    <Helmet>
      <title> channals | Admin Panel </title>
    </Helmet>
    <ChannalView />
  </>
);

export default Channals;

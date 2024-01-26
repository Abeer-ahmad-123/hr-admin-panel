import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReportView from 'src/sections/Report/view/index';

const Channals = () => (
  <>
    <Helmet>
      <title> Reports | Admin Panel </title>
    </Helmet>
    <ReportView />
  </>
);

export default Channals;

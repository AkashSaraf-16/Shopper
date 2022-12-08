import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Shopper',
  description: 'Get the best deal and trendy products easily',
  keywords: 'electronics, buy electronics, cheap electroincs, quality products',
};

export default Meta;

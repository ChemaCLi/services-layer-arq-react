import React from 'react';
import { errorReporter } from './error-reporter';

export const useService = (
  service,
  {lazy = false, params, defaultDataValue} = {}
) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchQuery = async (newParams) => {
    setLoading(true);
    try {
      const result = await service(newParams || params);
      setData(result || defaultDataValue);
    } catch (error) {
      console.error(error);
      errorReporter().report(error)      
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!lazy) {
      fetchQuery();
    }
  }, [lazy]);

  return {
    data: data || defaultDataValue,
    loading,
    fetchQuery,
  };
};

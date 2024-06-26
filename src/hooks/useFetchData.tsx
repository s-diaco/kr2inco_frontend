import { useCallback, useEffect, useState } from 'react';
import { fetcher } from '../utils/axios';

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetcher(url);
      // TODO: check
      // const json = await response.json();
      // setData(json);

      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;

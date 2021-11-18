import { useState, useEffect } from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'api';

interface UseAxiosProps {
  url: string;
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';
  body?: any;
  headers?: any;
}

const useAxios = ({
  url,
  method,
  body = null,
  headers = null
}: UseAxiosProps) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios[method](url, JSON.parse(headers), JSON.parse(body))
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxios;

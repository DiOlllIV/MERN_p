import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { req, loading } = useHttp();
  const [link, setLink] = useState(null);
  const { id } = useParams();

  const getLink = useCallback( async() => {
    try {
      const fetched = await req(`/api/link/${id}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setLink(fetched);
    } catch(e) {}
  }, [token, id, req]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />
  }
  
  return(
    <>
      {(!loading && link) && <LinkCard link={link} />}
    </>
  );
};

export default DetailPage;
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, req } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback( async() => {
    try {
      const fetched = await req('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetched);
    } catch(e) {}
  }, [token, req]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />
  }

  return(
    <>
      {!loading && <LinksList links={links} />}
    </>
  );
};

export default LinksPage;
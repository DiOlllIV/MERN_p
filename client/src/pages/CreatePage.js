import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

const CreatePage = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { req } = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = async(e) => {
    if (e.key === 'Enter' ) {
      try {
        const data = await req('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${token}`
        });
        
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Enter the link"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
            style={{ marginTop: "10px" }}
          />
          <label htmlFor="link">Link for cut:</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

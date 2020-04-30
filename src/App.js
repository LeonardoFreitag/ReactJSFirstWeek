import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    function getRepositories() {
      api.get('/repositories').then((result) => {
        setRepositories(result.data);
      });
    };
    getRepositories();
  }, []);

  async function handleAddRepository() {
    // TODO
    let day = (new Date()).getTime();
    let newRep = {
      "title": `repository ${day.toString()}`,
      "url": "www.algumacoisa.com.br/etc",
      "techs": ["tech1", "tech2", "tech3"]
    }
    const response = await api.post('/repositories', newRep);
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

   function handleRemoveRepository(id) {
    // TODO
    let index = repositories.findIndex(item => item.id === id);
    if (index < 0) {
      return
    };
    api.delete(`/repositories/${id}`).then(() => {
      // if (response.status = 204) {
        let nList = repositories; //.splice(index, 1);
        nList.splice(index, 1);
        console.log(nList);
        let newList = [];
        nList.forEach((item) => {
          newList.push(item);
        });
        // console.log(newList);
        setRepositories(newList);
      // } 
    });
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => <li key={item.id}> {item.title}
                                    <button onClick={() => handleRemoveRepository(item.id)}>
                                      Remover
                                    </button>
                                  </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

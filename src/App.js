import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    try {
      const newRepositoryData = {
        title: `Repositório ${repositories.length + 1}`,
        url: "",
        techs: [],
      };

      const newRepositoryResponse = await api.post(
        "/repositories",
        newRepositoryData
      );

      setRepositories((previousRepositories) =>
        previousRepositories.concat([newRepositoryResponse.data])
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories((previousRepositories) =>
        previousRepositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    async function getAllRepositories() {
      const repositoriesResponse = await api.get("/repositories");
      setRepositories(repositoriesResponse.data);
    }

    getAllRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

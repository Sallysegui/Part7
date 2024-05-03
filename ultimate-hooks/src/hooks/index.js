import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  console.log(baseUrl);
  const [resources, setResources] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        console.log("response.data ", res.data);
        console.log(res.data);
        setResources(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  };
  const service = { create, update };
  return [resources, service];
};

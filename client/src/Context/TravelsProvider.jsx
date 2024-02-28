import { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorageUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const TravelContext = createContext();

export const TravelsProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState()
  console.log("USER", user);

  useEffect(() => {
    let tokenlocal = getLocalStorage("token");

    if (tokenlocal) {
      const { id } = jwtDecode(tokenlocal).user;

      axios
        .get(`http://localhost:3000/users/getOneUser/${id}`)
        .then((res) => {
          setUser(res.data);
          setToken(tokenlocal)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <TravelContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </TravelContext.Provider>
  );
};

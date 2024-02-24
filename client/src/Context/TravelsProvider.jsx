import { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorageUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const TravelContext = createContext();

export const TravelsProvider = ({ children }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    let tokenlocal = getLocalStorage("token");
    console.log(tokenlocal);

    if (tokenlocal) {
      const { id } = jwtDecode(tokenlocal).user;
      console.log(id);

      axios
        .get(`http://localhost:3000/users/getOneUser/${id}`)
        .then((res) => {
          console.log("res", res);
          setState({ ...state, user: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log("state del context", state);
  return (
    <TravelContext.Provider value={[state, setState]}>
      {children}
    </TravelContext.Provider>
  );
};

import { useEffect } from "react";
import { useRandomPersonQuery } from "../generated/graphql";

const useRandomPerson = () => {
  const [person, fetchPerson] = useRandomPersonQuery({
    pause: true,
  });

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);

  if (!person.data) {
    return {
      randomPerson: null,
    };
  }

  return { randomPerson: person.data.getRandomPerson, fetchPerson };
};

export default useRandomPerson;

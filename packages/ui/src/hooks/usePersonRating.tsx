import { useEffect } from "react";
import { usePersonRatingQuery } from "../generated/graphql";

const usePersonRating = (PersonID: number) => {
  const [person, fetchPerson] = usePersonRatingQuery({
    pause: true,
    variables: {
      PersonID,
    },
  });

  useEffect(() => {
    fetchPerson({ requestPolicy: "network-only" });
  }, [fetchPerson, PersonID]);

  if (!person.data) {
    return {
      averageRating: null,
      myRating: null,
      person: null,
      ratings: null,
      fetchPerson,
      fetching: person.fetching,
    };
  }

  return {
    averageRating: person.data.getPersonAverageRating,
    myRating: person.data.getMyPersonRating,
    person: person.data.getPersonFromID,
    ratings: person.data.getPersonRating,
    fetchPerson,
    fetching: person.fetching,
  };
};

export default usePersonRating;

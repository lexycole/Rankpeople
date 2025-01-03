import { useState } from "react";
import { useCreateRatingMutation } from "../generated/graphql";

const useRate = () => {
  const [value, setValue] = useState(0);
  const [personId, setPersonId] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [rating, createRatingMutation] = useCreateRatingMutation();

  const createRating = async () => {
    try {
      const response = await createRatingMutation({
        RatingInput: { feedback, personId, value },
      });
      if (!response.error) {
        return true;
      }
      throw response.error;
    } catch (error) {
      return false;
    }
  };

  return {
    value,
    feedback,
    setValue,
    setFeedback,
    personId,
    setPersonId,
    createRating,
    fetchingRating: rating.fetching,
  };
};

export default useRate;

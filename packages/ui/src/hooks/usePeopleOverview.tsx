import { useEffect } from "react";
import { useGetPeopleOverviewQuery } from "../generated/graphql";

const usePeopleOverview = () => {
  const [overview, fetchOverview] = useGetPeopleOverviewQuery({
    pause: true,
  });

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  if (!overview.data) {
    return {
      overview: undefined,
      fetchOverview,
      fetching: overview.fetching,
    };
  }

  return {
    overview: overview.data.getPeopleOverview,
    fetchOverview,
    fetching: overview.fetching,
  };
};

export default usePeopleOverview;

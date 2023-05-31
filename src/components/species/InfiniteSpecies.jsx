import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query

  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery(
      ["species"],
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastpage) => lastpage.next || undefined,
      }
    );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}

      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map((pageData) =>
          pageData.results.map((data) => (
            <Species
              key={data.name}
              name={data.name}
              language={data.language}
              averageLifespan={data.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}

import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const infiniteQuery = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastpage) => {
        return lastpage.next || undefined;
      },
    }
  );

  const { data, fetchNextPage, hasNextPage, isFetching } = infiniteQuery;

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      {data && (
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          {data?.pages.map((pageData) =>
            pageData.results.map((person) => {
              return (
                <Person
                  key={person.name}
                  name={person.name}
                  hairColor={person.hair_color}
                  eyeColor={person.eye_color}
                />
              );
            })
          )}
        </InfiniteScroll>
      )}
    </>
  );
}

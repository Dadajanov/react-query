import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { InfinitePeople } from "./components/people/InfinitePeople";
// import { Posts } from "./components/Posts/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <h1>Blog Posts</h1>
        <Posts /> */}
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default App;

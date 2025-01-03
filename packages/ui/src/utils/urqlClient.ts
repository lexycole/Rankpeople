import { 
  createClient, 
  Client, 
  ssrExchange, 
  cacheExchange as urqlCacheExchange, 
  fetchExchange as urqlFetchExchange 
} from '@urql/core';
import { URQL_BACKEND_URL } from "./constants";
import { ON_SERVER } from "@repo/environment";

export const ssrCache = ssrExchange({ isClient: !ON_SERVER });
export const client: Client = createClient({
  url: `${URQL_BACKEND_URL}/graphql`,
  exchanges: [urqlCacheExchange, ssrCache, urqlFetchExchange],
  fetchOptions: {
    credentials: "include",
  },
});

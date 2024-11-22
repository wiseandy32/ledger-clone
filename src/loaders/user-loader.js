import { fetchUserByID } from "@/lib/helpers";

export const userDetailQuery = (uid) => ({
  queryKey: ["user", uid],
  queryFn: () => fetchUserByID(uid),
});

export const userDetailsLoader = (queryClient, uid) => async () => {
  const query = userDetailQuery(uid);

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

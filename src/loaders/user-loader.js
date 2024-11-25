import { fetchUserByID } from "@/lib/helpers";
import { redirect } from "react-router-dom";

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

export const adminLoader = async () => {
  const uid = JSON.parse(localStorage.getItem("id"));
  const user = await fetchUserByID(uid);

  if (!user?.isAdmin) {
    return redirect("/user");
  }
  return null;
};

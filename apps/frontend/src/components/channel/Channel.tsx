import { useChannelQuery } from "../../services/queries";
import CreateChannel from "./CreateChannel";
import { queryClient } from "../../main";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Channel() {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useChannelQuery();
  const userData = queryClient.getQueriesData({
    queryKey: ["auth", "user"],
  })?.[0]?.[1];
  console.log(userData);
  useEffect(() => {
    if (!userData) {
      navigate("/signup");
    }
  }, [navigate, userData]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess ? <div>{JSON.stringify(data)}</div> : <CreateChannel />}
    </>
  );
}

export default Channel;

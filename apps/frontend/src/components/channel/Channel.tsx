import { useChannelQuery } from "../../services/queries";
import CreateChannel from "./CreateChannel";
function Channel() {
  const { data, isLoading, isSuccess } = useChannelQuery();
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess ? <div>{JSON.stringify(data)}</div> : <CreateChannel />}
    </>
  );
}

export default Channel;

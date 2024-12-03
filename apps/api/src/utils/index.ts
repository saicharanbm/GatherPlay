import client from "@repo/db/client";

export const getSubscribersCount = async (channelId: string) => {
  const subCount = await client.subscription.count({
    where: {
      channelId: channelId,
    },
  });
  return subCount;
};

export const getVideosCount = async (channelId: string) => {
  const videoCount = await client.video.count({
    where: {
      channelId: channelId,
    },
  });
  return videoCount;
};

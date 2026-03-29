import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useAllBooks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedBooks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["featuredBooks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedBooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNewReleases() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["newReleases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNewReleases();
    },
    enabled: !!actor && !isFetching,
  });
}

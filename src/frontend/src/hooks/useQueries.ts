import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookCategory } from "../backend.d";
import { sampleBooks } from "../data/books";
import { useActor } from "./useActor";

export function useGetFeaturedBooks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["featuredBooks"],
    queryFn: async () => {
      if (!actor) return sampleBooks.filter((b) => b.isFeatured);
      try {
        return await actor.getFeaturedBooks();
      } catch {
        return sampleBooks.filter((b) => b.isFeatured);
      }
    },
    enabled: !isFetching,
    placeholderData: sampleBooks.filter((b) => b.isFeatured),
  });
}

export function useGetNewReleases() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["newReleases"],
    queryFn: async () => {
      if (!actor) return sampleBooks.filter((b) => b.isNewRelease);
      try {
        return await actor.getNewReleases();
      } catch {
        return sampleBooks.filter((b) => b.isNewRelease);
      }
    },
    enabled: !isFetching,
    placeholderData: sampleBooks.filter((b) => b.isNewRelease),
  });
}

export function useGetCart() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBooksByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["books", category],
    queryFn: async () => {
      if (!actor) {
        if (category === "all") return sampleBooks;
        return sampleBooks.filter((b) => b.category === category);
      }
      const catMap: Record<string, BookCategory> = {
        fiction: BookCategory.fiction,
        nonFiction: BookCategory.nonFiction,
        academic: BookCategory.academic,
      };
      if (category === "all") return actor.getAllBooks();
      return actor.getBooksByCategory(catMap[category]);
    },
    enabled: !isFetching,
    placeholderData: sampleBooks,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookId,
      quantity,
    }: { bookId: number; quantity: number }) => {
      if (!actor) return;
      return actor.addToCart(BigInt(bookId), BigInt(quantity));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookId: number) => {
      if (!actor) return;
      return actor.removeFromCart(BigInt(bookId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm({ name, email, message });
    },
  });
}

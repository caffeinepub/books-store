export interface MockBook {
  id: number;
  title: string;
  author: string;
  category: "fiction" | "nonFiction" | "academic";
  price: number;
  rating: number;
  cover: string;
  description: string;
  isNewRelease: boolean;
  isFeatured: boolean;
}

export const MOCK_BOOKS: MockBook[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "fiction",
    price: 16.99,
    rating: 4.8,
    cover: "/assets/generated/cover-midnight-library.dim_300x450.jpg",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever.",
    isNewRelease: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "nonFiction",
    price: 18.99,
    rating: 4.9,
    cover: "/assets/generated/cover-atomic-habits.dim_300x450.jpg",
    description:
      "Tiny changes, remarkable results. A proven framework for improving every day.",
    isNewRelease: false,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "academic",
    price: 89.99,
    rating: 4.7,
    cover: "/assets/generated/cover-intro-algorithms.dim_300x450.jpg",
    description:
      "The essential reference for computer science students and professionals.",
    isNewRelease: false,
    isFeatured: true,
  },
  {
    id: 4,
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    category: "fiction",
    price: 17.99,
    rating: 4.6,
    cover: "/assets/generated/cover-tomorrow.dim_300x450.jpg",
    description:
      "A dazzling novel about love, friendship, and the creative process spanning three decades.",
    isNewRelease: true,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "nonFiction",
    price: 19.99,
    rating: 4.7,
    cover: "/assets/generated/cover-sapiens.dim_300x450.jpg",
    description:
      "A brief history of humankind from the Stone Age to the present.",
    isNewRelease: false,
    isFeatured: true,
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "nonFiction",
    price: 14.99,
    rating: 4.8,
    cover: "/assets/generated/cover-psychology-money.dim_300x450.jpg",
    description:
      "Timeless lessons on wealth, greed, and happiness through storytelling.",
    isNewRelease: true,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "fiction",
    price: 9.99,
    rating: 4.9,
    cover: "/assets/generated/cover-midnight-library.dim_300x450.jpg",
    description: "The classic tale of love and manners in Georgian England.",
    isNewRelease: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "academic",
    price: 49.99,
    rating: 4.5,
    cover: "/assets/generated/cover-intro-algorithms.dim_300x450.jpg",
    description:
      "A handbook of agile software craftsmanship for every developer.",
    isNewRelease: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    category: "fiction",
    price: 15.99,
    rating: 4.4,
    cover: "/assets/generated/cover-lessons-chemistry.dim_300x450.jpg",
    description:
      "Four unlikely friends meet to solve cold cases in a retirement village.",
    isNewRelease: true,
    isFeatured: false,
  },
  {
    id: 10,
    title: "Think Again",
    author: "Adam Grant",
    category: "nonFiction",
    price: 17.49,
    rating: 4.6,
    cover: "/assets/generated/cover-think-again.dim_300x450.jpg",
    description:
      "The power of knowing what you don't know — rethinking beliefs and decisions.",
    isNewRelease: true,
    isFeatured: false,
  },
  {
    id: 11,
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    category: "academic",
    price: 59.99,
    rating: 4.6,
    cover: "/assets/generated/cover-intro-algorithms.dim_300x450.jpg",
    description:
      "An elegant, unconventional approach to linear algebra for undergraduates.",
    isNewRelease: false,
    isFeatured: false,
  },
  {
    id: 12,
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    category: "fiction",
    price: 16.49,
    rating: 4.7,
    cover: "/assets/generated/cover-lessons-chemistry.dim_300x450.jpg",
    description:
      "A woman chemist in the 1960s becomes a cooking show host who changes America.",
    isNewRelease: true,
    isFeatured: true,
  },
];

export const getFeaturedBooks = () => MOCK_BOOKS.filter((b) => b.isFeatured);
export const getNewArrivals = () => MOCK_BOOKS.filter((b) => b.isNewRelease);
export const getByCategory = (cat: string) =>
  cat === "all" ? MOCK_BOOKS : MOCK_BOOKS.filter((b) => b.category === cat);

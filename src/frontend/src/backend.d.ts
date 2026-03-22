import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Book {
    title: string;
    description: string;
    isNewRelease: boolean;
    author: string;
    isFeatured: boolean;
    category: BookCategory;
    rating: number;
    price: number;
}
export interface CartItem {
    bookId: bigint;
    quantity: bigint;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export enum BookCategory {
    nonFiction = "nonFiction",
    academic = "academic",
    fiction = "fiction"
}
export interface backendInterface {
    addBook(book: Book): Promise<bigint>;
    addToCart(bookId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllBooks(): Promise<Array<Book>>;
    getBook(bookId: bigint): Promise<Book>;
    getBooksByCategory(category: BookCategory): Promise<Array<Book>>;
    getCart(): Promise<Array<CartItem>>;
    getFeaturedBooks(): Promise<Array<Book>>;
    getNewReleases(): Promise<Array<Book>>;
    removeFromCart(bookId: bigint): Promise<void>;
    searchBooks(searchTerm: string): Promise<Array<Book>>;
    submitContactForm(form: ContactForm): Promise<void>;
}

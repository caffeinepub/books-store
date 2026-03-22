import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface OrderItem {
    bookId: bigint;
    quantity: bigint;
    priceAtPurchase: number;
}
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
export interface Order {
    status: OrderStatus;
    orderId: bigint;
    totalAmount: number;
    placedAt: bigint;
    shippingAddress: string;
    buyer: Principal;
    items: Array<OrderItem>;
}
export interface UserProfile {
    name: string;
}
export enum BookCategory {
    nonFiction = "nonFiction",
    academic = "academic",
    fiction = "fiction"
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBook(book: Book): Promise<bigint>;
    addToCart(bookId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllBooks(): Promise<Array<Book>>;
    getBook(bookId: bigint): Promise<Book>;
    getBooksByCategory(category: BookCategory): Promise<Array<Book>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getFeaturedBooks(): Promise<Array<Book>>;
    getMyOrders(): Promise<Array<Order>>;
    getNewReleases(): Promise<Array<Book>>;
    getOrderById(orderId: bigint): Promise<Order | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(shippingAddress: string): Promise<bigint>;
    removeFromCart(bookId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchBooks(searchTerm: string): Promise<Array<Book>>;
    submitContactForm(form: ContactForm): Promise<void>;
}

import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

actor {
  type BookCategory = {
    #fiction;
    #nonFiction;
    #academic;
  };

  module BookCategory {
    public func compare(c1 : BookCategory, c2 : BookCategory) : Order.Order {
      switch (c1, c2) {
        case (#fiction, #fiction) { #equal };
        case (#nonFiction, #nonFiction) { #equal };
        case (#academic, #academic) { #equal };
        case (#fiction, #nonFiction) { #less };
        case (#fiction, #academic) { #less };
        case (#nonFiction, #fiction) { #greater };
        case (#nonFiction, #academic) { #less };
        case (#academic, #fiction) { #greater };
        case (#academic, #nonFiction) { #greater };
      };
    };
  };

  type Book = {
    title : Text;
    author : Text;
    category : BookCategory;
    price : Float;
    rating : Float;
    description : Text;
    isFeatured : Bool;
    isNewRelease : Bool;
  };

  module Book {
    public func compare(b1 : Book, b2 : Book) : Order.Order {
      switch (Text.compare(b1.title, b2.title)) {
        case (#equal) { Text.compare(b1.author, b2.author) };
        case (order) { order };
      };
    };

    public func compareByPrice(b1 : Book, b2 : Book) : Order.Order {
      Float.compare(b1.price, b2.price);
    };

    public func compareByRating(b1 : Book, b2 : Book) : Order.Order {
      Float.compare(b2.rating, b1.rating);
    };

    public func compareByCategory(b1 : Book, b2 : Book) : Order.Order {
      switch (BookCategory.compare(b1.category, b2.category)) {
        case (#equal) { compare(b1, b2) };
        case (order) { order };
      };
    };

    public func compareByTitle(b1 : Book, b2 : Book) : Order.Order {
      Text.compare(b1.title, b2.title);
    };
  };

  type CartItem = {
    bookId : Nat;
    quantity : Int;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  let bookCatalog = Map.empty<Nat, Book>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let contactForms = List.empty<ContactForm>();

  var nextBookId = 0;

  public shared ({ caller }) func addBook(book : Book) : async Nat {
    if (not caller.isAnonymous()) { Runtime.trap("Unauthenticated") };
    bookCatalog.add(nextBookId, book);
    let bookId = nextBookId;
    nextBookId += 1;
    bookId;
  };

  public query ({ caller }) func getBook(bookId : Nat) : async Book {
    switch (bookCatalog.get(bookId)) {
      case (null) { Runtime.trap("Book not found") };
      case (?book) { book };
    };
  };

  public query ({ caller }) func getAllBooks() : async [Book] {
    bookCatalog.values().toArray();
  };

  public query ({ caller }) func searchBooks(searchTerm : Text) : async [Book] {
    let lowerTerm = searchTerm.toLower();
    bookCatalog.values().toArray().filter(
      func(book) {
        book.title.toLower().contains(#text lowerTerm) or book.author.toLower().contains(#text lowerTerm);
      }
    );
  };

  public query ({ caller }) func getBooksByCategory(category : BookCategory) : async [Book] {
    bookCatalog.values().toArray().filter(func(book) { BookCategory.compare(book.category, category) == #equal });
  };

  public shared ({ caller }) func addToCart(bookId : Nat, quantity : Int) : async () {
    if (quantity <= 0) { Runtime.trap("Quantity must be greater than 0") };
    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?cart) { cart };
    };
    let existingCart = cart.toArray();
    let updatedCart = existingCart.map(
      func(item) {
        if (item.bookId == bookId) {
          { bookId = item.bookId; quantity = item.quantity + quantity };
        } else {
          item;
        };
      }
    );

    let containsItem = existingCart.find(func(item) { item.bookId == bookId }).isSome();

    let finalCart = if (containsItem) {
      List.fromArray<CartItem>(updatedCart);
    } else {
      cart.add({ bookId; quantity });
      cart;
    };

    carts.add(caller, finalCart);
  };

  public shared ({ caller }) func removeFromCart(bookId : Nat) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        let updatedCart = cart.filter(func(item) { item.bookId != bookId });
        carts.add(caller, updatedCart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func submitContactForm(form : ContactForm) : async () {
    contactForms.add(form);
  };

  public query ({ caller }) func getFeaturedBooks() : async [Book] {
    bookCatalog.values().toArray().filter(func(book) { book.isFeatured });
  };

  public query ({ caller }) func getNewReleases() : async [Book] {
    bookCatalog.values().toArray().filter(func(book) { book.isNewRelease });
  };
};

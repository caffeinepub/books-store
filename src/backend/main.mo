import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Int "mo:core/Int";

import Nat "mo:core/Nat";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  type OrderItem = {
    bookId : Nat;
    quantity : Int;
    priceAtPurchase : Float;
  };

  type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
  };

  type Order = {
    orderId : Nat;
    buyer : Principal;
    items : [OrderItem];
    totalAmount : Float;
    shippingAddress : Text;
    status : OrderStatus;
    placedAt : Int;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let bookCatalog = Map.empty<Nat, Book>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let contactForms = List.empty<ContactForm>();
  let orders = Map.empty<Nat, Order>();
  let userOrderIndex = Map.empty<Principal, Nat>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextBookId = 0;
  var nextOrderId = 0;

  func generateOrderId(buyer : Principal) : Nat {
    let count = switch (userOrderIndex.get(buyer)) {
      case (null) { 0 };
      case (?existing) { existing };
    };
    userOrderIndex.add(buyer, count + 1);
    let orderId = nextOrderId;
    nextOrderId += 1;
    orderId;
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Book Management Functions
  public shared ({ caller }) func addBook(book : Book) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add books");
    };
    bookCatalog.add(nextBookId, book);
    let bookId = nextBookId;
    nextBookId += 1;
    bookId;
  };

  public query ({ caller }) func getBook(bookId : Nat) : async Book {
    // Public access - no authorization check needed
    switch (bookCatalog.get(bookId)) {
      case (null) { Runtime.trap("Book not found") };
      case (?book) { book };
    };
  };

  public query ({ caller }) func getAllBooks() : async [Book] {
    // Public access - no authorization check needed
    bookCatalog.values().toArray();
  };

  public query ({ caller }) func searchBooks(searchTerm : Text) : async [Book] {
    // Public access - no authorization check needed
    let lowerTerm = searchTerm.toLower();
    bookCatalog.values().toArray().filter(
      func(book) {
        book.title.toLower().contains(#text lowerTerm) or book.author.toLower().contains(#text lowerTerm);
      }
    );
  };

  public query ({ caller }) func getBooksByCategory(category : BookCategory) : async [Book] {
    // Public access - no authorization check needed
    bookCatalog.values().toArray().filter(func(book) { BookCategory.compare(book.category, category) == #equal });
  };

  public query ({ caller }) func getFeaturedBooks() : async [Book] {
    // Public access - no authorization check needed
    bookCatalog.values().toArray().filter(func(book) { book.isFeatured });
  };

  public query ({ caller }) func getNewReleases() : async [Book] {
    // Public access - no authorization check needed
    bookCatalog.values().toArray().filter(func(book) { book.isNewRelease });
  };

  // Cart Functions
  public shared ({ caller }) func addToCart(bookId : Nat, quantity : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        let updatedCart = cart.filter(func(item) { item.bookId != bookId });
        carts.add(caller, updatedCart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  // Order Functions
  public shared ({ caller }) func placeOrder(shippingAddress : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        if (cart.isEmpty()) { Runtime.trap("Cart is empty") };

        var totalAmount : Float = 0;
        let orderItems = List.empty<OrderItem>();

        for (item in cart.values()) {
          let bookId = item.bookId;
          let quantity = item.quantity;
          switch (bookCatalog.get(bookId)) {
            case (null) { Runtime.trap("Book not found in cart") };
            case (?book) {
              totalAmount += book.price * quantity.toFloat();
              orderItems.add({
                bookId;
                quantity;
                priceAtPurchase = book.price;
              });
            };
          };
        };

        let orderId = generateOrderId(caller);

        let order : Order = {
          orderId;
          buyer = caller;
          items = orderItems.toArray();
          totalAmount;
          shippingAddress;
          status = #pending;
          placedAt = Time.now();
        };

        orders.add(orderId, order);
        carts.remove(caller);

        orderId;
      };
    };
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    let myOrders = List.empty<Order>();
    for ((_, order) in orders.entries()) {
      if (order.buyer == caller) {
        myOrders.add(order);
      };
    };
    myOrders.toArray();
  };

  public query ({ caller }) func getOrderById(orderId : Nat) : async ?Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    switch (orders.get(orderId)) {
      case (null) { null };
      case (?order) {
        if (order.buyer != caller) { Runtime.trap("Not authorized to view this order") };
        ?order;
      };
    };
  };

  // Contact Form Function
  public shared ({ caller }) func submitContactForm(form : ContactForm) : async () {
    // Public access - no authorization check needed (guests can submit contact forms)
    contactForms.add(form);
  };
};

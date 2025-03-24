-- Create the database
CREATE DATABASE IF NOT EXISTS artisanconnect;
USE artisanconnect;

-- Create Users table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('artisan', 'customer') NOT NULL,
    ProfilePicture VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockLevel INT NOT NULL DEFAULT 0,
    ImageURL VARCHAR(255),
    UserID INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create Orders table
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    ShippingAddress TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    OrderDetailID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- Create Reviews table
CREATE TABLE Reviews (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT NOT NULL,
    UserID INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    ReviewDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create Payments table
CREATE TABLE Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    PaymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod ENUM('credit_card', 'paypal', 'other') NOT NULL,
    TransactionID VARCHAR(255),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

-- Insert sample data
-- Users
INSERT INTO Users (Name, Email, Password, Role, ProfilePicture) VALUES
('Maria Rodriguez', 'maria@example.com', 'password123', 'artisan', 'img/profile1.jpg'),
('Ahmed Ali', 'ahmed@example.com', 'password123', 'artisan', 'img/profile2.jpg'),
('Sophie Dupont', 'sophie@example.com', 'password123', 'artisan', 'img/profile3.jpg'),
('Lena Schmidt', 'lena@example.com', 'password123', 'artisan', 'img/profile4.jpg'),
('John Doe', 'john@example.com', 'password123', 'customer', 'img/profile5.jpg'),
('Jane Smith', 'jane@example.com', 'password123', 'customer', 'img/profile6.jpg');

-- Products
INSERT INTO Products (Name, Description, Price, StockLevel, ImageURL, UserID) VALUES
('Handmade Ceramic Bowl', 'Beautifully crafted ceramic bowl for your dining table.', 45.99, 25, 'img/product1.jpg', 1),
('Wooden Carving Elephant', 'Hand-carved elephant figurine made from sustainable wood.', 65.00, 15, 'img/product2.jpg', 4),
('Embroidered Tablecloth', 'Traditional embroidered tablecloth with floral patterns.', 89.99, 10, 'img/product3.jpg', 1),
('Silver Necklace', 'Handmade silver necklace with unique design.', 125.00, 5, 'img/product4.jpg', 3),
('Hand-painted Canvas', 'Original artwork on canvas by local artist.', 199.99, 3, 'img/product5.jpg', 2),
('Woven Basket', 'Traditional woven basket made from natural materials.', 35.50, 20, 'img/product6.jpg', 1);

-- Orders
INSERT INTO Orders (UserID, TotalAmount, Status, ShippingAddress) VALUES
(5, 110.98, 'delivered', '123 Main St, Anytown, USA'),
(5, 89.99, 'shipped', '456 Oak Ave, Othertown, USA'),
(6, 35.50, 'processing', '789 Pine Rd, Thirdtown, USA');

-- OrderDetails
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price) VALUES
(1, 1, 2, 45.99),
(1, 6, 1, 35.50),
(2, 3, 1, 89.99),
(3, 6, 2, 35.50);

-- Reviews
INSERT INTO Reviews (ProductID, UserID, Rating, Comment) VALUES
(1, 5, 5, 'Beautiful bowl, perfect for my kitchen!'),
(1, 6, 4, 'Great quality, but a bit smaller than expected'),
(3, 5, 5, 'The embroidery is exquisite!'),
(6, 6, 5, 'Durable and stylish baskets.');

-- Payments
INSERT INTO Payments (OrderID, Amount, PaymentMethod, TransactionID) VALUES
(1, 110.98, 'credit_card', 'txn_12345'),
(2, 89.99, 'paypal', 'txn_67890'),
(3, 35.50, 'credit_card', 'txn_54321');
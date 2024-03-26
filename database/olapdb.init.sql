CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    image TEXT,
    rating NUMERIC(2, 1) DEFAULT 0.0,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    transaction_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    product_id UUID NOT NULL REFERENCES products(product_id),
    status VARCHAR DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, image, rating, price)
VALUES
    ('iPhone 13', 'https://www.dslr-zone.com/wp-content/uploads/2021/10/2-2-800x800.jpeg', 4.7, 13986000),
    ('Sony WH-1000XM4', 'https://electrohub.co.ke/wp-content/uploads/2021/04/WH-1000XM4.jpeg', 4.4, 4883000),
    ('iPad Air', 'https://mspoweruser.com/wp-content/uploads/2020/09/Apple-iPad-Air.jpg', 5.0, 8398600),
    ('Samsung Galaxy S21', 'https://th.bing.com/th/id/OIP.4mz1Dr4UdEk7RhTwUqVhpwHaHa?rs=1&pid=ImgDetMain', 4.6, 13990000),
    ('Dell XPS 13', 'https://th.bing.com/th/id/OIP.YxR2s2V__rXXt5YRwf6oDAHaFx?rs=1&pid=ImgDetMain', 4.5, 22890000),
    ('Bose QuietComfort 35 II', 'https://th.bing.com/th/id/OIP.DWtmFfTk2wf3sgyO8H_FvgHaHa?rs=1&pid=ImgDetMain', 3.9, 3490000),
    ('Samsung Galaxy Watch 4', 'https://www.bhphotovideo.com/images/images2500x2500/samsung_sm_r880nzkaxaa_galaxy_watch4_classic_smartwatch_1646549.jpg', 4.6, 5290000),
    ('Canon EOS R5', 'https://static.techspot.com/images/products/2020/cameras/org/2020-07-09-product.jpg', 4.9, 84999000),
    ('Xiaomi Mi Smart Band 6', 'https://www.batna24.com/img2/500/331264_156416.webp', 4.2, 799000),
    ('LG UltraGear 27GN950-B', 'https://www.lg.com/es/images/monitores/md07513189/27GN950-01.jpg', 5.0, 10999000);

INSERT INTO products (product_id, name, image, rating, price)
VALUES 
    ('601eb64c-8e9a-4091-a091-8d09293a5cc8', 'MacBook Pro', 'https://i1.wp.com/laptopmedia.com/wp-content/uploads/2017/06/macbook_pro_13_a_1143_0_0.jpg?fit=2040%2C1727&ssl=1', 4.8, 27986000);

INSERT INTO users (user_id, username, password) 
VALUES 
    ('33f9f416-615a-4576-8658-d57a4e2381f9', 'john', '$2a$10$QlyJVzb8/tvPfZv76IFuduiWJoli.Ksti8tjJHhniF45vyWQvrggy');

INSERT INTO transactions (user_id, product_id, status) 
VALUES 
    ('33f9f416-615a-4576-8658-d57a4e2381f9', '601eb64c-8e9a-4091-a091-8d09293a5cc8', 'completed');
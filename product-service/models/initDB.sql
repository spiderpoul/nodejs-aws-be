create extension if not exists "uuid-ossp";

create table if not exists products (
	id uuid primary key default uuid_generate_v4(),
	title text,
	description text,
	price integer,
	imageUrl varchar(255)
);

create table if not exists stocks (
	product_id uuid primary key references products (id),
	count integer
);



insert into products(title, description, price, imageUrl)
values
('Unicorn toy white', 'Unicorn toy for your kid', 4000, 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.47.33.jpeg'),
('Unicorn toy green', 'Unicorn toy for your kid', 4000, 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.48.09.jpeg' ),
('Cat toy', 'Cat toy for your kid', 3000, 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.53.22.jpeg'),
('Rabbit toy', 'toy for your kid', 4000, 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.55.51.jpeg'),
('Bull toy', 'toy for your kid', 4000, 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.55.16.jpeg'),
('Leo toy', 'toy for your kid', 4000, 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.54.58.jpeg');



insert into stocks(product_id, count)
values('2157f396-2c15-4db2-b097-ecbe53f490f9', 4),
('60d0ebe0-6809-4536-a956-9062b060b9cc', 6),
('92506a9d-e7f1-4b5c-81f4-5e19b60eaa65', 12),
('1bc6a55d-0123-44d4-90f0-991f8cd60372', 7),
('500d32f5-c8f7-42eb-a8b6-ee768f01c5d5', 2),
('b3a8104e-8a7d-4369-b3ed-4ee93737a1cc', 11);
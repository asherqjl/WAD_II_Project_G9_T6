drop database if exists project;
create database project;
use project;

create table acc (
    id integer auto_increment primary key,
    acc_email varchar(30),
    acc_password varchar(16),
    points integer
);

create table travel_history (
	email varchar(50),
	location_name varchar(100),
    time_visited datetime,
    category text(50)
    );
    
create table reward_history (
	email varchar(50),
    item_name varchar(30),
    img_url varchar(300),
    points_used integer,
    time_redeemed datetime
	);	
    

insert into travel_history(email, location_name, time_visited, category) 
values ("1", "Bugis", CURRENT_TIMESTAMP, "Tourism");

insert into travel_history(email, location_name, time_visited, category)
values ("1", "Orchard", "Tomorrow", "Shopping");

insert into reward_history(email, item_name, img_url, points_used, time_redeemed)
values("1", "Pants", "https://www.helikon-tex.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/s/p/sp-pgm-dc-11.jpg", 200, CURRENT_TIMESTAMP);
insert into reward_history(email, item_name, img_url, points_used, time_redeemed)
values("1", "Pants", "https://www.helikon-tex.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/s/p/sp-pgm-dc-11.jpg", 200, CURRENT_TIMESTAMP);
select * from travel_history;
select * from reward_history
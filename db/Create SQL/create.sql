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
	longitude varchar(20),
    latitude varchar(20),
    time_visited datetime
    );
    
create table reward_history (
	email varchar(50),
    item_name varchar(30),
    img_url varchar(300),
    points_used integer,
    time_redeemed datetime
	);	
    
select * from travel_history;
select * from reward_history
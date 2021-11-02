drop database if exists project;
create database project;
use project;

create table acc (
    id integer auto_increment primary key,
    create_timestamp datetime,
    update_timestamp datetime,
    acc_email varchar(30),
    acc_password varchar(16),
    points integer
);

create table travel_history (
	user_id integer,
	location_name varchar(100),
    time_visited datetime,
    category text(16)
);
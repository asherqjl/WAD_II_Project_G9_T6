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
	user_id integer,
	location_name varchar(100),
    time_visited varchar(100),
    category text(16)
    );
    
    
insert into travel_history(user_id, location_name, time_visited, category) 
values (1, "Bugis", "Yesterday", "Tourism");

select * from travel_history
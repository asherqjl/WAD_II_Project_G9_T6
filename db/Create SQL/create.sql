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
    time_visited datetime,
    category text(16)
<<<<<<< HEAD
    );
    
=======
);
>>>>>>> 1cadf3144ac2649e65889e127062383590d8967e

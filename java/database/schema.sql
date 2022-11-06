BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, landmarks, itineraries, landmarks_to_itineraries, liked_status ;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

CREATE SEQUENCE seq_landmark_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE landmarks (
	landmark_id int DEFAULT nextval('seq_landmark_id'::regclass) NOT NULL,
	name varchar(100) NOT NULL,
	image_url varchar(200)NOT NULL,
	address varchar(100) NOT NULL,
	type varchar(100) NOT NULL,
	description varchar(400) NOT NULL,
	availability DATE,
	PRIMARY KEY (landmark_id)
);

CREATE SEQUENCE seq_itinerary_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE itineraries (
	itinerary_id int DEFAULT nextval('seq_itinerary_id'::regclass) NOT NULL,
	date date NOT NULL,
	user_id int,
	starting_landmark_id int,
	PRIMARY KEY (itinerary_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	 FOREIGN KEY (starting_landmark_id) REFERENCES landmarks(landmark_id)
);

CREATE SEQUENCE seq_landmark_to_itinerary_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE landmarks_to_itineraries (
	landmark_to_itinerary_id int DEFAULT nextval('seq_landmark_to_itinerary_id'::regclass) NOT NULL,
	itinerary_id int,
	landmark_id int,
	PRIMARY KEY (landmark_to_itinerary_id),
	FOREIGN KEY (itinerary_id) REFERENCES itineraries(itinerary_id),
	 FOREIGN KEY (landmark_id) REFERENCES landmarks(landmark_id)
);

CREATE SEQUENCE seq_liked_status_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE liked_status (
	liked_status_id int DEFAULT nextval('seq_liked_status_id'::regclass) NOT NULL,
	user_id int,
	landmark_id int,
	liked boolean, 
	PRIMARY KEY (liked_status_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	 FOREIGN KEY (landmark_id) REFERENCES landmarks(landmark_id)
);



COMMIT TRANSACTION;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(60),
  first_name TEXT,
  last_name TEXT,
  password VARCHAR(120) NOT NULL );

CREATE TABLE hotels (
id SERIAL PRIMARY KEY,
hotel_name TEXT,
hotel_address TEXT,
hotel_city TEXT,
hotel_state_province TEXT,
hotel_zip INT,
hotel_phone VARCHAR(20),
hotel_url TEXT,
hotel_notes TEXT
);

CREATE TABLE events (
 id serial PRIMARY KEY,
 event_name VARCHAR(50),
 address_one VARCHAR(50),
 address_two VARCHAR(50),
 event_city VARCHAR(20),
 event_state_province TEXT,
 event_url TEXT,
 company text,
 begin_date DATE,
 end_date DATE,
 notes_events TEXT,
 results_url TEXT,
 schedule_url TEXT,
 hotel_id int references hotels(id)
 );

CREATE TABLE survey (
 id SERIAL PRIMARY KEY,
attend_status TEXT,
hotel_status BOOLEAN,
notes_other_accommodation TEXT,
just_me TEXT,
me_and_non_paddlers TEXT,
num_non_paddlers TEXT,
me_and_one_paddler TEXT,
me_and_paddlers TEXT,
notes_survey_room TEXT,
room_preference TEXT,
user_id int references users(id),
events_id int references events(id)
);

CREATE TABLE rooms (
id SERIAL PRIMARY KEY,
room_type TEXT,
capacity INT,
events_id INT references events(id),
hotels_id INT references hotels(id),
room_number TEXT,
check_in DATE,
check_out DATE,
price TEXT
);


CREATE TABLE occupant_room (
id SERIAL PRIMARY KEY,
users_id INT references users(id),
guest_name TEXT,
rooms_id INT references rooms(id)
);

--events and hotel JOIN
SELECT events.id, event_name, address_one, address_two, event_state_province, company, begin_date, end_date, notes_events, results_url, schedule_url, hotel_name, event_city, event_url
FROM events
JOIN hotels ON events.hotel_id = hotels.id;

--occupant_room and users JOIN
SELECT occupant_room.id, first_name, last_name, guest_name, room_type, capacity, room_number, check_in, check_out, price
FROM occupant_room
JOIN users ON occupant_room.users_id = users.id
JOIN rooms ON occupant_room.rooms_id = rooms.id;

--survey and users JOIN
SELECT attend_status, hotel_status, notes_other_accommodation, just_me, me_and_non_paddlers, num_non_paddlers, me_and_one_paddler, me_and_paddlers, notes_survey_room, room_preference, first_name, last_name, event_name
FROM survey
JOIN users ON survey.user_id = users.id
JOIN events ON survey.events_id = events.id;

--events and rooms and hotels
SELECT event_name, room_type, capacity, room_number, check_in, check_out, price, hotel_name
FROM rooms
JOIN events ON rooms.events_id = events.id
JOIN hotels ON rooms.hotels_id = hotels.id;

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
 events_state_province TEXT,
 company text,
 begin_date DATE,
 end_date DATE,
 notes_events TEXT,
 results_url TEXT,
 schedule_url TEXT,
 hotel_id int references hotels(id),
 hotel_phase BOOLEAN
 );
CREATE TABLE survey (
 id SERIAL PRIMARY KEY,
attend_status TEXT,
hotel_status BOOLEAN,
notes_other_accommodation TEXT,
roommate_option TEXT,
num_non_paddlers TEXT,
notes_survey_room TEXT,
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

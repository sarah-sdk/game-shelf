CREATE TABLE user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  username varchar(100) not null unique,
  password varchar(255) not null,
  is_admin boolean not null default false,
  is_public boolean not null default true,
  created_at timestamp default current_timestamp not null
);

CREATE TABLE user_game (
  user_id int unsigned not null,
  external_id varchar(50) not null,
  status ENUM('wishlist', 'owned', 'playing', 'completed', 'abandoned', 'platinum'),
  comment text,
  added_at datetime default current_timestamp,
  foreign key(user_id) references user(id) on delete cascade,
  primary key(user_id, external_id)
);


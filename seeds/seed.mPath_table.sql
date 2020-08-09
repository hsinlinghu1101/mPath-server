BEGIN;

INSERT INTO mPath_users(user_name, user_age, user_gender, user_email, password)
VALUES
('dunder', 2, 5, 'dunder@gmail.com','dunderpass'),
('John', 3, 1, 'jhon@gmail.com','johnpass'),
('Amy', 1, 3, 'amy@gmail.com','amypass');



COMMIT;
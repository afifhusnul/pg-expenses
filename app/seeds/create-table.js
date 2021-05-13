drop table profile;
drop table salary;
drop table expenses;
drop table users;

CREATE TABLE users (
	user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR ( 8 ) UNIQUE NOT NULL,
	password VARCHAR ( 250 ) NOT NULL,
	email VARCHAR ( 100 ) UNIQUE NOT NULL,
	is_active VARCHAR(1) NOT NULL DEFAULT 'Y',
	created_at TIMESTAMP NOT NULL DEFAULT now(),
  last_login TIMESTAMP 
);

CREATE TABLE profile (
	profile_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL,
	fullName VARCHAR ( 50 ) NOT NULL,
	dob date NOT NULL,
	occupation VARCHAR ( 255 )  NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	update_at TIMESTAMP DEFAULT now(),
	CONSTRAINT fk_user
    FOREIGN KEY(user_id) REFERENCES users(user_id)	  	  
);

CREATE TABLE salary (	
	salary_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL,
	dt_salary date UNIQUE NOT NULL,
	desc_salary VARCHAR(250) NOT NULL,
	amt_salary NUMERIC(10,2) NOT NULL,
		FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE expenses (
	expenses_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL,
	salary_id INT NOT NULL,
	dtExp date NOT NULL,
	descExp VARCHAR(250) NOT NULL DEFAULT 'Expenses XXX' ,
	amountExp NUMERIC(10,2) NOT NULL,
	  FOREIGN KEY(user_id) REFERENCES users(user_id),
	  FOREIGN KEY(salary_id) REFERENCES salary(salary_id)
);

--insert into users(username, email, password) values ('nusnafif', 'nusnafif@digi.com.my', 'afif123');
--select * from users;
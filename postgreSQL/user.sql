-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	firstname varchar(32) NULL,
	lastname varchar(32) NULL,
	username varchar(16) NOT NULL,
	about text NULL,
	dateregistered timestamp NOT NULL DEFAULT now(),
	"password" varchar(100) NULL,
	--passwordsalt varchar(100) NULL,
	email varchar(64) NOT NULL,
	avatarurl varchar(64) NULL,
	"role" varchar(16) NULL DEFAULT 'user'::character varying,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_key UNIQUE (username)
);


-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT users_role_fkey FOREIGN KEY ("role") REFERENCES public.roles("name");

INSERT INTO users (username, email,role) VALUES
	('admin', 'admin@example.com','admin');

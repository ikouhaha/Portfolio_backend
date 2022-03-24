-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	"name" varchar(16) NOT NULL,
	description text NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (name)
);


INSERT INTO roles ("name",description) VALUES
	 ('user',''),
	 ('admin',NULL),
	 ('staff',NULL);
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP TABLE public.users;

CREATE TABLE public.users ( 
    "id" serial NOT NULL,
    "email" varchar UNIQUE NOT NULL,
    "username" varchar UNIQUE NOT NULL,
    "password" varchar NOT NULL,
    "avatar_url" varchar,
    "user_description" varchar,
    CONSTRAINT "user_pk" PRIMARY KEY("id")
);

CREATE TABLE public.favorites ( 
    "id" serial NOT NULL,    
    "anime_id" integer NOT NULL,
    CONSTRAINT "bets_pk" PRIMARY KEY("id")
);

CREATE TABLE public.favorite_details (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "favorite_id" integer NOT NULL
);

--the lines below will label the columns in bets_detail as foreign keys and point towards the references
ALTER TABLE public.favorite_details ADD CONSTRAINT "favorite_details_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("id");
ALTER TABLE public.favorite_details ADD CONSTRAINT "favorite_details_fk1" FOREIGN KEY ("favorite_id") REFERENCES public.favorites("id");


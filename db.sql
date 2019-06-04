--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: items; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.items (
    id integer NOT NULL,
    title text DEFAULT 'No title added'::text NOT NULL,
    imageurl text DEFAULT 'http://via.placeholder.com/350x250?text=Please+select+an+image'::text,
    description text DEFAULT 'No description added'::text NOT NULL,
    ownerid integer,
    borrowerid integer,
    created timestamp without time zone DEFAULT now(),
    CONSTRAINT items_check CHECK ((borrowerid <> ownerid))
);


ALTER TABLE public.items OWNER TO boomtown;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtown
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO boomtown;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtown
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: itemtags; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.itemtags (
    itemid integer NOT NULL,
    tagid integer NOT NULL
);


ALTER TABLE public.itemtags OWNER TO boomtown;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.tags OWNER TO boomtown;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtown
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO boomtown;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtown
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    fullname text NOT NULL,
    bio text DEFAULT 'No bio added'::text,
    password text
);


ALTER TABLE public.users OWNER TO boomtown;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtown
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO boomtown;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtown
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.items (id, title, imageurl, description, ownerid, borrowerid, created) FROM stdin;
64	White Soapstone	https://i.etsystatic.com/20123502/c/2361/1875/317/208/il/5336a3/1910936697/il_340x270.1910936697_54tc.jpg	Let me join you for some jolly cooperation!	17	\N	2019-06-04 10:50:12.587172
67	Wooden Mug	https://i.etsystatic.com/13323094/r/il/a919f7/1006514292/il_570xN.1006514292_qdj4.jpg	Join me for a drink friend!	18	\N	2019-06-04 11:42:43.497599
68	Sunlight Medal	https://i.etsystatic.com/6963080/r/il/ae67df/1378740166/il_794xN.1378740166_qq9o.jpg	Medal given to warriors of the sun as reward	17	\N	2019-06-04 11:43:24.860282
\.


--
-- Data for Name: itemtags; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.itemtags (itemid, tagid) FROM stdin;
64	2
64	2
67	1
68	1
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.tags (id, title) FROM stdin;
1	Household Items
2	Tools
3	Electronics
4	Physical Media
5	Sporting Goods
6	Musical Instruments
7	Recreational Equipment
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.users (id, email, fullname, bio, password) FROM stdin;
17	solaire@astora.com	SunBro	No bio added	$2a$10$BWmKyxTLdtZBl.s7i5LVyu48f3AAkCP8GezEiO3rtUlbD8RrPNHw6
18	siegmeyer@catarina.com	OnionKnight	No bio added	$2a$10$NzH5eIwWosbpyTmiQb6e9uIJ2jKT04.m3yfT1ksnxB/v6KtWlbkjy
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtown
--

SELECT pg_catalog.setval('public.items_id_seq', 68, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtown
--

SELECT pg_catalog.setval('public.tags_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtown
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (title);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: items items_borrowerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_borrowerid_fkey FOREIGN KEY (borrowerid) REFERENCES public.users(id);


--
-- Name: items items_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: itemtags itemtags_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT itemtags_itemid_fkey FOREIGN KEY (itemid) REFERENCES public.items(id) ON DELETE CASCADE;


--
-- Name: itemtags itemtags_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT itemtags_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


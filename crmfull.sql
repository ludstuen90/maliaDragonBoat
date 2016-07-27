--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cases_meta; Type: TABLE; Schema: public; Owner: lukasudstuen
--

CREATE TABLE cases_meta (
    id integer NOT NULL,
    status text,
    client_id integer,
    summary text,
    last_modified timestamp without time zone DEFAULT now(),
    claim_no text,
    title text,
    created_by text,
    assigned_to text
);


ALTER TABLE cases_meta OWNER TO lukasudstuen;

--
-- Name: cases_id_seq; Type: SEQUENCE; Schema: public; Owner: lukasudstuen
--

CREATE SEQUENCE cases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cases_id_seq OWNER TO lukasudstuen;

--
-- Name: cases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lukasudstuen
--

ALTER SEQUENCE cases_id_seq OWNED BY cases_meta.id;


--
-- Name: cases_notes; Type: TABLE; Schema: public; Owner: lukasudstuen
--

CREATE TABLE cases_notes (
    id integer NOT NULL,
    author text,
    note text,
    "timestamp" timestamp without time zone DEFAULT now(),
    case_id integer,
    title text
);


ALTER TABLE cases_notes OWNER TO lukasudstuen;

--
-- Name: cases_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: lukasudstuen
--

CREATE SEQUENCE cases_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cases_notes_id_seq OWNER TO lukasudstuen;

--
-- Name: cases_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lukasudstuen
--

ALTER SEQUENCE cases_notes_id_seq OWNED BY cases_notes.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: lukasudstuen
--

CREATE TABLE clients (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    address character varying,
    city character varying,
    state character varying,
    email character varying,
    phone character varying,
    address2 character varying
);


ALTER TABLE clients OWNER TO lukasudstuen;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: lukasudstuen
--

CREATE SEQUENCE clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clients_id_seq OWNER TO lukasudstuen;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lukasudstuen
--

ALTER SEQUENCE clients_id_seq OWNED BY clients.id;


--
-- Name: insurers; Type: TABLE; Schema: public; Owner: lukasudstuen
--

CREATE TABLE insurers (
    id integer NOT NULL,
    provider character varying,
    first_name character varying,
    last_name character varying,
    phone character varying,
    email character varying,
    client_id integer,
    provider_type character varying,
    notes text,
    claim_number text
);


ALTER TABLE insurers OWNER TO lukasudstuen;

--
-- Name: insurers_id_seq; Type: SEQUENCE; Schema: public; Owner: lukasudstuen
--

CREATE SEQUENCE insurers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE insurers_id_seq OWNER TO lukasudstuen;

--
-- Name: insurers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lukasudstuen
--

ALTER SEQUENCE insurers_id_seq OWNED BY insurers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: lukasudstuen
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(120) NOT NULL
);


ALTER TABLE users OWNER TO lukasudstuen;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: lukasudstuen
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO lukasudstuen;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lukasudstuen
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY cases_meta ALTER COLUMN id SET DEFAULT nextval('cases_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY cases_notes ALTER COLUMN id SET DEFAULT nextval('cases_notes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY clients ALTER COLUMN id SET DEFAULT nextval('clients_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY insurers ALTER COLUMN id SET DEFAULT nextval('insurers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lukasudstuen
--

SELECT pg_catalog.setval('cases_id_seq', 70, true);


--
-- Data for Name: cases_meta; Type: TABLE DATA; Schema: public; Owner: lukasudstuen
--

COPY cases_meta (id, status, client_id, summary, last_modified, claim_no, title, created_by, assigned_to) FROM stdin;
50	canceled	6	Hospital does not know where they have placed Tobias' health records..	2016-07-14 23:11:05.573337	54TH7211	Lost Health Records	JDANIELS	GHEARTMAN
47	closed	5	Client indicated he has moved addresses, and provided a new address of 34 Sugarbush Lane, Newark, New Jersey. Please update.	2016-07-14 23:06:24.327408	25IU5322	Please confirm change of address	JDANIELS	KPORTMAN
36	open	6	Tobias' believes he has been charged for additional services he did not receive. The hospital refuses to alter the bill to reflect the correct charges,	2016-07-14 22:30:12.003944	TH98239s	Incorrect Hospital Bill	JDANIELS	VYANG72
35	closed	5	Carlos requests a new invoice be sent to his home. Please process at earliest convenience.	2016-07-14 22:28:59.111687	NV02982	New Claim Needed	TMONICA	YQUINTERO
49	open	5	Carlos' insurance company is attempting to apply changes to the policy that were enacted following his accident. Carlos would file a suit to receive compensation for what the old policy specified.	2016-07-14 23:09:06.444241	99OP7231	Changes to Corporate Insurance	JDANIELS	LUDSTUEN
42	open	9	Rhonda experienced unexpected and unadvised side effects post surgery. She has incurred additional bills attempting to solve these problems.	2016-07-14 22:51:21.767589	89HJ4588	Medical documentation of surgery effects	JDANIELS	K MICHELLE
40	open	8	David's insurance was not applied during intake. Hospital refuses to apply the insurance post surgery.	2016-07-14 22:44:33.498007	23FG7864	Insurane Failure to Pay Notice	JDANIELS	H TRANH
70	open	1	Treat quality not sufficient.	2016-07-18 11:41:01.595831	JDKSL	Complaints about quality of treats	LUDSTUEN	JDANIELS
45	canceled	1	Aesop believes his recent case of identity fraud was caused by a leak of his personal information from his hospital.	2016-07-14 22:59:52.848937	65HA6661	Personal Information Leaked	JDANIELS	J HOLLYWOOD
46	canceled	5	Carlos was charged additional charges, because his Bill was never delivered to him. Carlos would like to get charges negated,	2016-07-14 23:03:06.387193	32SW4721	Missing Bill	JDANIELS	S YUSUF
52	closed	6	Tobias received further injury in an ambulance crash en route to hospital for emergency help.	2016-07-14 23:13:32.767057	33GA3211	Ambulance Accident	JDANIELS	OJONES
37	canceled	6	Client has moved. Please update address to 92 Wing Street - Buffalo, NY 14201	2016-07-14 22:35:20.752536	NV38392	Update Address	TGINSBURG	HTHOMAS
48	closed	1	Client reports he can not use a pen with his paws, please provide necessary accomodations.	2016-07-14 23:08:10.150149	\N	Accomodation requested for paws	LUDSTUEN	KSMITH
39	closed	6	Insurance will not cover cost of premium. Please call client to discuss further options.	2016-07-14 22:43:19.557246	ND920281	Insurance Not Covering Full Amnt	HGINSBURG	ETHOMAS
57	canceled	9	Client left laptop at law firm. Advised we would hold on to it, but could not be responsible for damages.	2016-07-14 23:22:47.729601	ND92Do	Left laptop at law firm	HBINSON	UTHURMAN
44	closed	1	Law firm orientation scheudled for August 29, 2016. Please add to calendar.	2016-07-14 22:56:27.040536	\N	Law Firm Orientation	BV92301	LUDSTUEN
53	closed	7	Anastasia lost her insurance before contract deemed it would end.	2016-07-14 23:16:48.047511	44JU7666	Lost Insurance Benefits	JDANIELS	JHOWARD
56	canceled	8	Patient received an infection outside of the surgery site following surgery.	2016-07-14 23:22:02.420428	76RE2311	Post Surgery Infection	JDANIELS	HYUSUF
55	closed	7	Insurance was rejected even though doctor is listed as a doctor who accepts the insurance.	2016-07-14 23:18:59.840315	88YT7453	Hospital Rejects Insurance	JDANIELS	HUMBRELLA
54	canceled	7	Client's court date has been bumped up to August 20, 2016. Please call to notify client of this.	2016-07-14 23:17:12.836462	\N	Court date moved up.	TSMITH	TJONES
41	closed	6	Payment received in full. Marked as received.	2016-07-14 22:46:53.79538	\N	Payment received in full	LUDSTUEN	MVANG
51	canceled	1	Client reports he has a typo in his name	2016-07-14 23:12:33.422916	\N	Client Name Typo	RBEARD	RGREGORY
58	closed	9	Client discontinuing services with Legal Justice Alliance	2016-07-14 23:24:26.314424	\N	Client referral notice	BYANG	LUDSTUEN
59	closed	8	David received the wrong surgery due to a chart mix-up. He would like to be compensated for the procedures he will need to take to reverse the surgery.	2016-07-14 23:24:51.998271	43GG2367	Incorrect Surgery Received	JDANIELS	RTAYLOR
34	open	5	Carlos injured himself during a fall on a slippery floor at a retail store. He reports that the wet floor was not marked with a sign or any other form of warning.	2016-07-14 22:24:42.479192	VL92038	Fall Injury Report	JDANIELS	JDANIELS
38	open	7	Client contacted insurance for clarification related to the statement of insurance document we sent her several weeks ago. 	2016-07-14 22:36:04.256513	78HU7845	Statement of Representation Document	JDANIELS	GMORGANA
33	canceled	1	Aesop reported health problems from eating food left on the ground. Provider believes food was contaminated.	2016-07-14 22:12:37.480672	12345678	Contaminated Food Left on Ground	JDANIELS	MDIAMOND
43	closed	1	Aesop believe he received an infection from a nurse who persistently kept petting him during his minor surgery.	2016-07-14 22:55:13.95385	22KO4532	Post-surgery infection	JDANIELS	LUDSTUEN
\.


--
-- Data for Name: cases_notes; Type: TABLE DATA; Schema: public; Owner: lukasudstuen
--

COPY cases_notes (id, author, note, "timestamp", case_id, title) FROM stdin;
55	BTILLINGER	Client reports he has a typo in his name, and we will need to fix this.	2016-07-14 23:13:03.443697	51	Client Name Typo
56	VYANG	Client called back to say his name is in fact not spelled incorrecty, and that he was distracted by a passing car.	2016-07-14 23:14:08.483896	51	Name not misspelled
57	JDANIELS	Settlement was given to Tobias for accident and further damages.	2016-07-14 23:14:16.393638	52	Settled
59	RGREGORY	Called client to advise court date has been moved up. Client confirmed this will be OK for her schedule, and she will be able to come in time.	2016-07-14 23:18:43.149691	54	Confirming Court Date Reschedule
60	TBERG	Courthouse called back, and advised the hearing will not be rescheduled, as originally thought. Please call client to confirm the original time.	2016-07-14 23:19:50.297308	54	Reschedule not correct
61	VHUDSON	Client confirms the original schedule is OK with her, and she wil be attending court, as planned. Please notify lead attorney.	2016-07-14 23:19:50.297308	54	Client confirming original schedule
27	JDANIELS	Bill was 50,000 dollars in stomach pumping. Patient is now fine, but must set up payment plan.	2016-07-14 22:13:34.929168	33	Hospital Bill
28	BCOFFEE	Client reports he has not received an invoice yet. Please send at earliest convenience.	2016-07-14 22:22:23.289711	33	Client Invoice
29	CSMITH	LVM. Client not available.	2016-07-14 22:23:29.702937	33	Communication Attempt
30	MYINSON	Client reports he had a bad day at work because treats were not available. Please contact client at earliest convenience to discuss.	2016-07-14 22:25:10.890162	33	Bones out of stock
31	JDANIELS	A suit has been filed for injury compensation for this incident.	2016-07-14 22:25:18.51543	34	Legal Action Started
32	YRINGMAN	LVM. Client was not available at time of calling.	2016-07-14 22:29:32.228828	35	Attempted to contact client.
33	YRINGMAN	Attempted to call client again this afternoon. Was not available.	2016-07-14 22:30:24.087379	35	Again attempted to contact
34	JDANIELS	We were able to get the bill updated to reflect the correct services given to Tobias.	2016-07-14 22:32:45.502086	36	Hospital Bill Updated
35	TYINSON	Client address has been updated as per your request. 	2016-07-14 22:35:54.157158	37	Client address updated
37	TGUINNESS	Client provided the incorrect address. Please ignore this request. Cancelling case.	2016-07-14 22:36:56.912729	37	Incorrect Address
38	TROOSEVELT	Client was not available at the time we called. Left voicemail.	2016-07-14 22:44:08.095767	39	Attempted to contact Client
39	RVADER	Client confirmed this smaller payment amount is not ideal, but OK. Please proceed with processing.	2016-07-14 22:44:51.680733	39	Client confirmed settlement
40	JDANIELS	Hospital legal department has asked for a meeting discuss the nature of this suit.	2016-07-14 22:45:20.720827	40	Disputes Begin
41	LUDSTUEN	Closing case. Payment has been received.	2016-07-14 22:48:21.94983	41	Payment Received
42	TPHILBERT	Closing case, situation has been resolved.	2016-07-14 22:52:04.283112	36	Closing Case
43	JDANIELS	Case #12345678 was closed with the verdict in favor of Rhonda Sturkie on August 12, 2015. She was paid for all damages.	2016-07-14 22:53:03.452905	42	Case Closed
44	MFINSTER	Payment has been processed. Please record.	2016-07-14 22:54:43.227217	39	Payment Record Request
45	JDANIELS	Aesop was compensated for all damages incurred from the infection received during his surgery.	2016-07-14 22:56:26.614646	43	Damages Paid
46	JDANIELS	The hospital offered a settlement of 200,000 dollars in compensation before suit filings were pursued.	2016-07-14 23:00:45.587064	45	Hospital Settlement
49	PSMITH	Client has mailed us a notice indicating he cannot sign our paperwork with his paws, and will need special accomodation. Please reserach opportunities to assist.	2016-07-14 23:09:01.26407	48	Accomodation Notice
50	VROQUEFORT	We are able to accept signatures by stamp.	2016-07-14 23:09:32.270461	48	Stamps Available
52	PSMITH	Notifying client by mail that we are able to accept stamps.	2016-07-14 23:09:54.83712	48	Notifying Client
53	TSMITH	Client indicated he accepts our offer, and will sign the letter with a stamp. He will come to the office on Tuesday, August 29, 2016.	2016-07-14 23:11:12.370373	48	Client Accepts
54	JDANIELS	Records were found on March 21, 2016.	2016-07-14 23:11:32.240023	50	Hospital Found Records
63	JDANIELS	Client decided to not move forward with suit.	2016-07-14 23:22:52.182324	56	Case Cancelled
64	LUDSTUEN	Client reports her sister will be transferring to Legal Justice Alliance due to bad experience with other law firm. Please assist.	2016-07-14 23:25:26.661833	58	Client referral notice
65	JDANIELS	Compensation Received.	2016-07-14 23:25:30.899955	59	Case Closed
67	LUDSTUEN	Please reach out to client to discuss orientation. Client has not completed required paperwork.	2016-07-16 21:44:03.602791	44	Please reach out re: Orientation
47	JDANIELS	Hospital paid additional charges. Case created in error. Closing case.	2016-07-14 23:04:02.706814	46	Additional Charges Reversed
48	JDANIELS	Updated address in database. Closing case.	2016-07-14 23:06:50.844461	47	Updated Address
51	JDANIELS	Please reach out to client to confirm he is aware of changes in his insurance policy. Insurance company threatens to file litigation on August 22, 2016.	2016-07-14 23:09:41.237064	49	Case Filed
69	VYANG	Please advise client that we are unable to move forward without the statement of representation document. This is a standard practice among many law firms. Please advise client if she does not want to fill out the statement of representation document, she is welcome to obtain legal services elsewhere.	2016-07-18 00:18:04.329744	38	Advice: Lead Attorney
58	JDANIELS	Please reach out to client to discuss options for continuing legal services while insurance is in flux.	2016-07-14 23:17:11.49228	53	Please reach out to client to discuss options for continuing legal services while insurance is in flux.
62	JDANIELS	Upon further review, hospital will work with client on insurance claim. No further action required.	2016-07-14 23:19:52.369144	55	Hospital will accept insurance claim
36	JDANIELS	Client claims she does not underestand why it is necessary to have a statement of representation document. Client is concerned signing this document will indicate she is signing away her rights to manage the case. Consulting with lead attorney on options for moving forward. 	2016-07-14 22:36:47.569055	38	Client doesn't understand document
70	LUDSTUEN	Connected with client to advise of options related to her statement of representation document. Client has elected to continue using services with the Legal Justice Alliance, and thanks us for supporting her during this difficult time. Client says she will send over a copy of her statement of representation by email within the next few hours.	2016-07-18 00:19:16.258131	38	Advised client of options
71	LUDSTUEN	Received via email a signed letter of representation from client. Please add this document to the client's digital file. Please close case when completed.	2016-07-18 00:20:50.32448	38	Signed letter of representation received
72	LUDSTUEN	Attempted to reach out to client once. LVM.	2016-07-18 00:21:23.057287	44	Attempt 1 to reach out to client
74	LUDSTUEN	No questions from client.	2016-07-18 11:39:42.051928	44	Confirmed Orientation
75	LUDSTUEN	Confirm why quality of treats is problematic.	2016-07-18 11:41:31.086688	70	Please reach out to client
\.


--
-- Name: cases_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lukasudstuen
--

SELECT pg_catalog.setval('cases_notes_id_seq', 75, true);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: lukasudstuen
--

COPY clients (id, first_name, last_name, address, city, state, email, phone, address2) FROM stdin;
5	Carlos	Quintero	34 Sugarbush Lane	Newark	New Jersey	cquintero48@yahoo.com	6784568823	Suite 10
6	Tobias	Gutsche	100 Dalmation Avenue	Wilmington	North Carolina	TGustche87@gmail.com	7654359087	\N
7	Anastasia	Howard	678 Verde Road	Miami	Florida	Anastasia.Angel@icloud.com	6785421234	Apt. 786
8	David	Maximillion	3 Harvard Street	Savannah	Idaho	kiitonga.h@yahoo.com	6324537612	\N
9	Rhonda	Sturkie	76 Hunter Avenue	Juniper	New York	SturkieTurkey@gmail.com	7894522389	\N
1	Aesop	P.W. Corgi	522 Dog Way	Minneapolis	MN	BallinAesop818@gmail.com	95255512121	APT 12
\.


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lukasudstuen
--

SELECT pg_catalog.setval('clients_id_seq', 9, true);


--
-- Data for Name: insurers; Type: TABLE DATA; Schema: public; Owner: lukasudstuen
--

COPY insurers (id, provider, first_name, last_name, phone, email, client_id, provider_type, notes, claim_number) FROM stdin;
15	Best	Bob	Jones	92038404	Bob.Jones@google.com	2	Claim MGMT	asdf	90d0s
16	Wysteria United	Geneva	Vandemdeen	7865426827	LVandem@wysteria.com	5	Corporate Insurance	Insurance is provide to Carlos via his job benefits and compensation.	85TY78889
17	Healthy Lives LLC	Shelby	Brown	9987021345	shay.brown@hlllc.com	6	Medicare Provider	Customer has recently been enrolled in this insurance 3 months ago.	67RT7865
19	Enlightened Health Services	Jenna	Nienstedt	9012347853	wiggles.nien@gmail.com	7	Non-Profit Health Org	Insurance is only able to cover very few instances of health issues. Contact to verify its applicability.	36UV7822
18	American Family Insurance	Bill	Thomson	7287474727	BThomson@AmFam.com	5	Home Insurance	Only contact on Mondays, Wednesdays and Fridays	KD0383012
20	MetLife	Jill	Ronningberg	7260370472	JRonn@MetLife.com	5	Auto Insurance	Typically works remotely	NV83921
21	Wysteria Health United	Jenny	Anyasi	5671267892	janyasi@aol.com	8	Corporate Insurance	Corporate insurance provided by customers work benefits and compensation.	99WE3689
22	Gobble Gobble Insurance	Ian	Sullivan	6028009342	ISully@gobble.com	9	Civilian Insurance	Ian is a contractor for multiple insurance companies, be sure to specify which insurance company you are calling about.	46WI3476
23	Pet Sure, Inc	Timothy	Binnes	19125551212	TBinnes@PetSure.com	6	Pet Insurance	Provides benefits only to Pembroke Welsch Corgis.	\N
24	American Family	Juanamaria	CordonesCook	573191023	JuanaMaria@AmericanFamily.com.com	1	Insurance	Was available one time,but not since then.	MN82929
25	Corgis United	Wiggles	Occasionally	6125551212	SirWiggles@CorgisUnited.com	1	Corgi Unity Group	Representation confirmed.	NV92901
\.


--
-- Name: insurers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lukasudstuen
--

SELECT pg_catalog.setval('insurers_id_seq', 25, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lukasudstuen
--

COPY users (id, username, password) FROM stdin;
7	VYANG72	$2a$10$85W6E1ZpZw2TSN0usK6xpORtsvnh4fFHSttDPeDVXTyBkmy8CDENW
8	LUDSTUEN	$2a$10$Qa/a6VSXmuo2WhD6I5uFXOwTvfKDtc9F.Lksv9wA3NGBbGPI8dwyu
9	JDANIELS	$2a$10$4Ik9TAjspYNzVJ94ibGe4O.cErO6oQu9pLPk6Co7qRszyD/C5yggC
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lukasudstuen
--

SELECT pg_catalog.setval('users_id_seq', 9, true);


--
-- Name: cases_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY cases_notes
    ADD CONSTRAINT cases_notes_pkey PRIMARY KEY (id);


--
-- Name: cases_pkey; Type: CONSTRAINT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY cases_meta
    ADD CONSTRAINT cases_pkey PRIMARY KEY (id);


--
-- Name: clients_pkey; Type: CONSTRAINT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: insurers_pkey; Type: CONSTRAINT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY insurers
    ADD CONSTRAINT insurers_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: lukasudstuen
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: public; Type: ACL; Schema: -; Owner: lukasudstuen
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM lukasudstuen;
GRANT ALL ON SCHEMA public TO lukasudstuen;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


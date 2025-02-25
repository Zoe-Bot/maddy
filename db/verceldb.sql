--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

--
-- Name: FeedbackType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."FeedbackType" AS ENUM (
    'question',
    'nothing_understood'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Feedback" (
    id integer NOT NULL,
    "slidesetId" integer NOT NULL,
    page integer NOT NULL,
    "userId" text NOT NULL,
    "feedbackType" public."FeedbackType" NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Feedback_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Feedback_id_seq" OWNED BY public."Feedback".id;


--
-- Name: Rating; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Rating" (
    id integer NOT NULL,
    "slidesetId" integer NOT NULL,
    page integer NOT NULL,
    "userId" text NOT NULL,
    stars integer NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Rating_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Rating_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Rating_id_seq" OWNED BY public."Rating".id;


--
-- Name: Slideset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Slideset" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "pdfUrl" text NOT NULL,
    "uploadDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Slideset_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Slideset_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Slideset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Slideset_id_seq" OWNED BY public."Slideset".id;


--
-- Name: Feedback id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Feedback" ALTER COLUMN id SET DEFAULT nextval('public."Feedback_id_seq"'::regclass);


--
-- Name: Rating id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rating" ALTER COLUMN id SET DEFAULT nextval('public."Rating_id_seq"'::regclass);


--
-- Name: Slideset id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Slideset" ALTER COLUMN id SET DEFAULT nextval('public."Slideset_id_seq"'::regclass);


--
-- Data for Name: Feedback; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Feedback" (id, "slidesetId", page, "userId", "feedbackType", "timestamp") FROM stdin;
207	61	10	32708249-87b8-43b0-adb7-0a5f26388660	nothing_understood	2024-06-18 09:54:40.98
208	61	6	94a391e2-ae83-4492-964e-8d1d2684596b	nothing_understood	2024-06-18 09:54:52.261
209	61	12	0426b13c-b1da-4e33-a639-19477b545dc4	question	2024-06-18 09:55:13.748
210	61	10	9d8d4e31-8356-408d-9af7-133505f8a1ec	question	2024-06-18 09:55:15.619
212	61	8	ce239fee-c1ca-4311-8801-5dd64d2ab69b	nothing_understood	2024-06-18 09:55:19.662
214	61	12	32708249-87b8-43b0-adb7-0a5f26388660	nothing_understood	2024-06-18 09:55:28.789
216	61	6	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:55:33.22
217	61	8	f0498e18-d241-4019-b6e5-59eee838badb	nothing_understood	2024-06-18 09:55:52.636
220	61	8	7e8e1025-854a-40ef-b54d-9e9d8f696563	question	2024-06-18 09:56:00.17
221	61	8	83e05a08-323d-48ce-99ba-5dbbd978799e	question	2024-06-18 09:56:01.671
222	61	8	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:56:02.277
223	61	14	32708249-87b8-43b0-adb7-0a5f26388660	nothing_understood	2024-06-18 09:56:07.145
224	61	10	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:56:23.498
225	61	10	ce239fee-c1ca-4311-8801-5dd64d2ab69b	nothing_understood	2024-06-18 09:56:26.488
226	61	12	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:56:30.847
227	61	14	0cea2d77-a309-4220-b49c-dcc18750b99f	nothing_understood	2024-06-18 09:56:31.522
228	61	14	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:56:39.312
229	61	16	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:56:47.772
231	61	18	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:56:55.281
232	61	8	2ed5be84-4c9e-4c6d-b688-6289e2467856	nothing_understood	2024-06-18 09:56:58.114
233	61	14	0426b13c-b1da-4e33-a639-19477b545dc4	nothing_understood	2024-06-18 09:57:01.819
234	61	20	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:57:02.869
235	61	22	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:57:13.944
236	61	24	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:57:22.398
237	61	10	f0498e18-d241-4019-b6e5-59eee838badb	nothing_understood	2024-06-18 09:57:26.06
238	61	8	761e9f96-5360-4250-aba5-cfe69c915a7a	nothing_understood	2024-06-18 09:57:28.738
239	61	26	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:57:32.05
240	61	12	ce239fee-c1ca-4311-8801-5dd64d2ab69b	question	2024-06-18 09:57:39.121
241	61	28	2dc9179a-edbc-404e-b991-cabf6c247d15	question	2024-06-18 09:57:39.835
242	61	8	94a391e2-ae83-4492-964e-8d1d2684596b	nothing_understood	2024-06-18 09:57:48.29
243	61	10	7e8e1025-854a-40ef-b54d-9e9d8f696563	nothing_understood	2024-06-18 09:58:02.185
244	61	8	08c5e12e-b946-443a-bbf0-7271921bf592	question	2024-06-18 09:58:26.154
245	61	2	6919115a-171b-40c2-a71a-a0ee11ace343	nothing_understood	2024-06-18 09:58:31.742
246	61	12	f0498e18-d241-4019-b6e5-59eee838badb	nothing_understood	2024-06-18 09:58:53.89
247	61	10	94a391e2-ae83-4492-964e-8d1d2684596b	nothing_understood	2024-06-18 09:59:02.085
248	61	14	f0498e18-d241-4019-b6e5-59eee838badb	nothing_understood	2024-06-18 09:59:44.959
249	61	12	7e8e1025-854a-40ef-b54d-9e9d8f696563	question	2024-06-18 09:59:51.476
250	61	10	83e05a08-323d-48ce-99ba-5dbbd978799e	question	2024-06-18 10:00:06.249
252	61	12	94a391e2-ae83-4492-964e-8d1d2684596b	question	2024-06-18 10:00:18.212
253	61	8	78ae80f6-af3e-4bc2-b690-dd475bb3a000	nothing_understood	2024-06-18 10:00:39.624
254	61	12	b19ac3e1-8b2d-467b-8689-af4fd357d3ae	question	2024-06-18 10:01:12.839
255	61	14	761e9f96-5360-4250-aba5-cfe69c915a7a	nothing_understood	2024-06-18 10:01:41.169
256	61	14	94a391e2-ae83-4492-964e-8d1d2684596b	question	2024-06-18 10:02:02.141
257	61	8	58e7e4f9-0d87-4432-81af-3e326ff17b29	question	2024-06-18 10:02:34.895
258	61	10	78ae80f6-af3e-4bc2-b690-dd475bb3a000	nothing_understood	2024-06-18 10:04:27.39
260	61	8	933eb83f-c870-427c-b1df-88967462f906	nothing_understood	2024-06-18 10:09:14.564
261	61	10	08c5e12e-b946-443a-bbf0-7271921bf592	nothing_understood	2024-06-18 10:09:55.9
267	61	14	08c5e12e-b946-443a-bbf0-7271921bf592	nothing_understood	2024-06-18 10:13:14.618
268	61	8	94a7e18b-27a3-4847-9392-c7a10cdc464d	nothing_understood	2024-06-18 10:53:26.514
150	61	2	0cea2d77-a309-4220-b49c-dcc18750b99f	question	2024-06-18 09:51:02.619
151	61	2	0426b13c-b1da-4e33-a639-19477b545dc4	nothing_understood	2024-06-18 09:51:15.858
152	61	2	32708249-87b8-43b0-adb7-0a5f26388660	nothing_understood	2024-06-18 09:51:28.593
154	61	2	ce239fee-c1ca-4311-8801-5dd64d2ab69b	question	2024-06-18 09:51:53.688
156	61	2	f0498e18-d241-4019-b6e5-59eee838badb	nothing_understood	2024-06-18 09:51:58.329
158	61	2	2dc9179a-edbc-404e-b991-cabf6c247d15	nothing_understood	2024-06-18 09:52:01.403
162	61	6	0426b13c-b1da-4e33-a639-19477b545dc4	question	2024-06-18 09:52:19.617
163	61	12	b1ad9116-dc6b-4c06-a6ce-a4e0df2adf6c	question	2024-06-18 09:52:21.67
172	61	4	f0498e18-d241-4019-b6e5-59eee838badb	nothing_understood	2024-06-18 09:53:00.64
173	61	8	0426b13c-b1da-4e33-a639-19477b545dc4	nothing_understood	2024-06-18 09:53:01.567
174	61	2	95c490d2-e91f-42e0-852e-838f78a493f2	question	2024-06-18 09:53:02.037
175	61	4	ce239fee-c1ca-4311-8801-5dd64d2ab69b	question	2024-06-18 09:53:02.041
186	61	6	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	nothing_understood	2024-06-18 09:53:18.47
191	61	6	32708249-87b8-43b0-adb7-0a5f26388660	question	2024-06-18 09:53:24.163
197	61	8	0cea2d77-a309-4220-b49c-dcc18750b99f	nothing_understood	2024-06-18 09:53:34.768
198	61	4	761e9f96-5360-4250-aba5-cfe69c915a7a	nothing_understood	2024-06-18 09:53:37.747
201	61	10	0426b13c-b1da-4e33-a639-19477b545dc4	question	2024-06-18 09:53:49.727
202	61	8	9d8d4e31-8356-408d-9af7-133505f8a1ec	nothing_understood	2024-06-18 09:53:50.308
203	61	6	ce239fee-c1ca-4311-8801-5dd64d2ab69b	question	2024-06-18 09:54:02.581
204	61	10	0cea2d77-a309-4220-b49c-dcc18750b99f	nothing_understood	2024-06-18 09:54:15.334
205	61	6	f0498e18-d241-4019-b6e5-59eee838badb	question	2024-06-18 09:54:18.063
206	61	8	32708249-87b8-43b0-adb7-0a5f26388660	nothing_understood	2024-06-18 09:54:18.351
\.


--
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Rating" (id, "slidesetId", page, "userId", stars, "timestamp") FROM stdin;
171	61	7	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:53:41.016
173	61	1	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:53:45.936
174	61	5	f0498e18-d241-4019-b6e5-59eee838badb	2	2024-06-18 09:53:45.941
175	61	9	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:53:47.87
177	61	7	7e8e1025-854a-40ef-b54d-9e9d8f696563	4	2024-06-18 09:53:51.341
194	61	11	0426b13c-b1da-4e33-a639-19477b545dc4	4	2024-06-18 09:54:29.022
155	61	5	32708249-87b8-43b0-adb7-0a5f26388660	4	2024-06-18 09:52:44.3
176	61	7	b19ac3e1-8b2d-467b-8689-af4fd357d3ae	4	2024-06-18 09:53:49.8
156	61	3	2dc9179a-edbc-404e-b991-cabf6c247d15	3	2024-06-18 09:52:45.224
180	61	7	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	4	2024-06-18 09:53:57.352
181	61	11	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:01.186
183	61	9	0cea2d77-a309-4220-b49c-dcc18750b99f	1	2024-06-18 09:54:03.098
184	61	13	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:08.692
185	61	7	32708249-87b8-43b0-adb7-0a5f26388660	1	2024-06-18 09:54:09.674
186	61	15	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:12.796
188	61	7	83e05a08-323d-48ce-99ba-5dbbd978799e	2	2024-06-18 09:54:16.592
189	61	5	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:54:17.944
190	61	9	9d8d4e31-8356-408d-9af7-133505f8a1ec	2	2024-06-18 09:54:20.169
191	61	17	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:20.842
192	61	5	94a391e2-ae83-4492-964e-8d1d2684596b	4	2024-06-18 09:54:20.98
193	61	3	95c490d2-e91f-42e0-852e-838f78a493f2	3	2024-06-18 09:54:21.255
195	61	19	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:29.765
196	61	9	32708249-87b8-43b0-adb7-0a5f26388660	1	2024-06-18 09:54:30.153
197	61	5	761e9f96-5360-4250-aba5-cfe69c915a7a	3	2024-06-18 09:54:35.657
198	61	21	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:37.523
199	61	9	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	3	2024-06-18 09:54:43.308
200	61	11	0cea2d77-a309-4220-b49c-dcc18750b99f	3	2024-06-18 09:54:43.644
201	61	7	ce239fee-c1ca-4311-8801-5dd64d2ab69b	4	2024-06-18 09:54:46.156
202	61	23	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:49.043
203	61	11	32708249-87b8-43b0-adb7-0a5f26388660	1	2024-06-18 09:54:54.945
204	61	25	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:54:58.977
205	61	7	f0498e18-d241-4019-b6e5-59eee838badb	2	2024-06-18 09:55:00.668
206	61	27	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:55:04.212
93	61	1	9b13a495-5da1-4ebf-8aa4-be393e340b5c	5	2024-06-18 09:49:09.415
207	61	7	bffe0d9b-5842-40db-a576-dc88260eebc4	5	2024-06-18 09:55:12.365
95	61	1	0cea2d77-a309-4220-b49c-dcc18750b99f	5	2024-06-18 09:50:26.509
96	61	1	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	5	2024-06-18 09:50:27.088
97	61	1	94a391e2-ae83-4492-964e-8d1d2684596b	5	2024-06-18 09:50:44.279
98	61	1	0426b13c-b1da-4e33-a639-19477b545dc4	5	2024-06-18 09:50:48.331
99	61	1	83e05a08-323d-48ce-99ba-5dbbd978799e	5	2024-06-18 09:50:50.026
101	61	1	32708249-87b8-43b0-adb7-0a5f26388660	5	2024-06-18 09:51:12.103
103	61	1	2ed5be84-4c9e-4c6d-b688-6289e2467856	5	2024-06-18 09:51:12.461
157	61	5	0cea2d77-a309-4220-b49c-dcc18750b99f	4	2024-06-18 09:52:47.329
105	61	1	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	5	2024-06-18 09:51:13.334
158	61	1	65d807e9-12f2-4030-924a-74c275868cd2	5	2024-06-18 09:52:51.175
159	61	5	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	2	2024-06-18 09:52:55.958
160	61	3	761e9f96-5360-4250-aba5-cfe69c915a7a	3	2024-06-18 09:53:06.258
110	61	1	9d8d4e31-8356-408d-9af7-133505f8a1ec	5	2024-06-18 09:51:18.075
112	61	1	bffe0d9b-5842-40db-a576-dc88260eebc4	5	2024-06-18 09:51:19.783
161	61	9	0426b13c-b1da-4e33-a639-19477b545dc4	1	2024-06-18 09:53:19.174
162	61	7	9d8d4e31-8356-408d-9af7-133505f8a1ec	5	2024-06-18 09:53:20.722
116	61	1	ce239fee-c1ca-4311-8801-5dd64d2ab69b	5	2024-06-18 09:51:21.835
163	61	3	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:53:20.658
165	61	5	bffe0d9b-5842-40db-a576-dc88260eebc4	4	2024-06-18 09:53:24.445
166	61	5	9d8d4e31-8356-408d-9af7-133505f8a1ec	5	2024-06-18 09:53:28.213
122	61	1	7e8e1025-854a-40ef-b54d-9e9d8f696563	5	2024-06-18 09:51:24.799
123	61	3	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	4	2024-06-18 09:51:28.13
125	61	3	0426b13c-b1da-4e33-a639-19477b545dc4	4	2024-06-18 09:51:29.991
100	61	1	2dc9179a-edbc-404e-b991-cabf6c247d15	1	2024-06-18 09:50:55.328
127	61	1	f0498e18-d241-4019-b6e5-59eee838badb	2	2024-06-18 09:51:32.303
128	61	1	4947ebba-6213-4267-ba59-e1f84913d1fd	5	2024-06-18 09:51:34.339
129	61	3	0cea2d77-a309-4220-b49c-dcc18750b99f	3	2024-06-18 09:51:39.257
130	61	3	32708249-87b8-43b0-adb7-0a5f26388660	1	2024-06-18 09:51:44.764
131	61	3	7e8e1025-854a-40ef-b54d-9e9d8f696563	5	2024-06-18 09:51:51.929
132	61	5	0426b13c-b1da-4e33-a639-19477b545dc4	5	2024-06-18 09:51:52.088
133	61	1	eb6cb204-7940-4dcc-b9ec-162916124442	5	2024-06-18 09:51:52.758
134	61	3	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	3	2024-06-18 09:51:56.987
135	61	1	95c490d2-e91f-42e0-852e-838f78a493f2	5	2024-06-18 09:51:59.371
136	61	3	83e05a08-323d-48ce-99ba-5dbbd978799e	4	2024-06-18 09:51:59.658
137	61	1	08c5e12e-b946-443a-bbf0-7271921bf592	5	2024-06-18 09:51:59.73
138	61	3	9d8d4e31-8356-408d-9af7-133505f8a1ec	2	2024-06-18 09:52:01.187
139	61	3	933eb83f-c870-427c-b1df-88967462f906	5	2024-06-18 09:52:08.01
141	61	3	f0498e18-d241-4019-b6e5-59eee838badb	4	2024-06-18 09:52:26.634
167	61	7	0cea2d77-a309-4220-b49c-dcc18750b99f	2	2024-06-18 09:53:28.923
143	61	5	7e8e1025-854a-40ef-b54d-9e9d8f696563	5	2024-06-18 09:52:30.423
144	61	3	bffe0d9b-5842-40db-a576-dc88260eebc4	5	2024-06-18 09:52:30.564
145	61	1	78ae80f6-af3e-4bc2-b690-dd475bb3a000	5	2024-06-18 09:52:31.726
146	61	1	933eb83f-c870-427c-b1df-88967462f906	4	2024-06-18 09:52:33.438
168	61	5	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:53:31.075
148	61	5	83e05a08-323d-48ce-99ba-5dbbd978799e	4	2024-06-18 09:52:34.553
150	61	3	94a391e2-ae83-4492-964e-8d1d2684596b	3	2024-06-18 09:52:37.363
149	61	3	ce239fee-c1ca-4311-8801-5dd64d2ab69b	4	2024-06-18 09:52:35.856
152	61	7	0426b13c-b1da-4e33-a639-19477b545dc4	2	2024-06-18 09:52:37.77
153	61	1	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:52:37.83
154	61	1	761e9f96-5360-4250-aba5-cfe69c915a7a	5	2024-06-18 09:52:38.904
169	61	5	ce239fee-c1ca-4311-8801-5dd64d2ab69b	2	2024-06-18 09:53:31.086
170	61	3	78ae80f6-af3e-4bc2-b690-dd475bb3a000	4	2024-06-18 09:53:36.317
208	61	3	08c5e12e-b946-443a-bbf0-7271921bf592	3	2024-06-18 09:55:15.83
209	61	3	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:55:19.381
210	61	29	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:55:22.474
212	61	13	0cea2d77-a309-4220-b49c-dcc18750b99f	2	2024-06-18 09:55:30.156
214	61	11	9d8d4e31-8356-408d-9af7-133505f8a1ec	4	2024-06-18 09:55:36.328
211	61	3	eb6cb204-7940-4dcc-b9ec-162916124442	5	2024-06-18 09:55:23.251
215	61	5	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:55:38.863
216	61	31	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:55:46.201
217	61	5	78ae80f6-af3e-4bc2-b690-dd475bb3a000	3	2024-06-18 09:55:47.785
218	61	7	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:55:49.567
219	61	13	32708249-87b8-43b0-adb7-0a5f26388660	1	2024-06-18 09:55:50.324
221	61	11	6bd6d47a-f1d9-4c75-91e5-47a4b8a32144	3	2024-06-18 09:56:01.884
220	61	9	ce239fee-c1ca-4311-8801-5dd64d2ab69b	2	2024-06-18 09:56:01.652
223	61	5	08c5e12e-b946-443a-bbf0-7271921bf592	4	2024-06-18 09:56:08.897
224	61	33	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:56:19.108
225	61	9	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:56:19.439
226	61	13	0426b13c-b1da-4e33-a639-19477b545dc4	2	2024-06-18 09:56:24.978
227	61	11	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:56:26.864
228	61	7	94a391e2-ae83-4492-964e-8d1d2684596b	3	2024-06-18 09:56:29.49
229	61	9	f0498e18-d241-4019-b6e5-59eee838badb	3	2024-06-18 09:56:30.37
230	61	7	761e9f96-5360-4250-aba5-cfe69c915a7a	3	2024-06-18 09:56:30.949
231	61	35	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:56:32.201
232	61	13	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:56:34.961
233	61	5	eb6cb204-7940-4dcc-b9ec-162916124442	5	2024-06-18 09:56:36.315
235	61	37	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:56:42.725
236	61	15	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:56:43.516
234	61	9	7e8e1025-854a-40ef-b54d-9e9d8f696563	3	2024-06-18 09:56:42.622
238	61	39	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:56:50.85
239	61	7	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:56:51.003
240	61	17	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:56:51.789
241	61	41	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:56:55.627
243	61	11	ce239fee-c1ca-4311-8801-5dd64d2ab69b	1	2024-06-18 09:56:56.737
245	61	19	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:56:59.088
295	61	7	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	4	2024-06-18 09:59:46.726
246	61	43	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:00.527
249	61	45	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:05.711
250	61	21	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:57:06.888
251	61	9	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:57:08.295
252	61	47	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:09.951
255	61	23	2dc9179a-edbc-404e-b991-cabf6c247d15	2	2024-06-18 09:57:18.63
254	61	49	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:18.515
257	61	51	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:23.741
258	61	25	2dc9179a-edbc-404e-b991-cabf6c247d15	3	2024-06-18 09:57:26.575
260	61	53	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:28.425
296	61	11	761e9f96-5360-4250-aba5-cfe69c915a7a	4	2024-06-18 09:59:48.737
264	61	27	2dc9179a-edbc-404e-b991-cabf6c247d15	4	2024-06-18 09:57:35.553
263	61	55	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:33.006
297	61	9	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	4	2024-06-18 09:59:58.078
267	61	29	2dc9179a-edbc-404e-b991-cabf6c247d15	1	2024-06-18 09:57:43.779
268	61	5	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	5	2024-06-18 09:57:44.137
269	61	57	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:45.98
270	61	7	eb6cb204-7940-4dcc-b9ec-162916124442	5	2024-06-18 09:57:46.687
271	61	1	6919115a-171b-40c2-a71a-a0ee11ace343	5	2024-06-18 09:57:46.663
273	61	9	b19ac3e1-8b2d-467b-8689-af4fd357d3ae	5	2024-06-18 09:57:50.602
274	61	59	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:57:50.873
276	61	1	58e7e4f9-0d87-4432-81af-3e326ff17b29	5	2024-06-18 09:57:52.13
277	61	11	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:57:53.101
278	61	9	83e05a08-323d-48ce-99ba-5dbbd978799e	3	2024-06-18 09:57:54.865
279	61	11	f0498e18-d241-4019-b6e5-59eee838badb	5	2024-06-18 09:57:57.923
281	61	13	00130523-31d4-4bd6-8454-32c61a9a0ee0	5	2024-06-18 09:58:04.407
280	61	61	9b8ab373-f8b2-4f4a-81c0-4cf49c1f89da	5	2024-06-18 09:58:00.06
283	61	13	9d8d4e31-8356-408d-9af7-133505f8a1ec	2	2024-06-18 09:58:12.87
284	61	9	761e9f96-5360-4250-aba5-cfe69c915a7a	4	2024-06-18 09:58:15.338
285	61	3	58e7e4f9-0d87-4432-81af-3e326ff17b29	5	2024-06-18 09:58:25.714
286	61	11	7e8e1025-854a-40ef-b54d-9e9d8f696563	4	2024-06-18 09:58:29.693
287	61	9	94a391e2-ae83-4492-964e-8d1d2684596b	2	2024-06-18 09:58:33.614
288	61	13	ce239fee-c1ca-4311-8801-5dd64d2ab69b	3	2024-06-18 09:58:40.979
289	61	7	78ae80f6-af3e-4bc2-b690-dd475bb3a000	3	2024-06-18 09:58:49.584
290	61	5	95c490d2-e91f-42e0-852e-838f78a493f2	4	2024-06-18 09:58:58.732
291	61	5	58e7e4f9-0d87-4432-81af-3e326ff17b29	5	2024-06-18 09:59:06.729
292	61	13	f0498e18-d241-4019-b6e5-59eee838badb	2	2024-06-18 09:59:16.337
293	61	3	6919115a-171b-40c2-a71a-a0ee11ace343	3	2024-06-18 09:59:33.321
294	61	11	94a391e2-ae83-4492-964e-8d1d2684596b	2	2024-06-18 09:59:33.811
298	61	11	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	4	2024-06-18 10:00:06.963
299	61	13	d9886aa6-0d1e-4ff3-b8f0-546f58037bbd	4	2024-06-18 10:00:16.976
302	61	13	7e8e1025-854a-40ef-b54d-9e9d8f696563	2	2024-06-18 10:00:36.999
301	61	7	95c490d2-e91f-42e0-852e-838f78a493f2	3	2024-06-18 10:00:36.641
300	61	11	83e05a08-323d-48ce-99ba-5dbbd978799e	4	2024-06-18 10:00:30.007
305	61	13	94a391e2-ae83-4492-964e-8d1d2684596b	2	2024-06-18 10:01:11.292
306	61	9	bffe0d9b-5842-40db-a576-dc88260eebc4	5	2024-06-18 10:01:14.626
307	61	13	761e9f96-5360-4250-aba5-cfe69c915a7a	3	2024-06-18 10:01:33.656
308	61	13	b19ac3e1-8b2d-467b-8689-af4fd357d3ae	3	2024-06-18 10:02:16.582
309	61	13	83e05a08-323d-48ce-99ba-5dbbd978799e	2	2024-06-18 10:02:24.023
311	61	9	78ae80f6-af3e-4bc2-b690-dd475bb3a000	3	2024-06-18 10:02:30.787
312	61	5	6919115a-171b-40c2-a71a-a0ee11ace343	2	2024-06-18 10:03:32.354
313	61	11	78ae80f6-af3e-4bc2-b690-dd475bb3a000	3	2024-06-18 10:04:59.267
314	61	11	bffe0d9b-5842-40db-a576-dc88260eebc4	5	2024-06-18 10:05:27.596
315	61	5	933eb83f-c870-427c-b1df-88967462f906	4	2024-06-18 10:05:53.234
316	61	13	78ae80f6-af3e-4bc2-b690-dd475bb3a000	3	2024-06-18 10:06:33.475
318	61	11	eb6cb204-7940-4dcc-b9ec-162916124442	5	2024-06-18 10:08:18.372
319	61	7	933eb83f-c870-427c-b1df-88967462f906	3	2024-06-18 10:08:27.186
244	61	7	08c5e12e-b946-443a-bbf0-7271921bf592	5	2024-06-18 09:56:58.56
320	61	3	2ed5be84-4c9e-4c6d-b688-6289e2467856	5	2024-06-18 10:08:41.906
321	61	5	2ed5be84-4c9e-4c6d-b688-6289e2467856	5	2024-06-18 10:08:48.753
322	61	9	933eb83f-c870-427c-b1df-88967462f906	4	2024-06-18 10:10:06.287
317	61	11	08c5e12e-b946-443a-bbf0-7271921bf592	3	2024-06-18 10:08:11.632
325	61	5	4438135c-49a1-4922-90a2-1547a50076c9	4	2024-06-18 10:10:55.932
323	61	9	08c5e12e-b946-443a-bbf0-7271921bf592	3	2024-06-18 10:10:11.97
347	61	13	eb6cb204-7940-4dcc-b9ec-162916124442	5	2024-06-18 10:12:09.267
348	61	13	08c5e12e-b946-443a-bbf0-7271921bf592	5	2024-06-18 10:12:52.218
349	61	1	c99c6d10-e09e-4799-8e01-3542f27fbad9	4	2024-06-18 10:13:11.485
350	61	13	bffe0d9b-5842-40db-a576-dc88260eebc4	5	2024-06-18 10:14:41.964
352	61	3	4947ebba-6213-4267-ba59-e1f84913d1fd	4	2024-06-18 10:15:53.918
354	61	13	6919115a-171b-40c2-a71a-a0ee11ace343	2	2024-06-18 10:22:29.693
355	61	3	4438135c-49a1-4922-90a2-1547a50076c9	3	2024-06-18 10:34:09.773
356	61	7	94a7e18b-27a3-4847-9392-c7a10cdc464d	3	2024-06-18 10:53:09.689
357	61	11	933eb83f-c870-427c-b1df-88967462f906	5	2024-06-18 11:02:44.706
\.


--
-- Data for Name: Slideset; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Slideset" (id, name, description, "pdfUrl", "uploadDate") FROM stdin;
61	5. JavaScript Framework React	Grundlagen React, Komponenten, Event Handling, Conditional Rendering, Listen, State Handling, Formulare	https://8vt3uadzr0eirvxd.public.blob.vercel-storage.com/5-fo9VHwQmQbNhoaY3xLhwFQLJzaYtut.%20JavaScript%20Framework%20React	2024-06-13 15:34:42.269
\.


--
-- Name: Feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Feedback_id_seq"', 268, true);


--
-- Name: Rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Rating_id_seq"', 357, true);


--
-- Name: Slideset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Slideset_id_seq"', 61, true);


--
-- Name: Feedback Feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY (id);


--
-- Name: Rating Rating_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_pkey" PRIMARY KEY (id);


--
-- Name: Slideset Slideset_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Slideset"
    ADD CONSTRAINT "Slideset_pkey" PRIMARY KEY (id);


--
-- Name: Feedback_userId_slidesetId_page_feedbackType_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Feedback_userId_slidesetId_page_feedbackType_key" ON public."Feedback" USING btree ("userId", "slidesetId", page, "feedbackType");


--
-- Name: Rating_userId_slidesetId_page_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Rating_userId_slidesetId_page_key" ON public."Rating" USING btree ("userId", "slidesetId", page);


--
-- Name: Feedback Feedback_slidesetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT "Feedback_slidesetId_fkey" FOREIGN KEY ("slidesetId") REFERENCES public."Slideset"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Rating Rating_slidesetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_slidesetId_fkey" FOREIGN KEY ("slidesetId") REFERENCES public."Slideset"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


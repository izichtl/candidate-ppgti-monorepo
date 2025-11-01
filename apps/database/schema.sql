create table public.applications (
  id serial not null,
  candidate_id integer null,
  process_id integer null,
  line_id integer null,
  topic_id integer null,
  project_title text null,
  project_path text null,
  application_date timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint applications_pkey primary key (id),
  constraint applications_candidate_id_fkey foreign KEY (candidate_id) references candidates (id) on delete CASCADE,
  constraint applications_line_id_fkey foreign KEY (line_id) references research_lines (id),
  constraint applications_process_id_fkey foreign KEY (process_id) references selection_processes (id),
  constraint applications_topic_id_fkey foreign KEY (topic_id) references research_topics (id)
) TABLESPACE pg_default;



create table public.applications_verification (
  id serial not null,
  application_id integer null,
  process_id integer null,
  final_status character varying(50) null,
  personal_data boolean null default false,
  academic_data boolean null default false,
  documents_data boolean null default false,
  quota_data boolean null default false,
  project_data boolean null default false,
  verified_id_by integer null,
  verifier_if_registration character varying(50) null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone null default CURRENT_TIMESTAMP,
  justify character varying(200) null,
  constraint applications_verification_pkey primary key (id),
  constraint applications_verification_application_id_fkey foreign KEY (application_id) references applications (id) on delete CASCADE,
  constraint applications_verification_process_id_fkey foreign KEY (process_id) references selection_processes (id) on delete CASCADE,
  constraint fk_verified_id_by foreign KEY (verified_id_by) references committee_members (id) on delete set null
) TABLESPACE pg_default;

create trigger trigger_set_updated_at BEFORE
update on applications_verification for EACH row
execute FUNCTION set_updated_at_timestamp ();


create table public.candidate_documents (
  id serial not null,
  cpf character varying(20) not null,
  score_form character varying(255) null,
  diploma_certificate character varying(255) null,
  undergraduate_transcript character varying(255) null,
  electoral_clearance character varying(255) null,
  proof_of_residence character varying(255) null,
  military_clearance character varying(255) null,
  quota_declaration_admission character varying(255) null,
  quota_declaration_if character varying(255) null,
  registration_clearance character varying(255) null,
  employment_link character varying(255) null,
  constraint candidate_documents_pkey primary key (id),
  constraint candidate_documents_cpf_key unique (cpf),
  constraint candidate_documents_cpf_fkey foreign KEY (cpf) references candidates (cpf) on delete CASCADE
) TABLESPACE pg_default;

create table public.candidates (
  id serial not null,
  email character varying(255) not null,
  cpf character varying(20) not null,
  name character varying(255) null,
  social_name character varying(255) null,
  sex character varying(10) null,
  registration_ character varying(50) null,
  registration_state character varying(50) null,
  registration_place character varying(255) null,
  address character varying(255) null,
  address_number character varying(50) null,
  address_complement character varying(255) null,
  address_neighborhood character varying(255) null,
  address_city character varying(255) null,
  address_state character varying(50) null,
  address_zipcode character varying(20) null,
  cell_phone character varying(20) null,
  phone character varying(20) null,
  other_email character varying(255) null,
  education_level character varying(255) null,
  graduation_course character varying(255) null,
  graduation_year character varying(4) null,
  graduation_institution character varying(255) null,
  specialization_course character varying(255) null,
  specialization_year character varying(4) null,
  specialization_institution character varying(255) null,
  lattes_link character varying(255) null,
  quota_id integer null,
  constraint candidates_pkey primary key (id),
  constraint candidates_cpf_key unique (cpf),
  constraint candidates_email_key unique (email),
  constraint fk_quota foreign KEY (quota_id) references quotas (id)
) TABLESPACE pg_default;

create table public.committee_members (
  id serial not null,
  name character varying(255) not null,
  email character varying(255) not null,
  cpf character varying(14) not null,
  if_registration character varying(14) not null,
  password text not null,
  constraint committee_members_pkey primary key (id),
  constraint committee_members_cpf_key unique (cpf),
  constraint committee_members_email_key unique (email),
  constraint committee_members_if_registration_key unique (if_registration)
) TABLESPACE pg_default;

create table public.quotas (
  id serial not null,
  name character varying(255) not null,
  description character varying(500) null,
  constraint quotas_pkey primary key (id),
  constraint quotas_name_key unique (name)
) TABLESPACE pg_default;

create table public.research_lines (
  id serial not null,
  process_id integer not null,
  name character varying(255) not null,
  constraint research_lines_pkey primary key (id),
  constraint research_lines_process_id_fkey foreign KEY (process_id) references selection_processes (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.research_topics (
  id serial not null,
  line_id integer not null,
  name character varying(255) not null,
  constraint research_topics_pkey primary key (id),
  constraint research_topics_line_id_fkey foreign KEY (line_id) references research_lines (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.selection_processes (
  id serial not null,
  title character varying(255) not null,
  description text null,
  start_date date null,
  end_date date null,
  application_deadline date null,
  result_date date null,
  documents_required jsonb null default '[]'::jsonb,
  evaluation_criteria text null,
  contact_info text null,
  status character varying(20) null default 'draft'::character varying,
  program character varying(100) null,
  year character varying(20) null,
  semester character varying(20) null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  updated_at timestamp without time zone null default CURRENT_TIMESTAMP,
  edital text null default ''''''::text,
  constraint selection_processes_pkey primary key (id),
  constraint selection_processes_status_check check (
    (
      (status)::text = any (
        array[
          ('draft'::character varying)::text,
          ('published'::character varying)::text,
          ('closed'::character varying)::text
        ]
      )
    )
  )
) TABLESPACE pg_default;
-- 1 Função usada no trigger
create or replace function set_updated_at_timestamp()
returns trigger as $$
begin
  new.updated_at = current_timestamp;
  return new;
end;
$$ language plpgsql;

-- 2 Tabelas independentes
create table public.quotas (
  id serial primary key,
  name varchar(255) not null unique,
  description varchar(500)
);

create table public.committee_members (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null unique,
  cpf varchar(14) not null unique,
  if_registration varchar(14) not null unique,
  password text not null
);

create table public.selection_processes (
  id serial primary key,
  title varchar(255) not null,
  description text,
  start_date date,
  end_date date,
  application_deadline date,
  result_date date,
  documents_required jsonb default '[]'::jsonb,
  evaluation_criteria text,
  contact_info text,
  status varchar(20) default 'draft' check (status in ('draft','published','closed')),
  program varchar(100),
  year varchar(20),
  semester varchar(20),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  edital text default ''
);

-- 3 Tabelas dependentes
create table public.candidates (
  id serial primary key,
  email varchar(255) not null unique,
  cpf varchar(20) not null unique,
  name varchar(255),
  social_name varchar(255),
  sex varchar(10),
  registration_ varchar(50),
  registration_state varchar(50),
  registration_place varchar(255),
  address varchar(255),
  address_number varchar(50),
  address_complement varchar(255),
  address_neighborhood varchar(255),
  address_city varchar(255),
  address_state varchar(50),
  address_zipcode varchar(20),
  cell_phone varchar(20),
  phone varchar(20),
  other_email varchar(255),
  education_level varchar(255),
  graduation_course varchar(255),
  graduation_year varchar(4),
  graduation_institution varchar(255),
  specialization_course varchar(255),
  specialization_year varchar(4),
  specialization_institution varchar(255),
  lattes_link varchar(255),
  quota_id integer references quotas(id)
);

create table public.candidate_documents (
  id serial primary key,
  cpf varchar(20) not null unique references candidates(cpf) on delete cascade,
  score_form varchar(255),
  diploma_certificate varchar(255),
  undergraduate_transcript varchar(255),
  electoral_clearance varchar(255),
  proof_of_residence varchar(255),
  military_clearance varchar(255),
  quota_declaration_admission varchar(255),
  quota_declaration_if varchar(255),
  registration_clearance varchar(255),
  employment_link varchar(255)
);

create table public.research_lines (
  id serial primary key,
  process_id integer not null references selection_processes(id) on delete cascade,
  name varchar(255) not null
);

create table public.research_topics (
  id serial primary key,
  line_id integer not null references research_lines(id) on delete cascade,
  name varchar(255) not null
);

create table public.applications (
  id serial primary key,
  candidate_id integer references candidates(id) on delete cascade,
  process_id integer references selection_processes(id),
  line_id integer references research_lines(id),
  topic_id integer references research_topics(id),
  project_title text,
  project_path text,
  application_date timestamp default current_timestamp
);

create table public.applications_verification (
  id serial primary key,
  application_id integer references applications(id) on delete cascade,
  process_id integer references selection_processes(id) on delete cascade,
  final_status varchar(50),
  personal_data boolean default false,
  academic_data boolean default false,
  documents_data boolean default false,
  quota_data boolean default false,
  project_data boolean default false,
  verified_id_by integer references committee_members(id) on delete set null,
  verifier_if_registration varchar(50),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  justify varchar(200)
);

-- 4 Trigger
create trigger trigger_set_updated_at
before update on applications_verification
for each row
execute function set_updated_at_timestamp();

-- 4 Committee Basic User

-- insert into public.committee_members (name, email, cpf, if_registration, password)
-- values ('Usuário Comissão', 'comissao@if.edu.br', '12345678900', 'IF123456', crypt('senha123', gen_salt('bf')));

create extension if not exists pgcrypto;

-- insert into public.selection_processes (
--   title, description, start_date, end_date, application_deadline, status, program, year, semester
-- ) values (
--   'Processo Seletivo 2025/1',
--   'Seleção para o programa de mestrado 2025/1.',
--   '2025-10-01',
--   '2026-03-10',
--   '2025-12-25',
--   'published',
--   'Programa de Pós-Graduação',
--   '2025',
--   '1'
-- );

insert into public.quotas (id, name, description) values
(1, 'nao_optante', 'Não optante por sistema de cotas'),
(2, 'afro_ou_inde', 'Autodeclarado preto, pardo ou indígena'),
(3, 'pcd', 'Pessoa com deficiência'),
(4, 'servidor_if', 'Servidor do Instituto Federal');



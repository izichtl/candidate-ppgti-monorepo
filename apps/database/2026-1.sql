-- 1 Processo Seletivo
insert into public.selection_processes (
  title, description, start_date, end_date, application_deadline,
  status, program, year, semester, edital
) values (
  'Processo Seletivo MPTI 2026.1 – Chamamento Público',
  'Seleção para o mestrado profissional em tecnologia da informação com parceria de empresas – edital 46/2025.',
  '2025-10-01',
  '2026-03-10',
  '2025-12-25',
  'published',
  'PPGTI – Tecnologia da Informação',
  '2026',
  '1',
  'https://estudante.ifpb.edu.br/media/Edital_de_Abertura_YDOhikY.pdf'
);



-- Linhas de Pesquisa vinculadas ao processo 1
insert into public.research_lines (process_id, name) values
(1, 'Ciência de Dados e Inteligência Artificial (CDI)'),
(1, 'Gestão e Desenvolvimento de Sistemas (GDS)'),
(1, 'Redes e Sistemas Distribuídos (RSD)');



-- Temas da linha CDI (id = 1)
insert into public.research_topics (line_id, name) values
(1, 'Modelo de previsão da expansão urbana nos municípios da Paraíba (CAGEPA)'),
(1, 'Detecção de anomalias em operações de crédito consignado (CODATA)'),
(1, 'Nuvem ou On-Premises? Estudo de caso sobre infraestrutura ideal para aplicações com LLMs (SS Digital Informática)'),
(1, 'Text-to-SQL para Segurança Pública: geração automática de consultas a partir de registros de ocorrência (SS Digital Informática)'),
(1, 'Inteligência Artificial aplicada à gestão eleitoral (TRE-PB)'),
(1, 'Suporte à decisão judicial baseado em Inteligência Artificial (TRT 13ª Região)'),
(1, 'Detecção automatizada de fraudes em prestadoras de serviços de saúde (UNIMED-JP)'),
(1, 'Modelo preditivo para análise de risco de sinistralidade (UNIMED-JP)');

-- Temas da linha GDS (id = 2)
insert into public.research_topics (line_id, name) values
(2, 'Estratégias para integração e entrega contínua de software no setor público (CODATA)'),
(2, 'Desenvolvimento de software com Low-Code e No-Code: aumento da capacidade e da governança na transformação digital (TRE-PB)'),
(2, 'Apoio à conciliação: redesenhando a experiência do usuário na Justiça do Trabalho (TRT 13ª Região)'),
(2, 'Arquitetura de microsserviços para integração de sistemas de saúde (UNIMED-JP)'),
(2, 'Engenharia de software para portais de dados abertos em empresas públicas: arquitetura, governança e qualidade de serviços de publicação de dados');

-- Temas da linha RSD (id = 3)
insert into public.research_topics (line_id, name) values
(3, 'Framework para integração segura de dispositivos IoT heterogêneos (CAGEPA)'),
(3, 'Gestão e operação eficiente e segura de redes e serviços (CODATA)'),
(3, 'Detecção de anomalias em redes para aumento da segurança (SS Digital Informática)'),
(3, 'Avaliação e operação de infraestruturas hiperconvergentes sob os preceitos da HCI 4.0: análise comparativa entre soluções proprietárias e open source (TRE-PB)');


insert into public.committee_members (name, email, cpf, if_registration, password) values
('Izichtl Adm', 'izichtl.adm@ifpb.edu.br', '00000314159', '314159', 'iGHTsWXy4PreF6mp'),
('Bruno Neiva Moreno', 'bruno.neiva.moreno@ifpb.edu.br', '00001865638', '1865638', 'iGHTsWXy4PreF6mp'),
('Danyllo Wagner Albuquerque', 'danyllo.w.albuquerque@ifpb.edu.br', '00001060631', '1060631', 'iGHTsWXy4PreF6mp'),
('Diego Ernesto Rosa Pessoa', 'diego.rosa.pessoa@ifpb.edu.br', '00001863442', '1863442', 'iGHTsWXy4PreF6mp'),
('Francisco Dantas Nobre Neto', 'francisco.dantas.nobre@ifpb.edu.br', '00001962209', '1962209', 'iGHTsWXy4PreF6mp'),
('Francisco Petronio Alencar de Medeiros', 'francisco.petronio@ifpb.edu.br', '00001508373', '1508373', 'iGHTsWXy4PreF6mp');



insert into public.committee_members (name, email, cpf, if_registration, password) values
('Damires ADM', 'damires@ifpb.edu.br', '000001196487', '1196487', 'iGHTsWXy4PreF6mp');

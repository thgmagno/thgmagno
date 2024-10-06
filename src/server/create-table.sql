CREATE TABLE port_categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE port_technologies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE port_formations (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration_time INT NOT NULL,
    certificate_url VARCHAR(255)
);

CREATE TABLE port_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    slug VARCHAR(60) NOT NULL,
    created_at DATE NOT NULL,
    website_url VARCHAR(255),
    presentation_video_url VARCHAR(255)
);
-- ALTER TABLE port_projects ADD CONSTRAINT unique_slug UNIQUE (slug);
-- ALTER TABLE port_projects ADD COLUMN created_at DATE DEFAULT CURRENT_DATE NOT NULL;

CREATE TABLE port_formation_categories (
    formation_id INT REFERENCES port_formations(id) ON DELETE CASCADE,
    category_id INT REFERENCES port_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (formation_id, category_id)
);

CREATE TABLE port_project_technologies (
    project_id INT REFERENCES port_projects(id) ON DELETE CASCADE,
    technology_id INT REFERENCES port_technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

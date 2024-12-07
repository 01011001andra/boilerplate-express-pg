CREATE TABLE course_categories (
	id UUID DEFAULT uuid_generate_v4() NOT NULL,
	course_id UUID NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(id)
);
select * from course_category;
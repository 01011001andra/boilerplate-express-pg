CREATE TABLE course_category (
	id UUID DEFAULT uuid_generate_v4() NOT NULL,
	course_id UUID NOT NULL,
	category_id UUID,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id)
);

SELECT * FROM course_category;

INSERT INTO course_category(course_id, category_id)
VALUES('68c6f726-69a4-497c-96c7-eb54a1d03e02','c55d25af-0025-4568-b637-856bcc113e97');

DELETE FROM course_category
WHERE id='dbae6b66-7a66-4f0c-8548-d44d4f4ee0b0';

select * from categories;
CREATE DATABASE sqltodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    completed BOOLEAN
   

)
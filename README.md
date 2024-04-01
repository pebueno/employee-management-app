# Employee Management App

This is an Employee Management App built with TypeScript, Next.js, Context API, Material UI, PostgreSQL, and TypeORM.

## Getting Started

Follow these steps to set up the project:

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository from Git:

2. Navigate to the project directory:

   ```bash
   cd employee-management-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Navigate to the client directory:

   ```bash
   cd client
   ```

5. Install client dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory with the following content:

   ```plaintext
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   ```

   Replace `your_database_host`, `your_database_port`, `your_database_username`, `your_database_password`, and `your_database_name` with your actual database connection details.

### Database Setup

To set up the database, run the following commands in order:

1. Create a migration file for inserting employees:

   ```bash
   npm run typeorm migration:create ./src/migration/InsertEmployees
   ```

2. Generate a migration script:

   ```bash
   npm run typeorm migration:generate ./src/migration/InsertEmployees -d ./src/data-source
   ```

3. Apply the migration to the database:

   ```bash
   npm run typeorm migration:run -- -d ./src/data-source
   ```

   This will create the necessary tables and schema in your database.

Alternatively, you can use the following SQL script to manually create the database schema in PostgreSQL:

```sql
-- Create the employees database
CREATE DATABASE employees;

-- Switch to the employees database
\c employees;

-- Create the department table
CREATE TABLE IF NOT EXISTS department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Populate the department table
INSERT INTO department (name) VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Finance'),
    ('Engineering');

-- Create the employee table
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    departmentId INT NOT NULL,
    hireDate DATE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_department FOREIGN KEY (departmentId) REFERENCES department(id)
);

-- Alter the foreign key constraint on the employee table
ALTER TABLE employee
ADD CONSTRAINT fk_department
FOREIGN KEY (departmentId) REFERENCES department(id);

-- Populate the employee table
INSERT INTO employee (firstName, lastName, departmentId, hireDate, phone, address)
VALUES
    ('John', 'Doe', 1, '2023-05-15', '1234567890', '123 Main Street'),
    ('Jane', 'Smith', 2, '2022-09-20', '9876543210', '456 Elm Street'),
    ('Michael', 'Johnson', 3, '2024-01-10', '5555555555', '789 Oak Street'),
    ('Emily', 'Brown', 4, '2023-03-05', '7777777777', '321 Pine Street'),
    ('David', 'Lee', 4, '2022-07-12', '9999999999', '654 Maple Street'),
    ('Sarah', 'Wilson', 4, '2024-02-28', '1112223333', '987 Birch Street');
```

## Usage

Start the application by running in two different terminals:

```bash
npm run server
```
&
```bash
npm run client
```

Visit http://localhost:3000 in your web browser to access the app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

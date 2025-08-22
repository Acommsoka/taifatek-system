// // server.js

// // Import necessary packages
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const path = require('path'); // Add this at the top with other requires
// require('dotenv').config(); // Load environment variables from .env

// const app = express();

// // --- CONFIGURATION ---
// const PORT = process.env.PORT || 3001; // Use port from environment or default to 3001

// // --- DATABASE CONNECTION ---
// // Create a new pool of connections to the PostgreSQL database.
// // The connection string should be stored in an environment variable for security.
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false // Required for some cloud database providers
//   }
// });

// // --- MIDDLEWARE ---
// app.use(cors()); // Enable Cross-Origin Resource Sharing to allow frontend to connect
// app.use(express.json()); // Enable the server to parse JSON-formatted request bodies
// app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from ../public

// // --- API ROUTES (ENDPOINTS) ---

// // 1. GET /api/students - Fetch all students and their attendance
// app.get('/api/students', async (req, res) => {
//   try {
//     // SQL query to get all students
//     const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
//     res.status(200).json(result.rows); // Send the list of students as a JSON response
//   } catch (err) {
//     console.error('Error fetching students:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 2. POST /api/students - Register a new student
// app.post('/api/students', async (req, res) => {
//   const { name, email } = req.body;

//   // Basic validation
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }

//   try {
//     // Check if a student with the same email already exists
//     const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
//     if (existingStudent.rows.length > 0) {
//       return res.status(409).json({ error: 'A student with this email already exists.' });
//     }

//     // SQL query to insert a new student. Attendance is an empty JSON array by default.
//     const result = await pool.query(
//       'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, '[]'] // Store attendance as a JSON string array
//     );
//     res.status(201).json(result.rows[0]); // Send back the newly created student
//   } catch (err) {
//     console.error('Error registering student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 3. PUT /api/students/:id/attend - Mark attendance for a student
// app.put('/api/students/:id/attend', async (req, res) => {
//   const { id } = req.params;
//   const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

//   try {
//     // First, get the student's current attendance record
//     const studentResult = await pool.query('SELECT attendance FROM students WHERE id = $1', [id]);
//     if (studentResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }

//     let attendance = studentResult.rows[0].attendance; // This is a JSON array from the DB

//     // Check if attendance for today has already been marked
//     if (attendance.includes(today)) {
//       return res.status(409).json({ error: 'Attendance already marked for today.' });
//     }

//     // Add today's date to the attendance array
//     attendance.push(today);

//     // Update the student's record in the database with the new attendance array
//     const updateResult = await pool.query(
//       'UPDATE students SET attendance = $1 WHERE id = $2 RETURNING *',
//       [JSON.stringify(attendance), id] // Save the updated array back as a JSON string
//     );

//     res.status(200).json(updateResult.rows[0]); // Send back the updated student data
//   } catch (err) {
//     console.error('Error marking attendance:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // New POST route for /api/register-student
// app.post('/api/register-student', async (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }

//   try {
//     const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
//     if (existingStudent.rows.length > 0) {
//       return res.status(409).json({ error: 'A student with this email already exists.' });
//     }

//     const result = await pool.query(
//       'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, '[]']
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error registering student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // --- START THE SERVER ---
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });










// // server.js

// // Import necessary packages
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // --- CONFIGURATION ---
// const PORT = process.env.PORT || 3001;

// // --- DATABASE CONNECTION ---
// // Create a new pool of connections to the PostgreSQL database.
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// // --- MIDDLEWARE ---
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

// // --- API ROUTES (ENDPOINTS) ---

// // 1. GET /api/students - Fetch all students and their attendance
// app.get('/api/students', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching students:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 2. POST /api/students - Register a new student
// app.post('/api/students', async (req, res) => {
//   const { name, email } = req.body;

//   // Basic validation
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }

//   try {
//     // Check if a student with the same email already exists
//     const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
//     if (existingStudent.rows.length > 0) {
//       return res.status(409).json({ error: 'A student with this email already exists.' });
//     }

//     // SQL query to insert a new student. Attendance is an empty JSON array by default.
//     const result = await pool.query(
//       'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, '[]']
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error registering student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 3. PUT /api/students/:id/attend - Mark attendance for a student
// app.put('/api/students/:id/attend', async (req, res) => {
//   const { id } = req.params;
//   const today = new Date().toISOString().split('T')[0];

//   try {
//     // First, get the student's current attendance record
//     const studentResult = await pool.query('SELECT attendance FROM students WHERE id = $1', [id]);
//     if (studentResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }

//     const attendance = studentResult.rows[0].attendance;

//     // Check if attendance for today has already been marked
//     if (attendance.includes(today)) {
//       return res.status(409).json({ error: 'Attendance already marked for today.' });
//     }

//     // Add today's date to the attendance array
//     attendance.push(today);

//     // Update the student's record in the database with the new attendance array
//     const updateResult = await pool.query(
//       'UPDATE students SET attendance = $1 WHERE id = $2 RETURNING *',
//       [JSON.stringify(attendance), id]
//     );

//     res.status(200).json(updateResult.rows[0]);
//   } catch (err) {
//     console.error('Error marking attendance:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // --- START THE SERVER ---
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




































// // server.js

// // Import necessary packages
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // --- CONFIGURATION ---
// const PORT = process.env.PORT || 3001;

// // --- DATABASE CONNECTION ---
// // Create a new pool of connections to the PostgreSQL database.
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// // --- MIDDLEWARE ---
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

// // --- API ROUTES (ENDPOINTS) ---

// // 1. GET /api/students - Fetch all students and their attendance
// app.get('/api/students', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching students:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 2. POST /api/students - Register a new student
// app.post('/api/students', async (req, res) => {
//   const { name, email } = req.body;

//   // Basic validation
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }

//   try {
//     // Check if a student with the same email already exists
//     const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
//     if (existingStudent.rows.length > 0) {
//       return res.status(409).json({ error: 'A student with this email already exists.' });
//     }

//     // SQL query to insert a new student. Attendance is an empty JSON array by default.
//     const result = await pool.query(
//       'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, '[]']
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error registering student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 3. PUT /api/students/:id/attend - Mark attendance for a student
// app.put('/api/students/:id/attend', async (req, res) => {
//   const { id } = req.params;
//   const today = new Date().toISOString().split('T')[0];

//   try {
//     // First, get the student's current attendance record
//     const studentResult = await pool.query('SELECT attendance FROM students WHERE id = $1', [id]);
//     if (studentResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }

//     const attendance = studentResult.rows[0].attendance;

//     // Check if attendance for today has already been marked
//     if (attendance.includes(today)) {
//       return res.status(409).json({ error: 'Attendance already marked for today.' });
//     }

//     // Add today's date to the attendance array
//     attendance.push(today);

//     // Update the student's record in the database with the new attendance array
//     const updateResult = await pool.query(
//       'UPDATE students SET attendance = $1 WHERE id = $2 RETURNING *',
//       [JSON.stringify(attendance), id]
//     );

//     res.status(200).json(updateResult.rows[0]);
//   } catch (err) {
//     console.error('Error marking attendance:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 4. DELETE /api/students/:id - Delete a student by ID
// app.delete('/api/students/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }
//     res.status(200).json({ message: 'Student deleted successfully.', deletedStudent: result.rows[0] });
//   } catch (err) {
//     console.error('Error deleting student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // --- START THE SERVER ---
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





































// // server.js

// // Import necessary packages
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // --- CONFIGURATION ---
// const PORT = process.env.PORT || 3001;

// // --- DATABASE CONNECTION ---
// // Create a new pool of connections to the PostgreSQL database.
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// // --- MIDDLEWARE ---
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

// // --- UTILITY FUNCTION ---
// // Server-side email validation
// function isValidEmail(email) {
//     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
//     return emailRegex.test(email);
// }

// // --- API ROUTES (ENDPOINTS) ---

// // 1. GET /api/students - Fetch all students and their attendance
// app.get('/api/students', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching students:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 2. POST /api/students - Register a new student
// app.post('/api/students', async (req, res) => {
//   const { name, email } = req.body;

//   // Basic validation
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }
  
//   // Server-side email validation
//   if (!isValidEmail(email)) {
//     return res.status(400).json({ error: 'Please enter a valid email address.' });
//   }

//   try {
//     // Check if a student with the same email already exists
//     const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
//     if (existingStudent.rows.length > 0) {
//       return res.status(409).json({ error: 'A student with this email already exists.' });
//     }

//     // SQL query to insert a new student. Attendance is an empty JSON array by default.
//     const result = await pool.query(
//       'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, '[]']
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error registering student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 3. PUT /api/students/:id/attend - Mark attendance for a student
// app.put('/api/students/:id/attend', async (req, res) => {
//   const { id } = req.params;
//   const today = new Date().toISOString().split('T')[0];

//   try {
//     // First, get the student's current attendance record
//     const studentResult = await pool.query('SELECT attendance FROM students WHERE id = $1', [id]);
//     if (studentResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }

//     const attendance = studentResult.rows[0].attendance;

//     // Check if attendance for today has already been marked
//     if (attendance.includes(today)) {
//       return res.status(409).json({ error: 'Attendance already marked for today.' });
//     }

//     // Add today's date to the attendance array
//     attendance.push(today);

//     // Update the student's record in the database with the new attendance array
//     const updateResult = await pool.query(
//       'UPDATE students SET attendance = $1 WHERE id = $2 RETURNING *',
//       [JSON.stringify(attendance), id]
//     );

//     res.status(200).json(updateResult.rows[0]);
//   } catch (err) {
//     console.error('Error marking attendance:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 4. DELETE /api/students/:id - Delete a student by ID
// app.delete('/api/students/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }
//     res.status(200).json({ message: 'Student deleted successfully.', deletedStudent: result.rows[0] });
//   } catch (err) {
//     console.error('Error deleting student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // --- START THE SERVER ---
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


















































// // server.js

// // Import necessary packages
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// const path = require('path');
// const validator = require('validator'); // Import the validator library
// require('dotenv').config();

// const app = express();

// // --- CONFIGURATION ---
// const PORT = process.env.PORT || 3001;

// // --- DATABASE CONNECTION ---
// // Create a new pool of connections to the PostgreSQL database.
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// // --- MIDDLEWARE ---
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

// // --- API ROUTES (ENDPOINTS) ---

// // 1. GET /api/students - Fetch all students and their attendance
// app.get('/api/students', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching students:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 2. POST /api/students - Register a new student
// app.post('/api/students', async (req, res) => {
//   const { name, email } = req.body;

//   // Basic validation
//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }

//   // Server-side email validation using validator.js
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ error: 'Please enter a valid email address.' });
//   }

//   try {
//     // Check if a student with the same email already exists
//     const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
//     if (existingStudent.rows.length > 0) {
//       return res.status(409).json({ error: 'A student with this email already exists.' });
//     }

//     // SQL query to insert a new student. Attendance is an empty JSON array by default.
//     const result = await pool.query(
//       'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, '[]']
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error registering student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 3. PUT /api/students/:id/attend - Mark attendance for a student
// app.put('/api/students/:id/attend', async (req, res) => {
//   const { id } = req.params;
//   const today = new Date().toISOString().split('T')[0];

//   try {
//     // First, get the student's current attendance record
//     const studentResult = await pool.query('SELECT attendance FROM students WHERE id = $1', [id]);
//     if (studentResult.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }

//     const attendance = studentResult.rows[0].attendance;

//     // Check if attendance for today has already been marked
//     if (attendance.includes(today)) {
//       return res.status(409).json({ error: 'Attendance already marked for today.' });
//     }

//     // Add today's date to the attendance array
//     attendance.push(today);

//     // Update the student's record in the database with the new attendance array
//     const updateResult = await pool.query(
//       'UPDATE students SET attendance = $1 WHERE id = $2 RETURNING *',
//       [JSON.stringify(attendance), id]
//     );

//     res.status(200).json(updateResult.rows[0]);
//   } catch (err) {
//     console.error('Error marking attendance:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 4. DELETE /api/students/:id - Delete a student by ID
// app.delete('/api/students/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'Student not found.' });
//     }
//     res.status(200).json({ message: 'Student deleted successfully.', deletedStudent: result.rows[0] });
//   } catch (err) {
//     console.error('Error deleting student:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // --- START THE SERVER ---
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




































// server.js

// Import necessary packages
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();

// --- CONFIGURATION ---
const PORT = process.env.PORT || 3001;

// --- DATABASE CONNECTION ---
// Create a new pool of connections to the PostgreSQL database.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- API ROUTES (ENDPOINTS) ---

// 1. GET /api/students - Fetch all students and their attendance
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. POST /api/students - Register a new student
app.post('/api/students', async (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  
  // New server-side validation to check for @gmail.com
  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: 'Please enter a valid @gmail.com address.' });
  }

  try {
    // Check if a student with the same email already exists
    const existingStudent = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
    if (existingStudent.rows.length > 0) {
      return res.status(409).json({ error: 'A student with this email already exists.' });
    }

    // SQL query to insert a new student. Attendance is an empty JSON array by default.
    const result = await pool.query(
      'INSERT INTO students (name, email, attendance) VALUES ($1, $2, $3) RETURNING *',
      [name, email, '[]']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error registering student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. PUT /api/students/:id/attend - Mark attendance for a student
app.put('/api/students/:id/attend', async (req, res) => {
  const { id } = req.params;
  const today = new Date().toISOString().split('T')[0];

  try {
    // First, get the student's current attendance record
    const studentResult = await pool.query('SELECT attendance FROM students WHERE id = $1', [id]);
    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const attendance = studentResult.rows[0].attendance;

    // Check if attendance for today has already been marked
    if (attendance.includes(today)) {
      return res.status(409).json({ error: 'Attendance already marked for today.' });
    }

    // Add today's date to the attendance array
    attendance.push(today);

    // Update the student's record in the database with the new attendance array
    const updateResult = await pool.query(
      'UPDATE students SET attendance = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(attendance), id]
    );

    res.status(200).json(updateResult.rows[0]);
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. DELETE /api/students/:id - Delete a student by ID
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    res.status(200).json({ message: 'Student deleted successfully.', deletedStudent: result.rows[0] });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
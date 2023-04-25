import pool from "../config/dbController";

const createUser = async (user) => {
  const { username, password } = user;

  const query = {
    text: "INSERT INTO usertable(username,  password) VALUES($1, $2)",
    values: [username, password],
  };
  try {
    await pool.query(query);
    return { success: true, message: `User ${username} created` };
  } catch (err) {
    console.error(err.message);
    return { success: false, message: "Error creating user" };
  }
};
const createPatient = async (patient) => {
  const { name, email, userId } = patient;

  // Validate the name field
  if (!name) {
    return { success: false, message: "Name is required" };
  }
  if (!userId) {
    return { success: false, message: "user Id is required" };
  }
  const query = {
    text: "INSERT INTO patient(name, email, user_id) VALUES($1, $2, $3)",
    values: [name, email, userId],
  };
  try {
    const result = await pool.query(query);
    return {
      success: true,
      message: `Patient ${name} created with ID ${result.rows[0].id}`,
      id: result.rows[0].id,
    };
  } catch (err) {
    console.error(err.message);
    return { success: false, message: "Error creating patient" };
  }
};

const getUser = async (username) => {
  const query = {
    text: "SELECT * FROM usertable WHERE LOWER(username)=$1",
    values: [username.toLowerCase()],
  };

  try {
    const data = await pool.query(query);
    if (!data.rows[0]) {
      return { success: false, message: "User not found", status: 404 };
    }

    return { success: true, data: data.rows[0], status: 200 };
  } catch (err) {
    console.error(err.message);
    return { success: false, message: "Error getting user", status: 400 };
  }
};

const updateUser = async (user) => {
  const { id, username, email, password } = user;
  const query = {
    text: "UPDATE user SET username=$2, email=$3, password=$4 WHERE id=$1",
    values: [id, username, email, password],
  };
  try {
    await pool.query(query);
    return `User ${id} updated successfully`;
  } catch (err) {
    console.error(err.message);
    return `Error updating user ${id}: ${err.message}`;
  }
};

const deleteUser = async (id) => {
  const query = {
    text: "DELETE FROM user WHERE id=$1",
    values: [id],
  };
  try {
    await pool.query(query);
    return { success: true, message: `User ${id} deleted` };
  } catch (err) {
    console.error(err.message);
    return { success: false, message: "Error removing user" };
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createPatient,
};

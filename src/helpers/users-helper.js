const fs = require('fs');
const usersPath = './src/db/users.json';

const users = require('../db/users');
const requiredUserProperties = [ 'first_name', 'last_name', 'email', 'gender' ];

function getUsers() {
  if (!users) {
    throw getError(500, 'Something went wrong.');
  }

  return users;
}

function createUser(data) {
  const keys = Object.keys(data);
  console.log(keys.length);
  console.log(requiredUserProperties.length)

  if (!data) {
    throw getError(400, 'Missing data.');
  }
  if (!isProperFormat(keys, requiredUserProperties) ||
    keys.length !== requiredUserProperties.length
  ) {
    throw getError(400, 'Wrong format.');
  }
  const id = `${parseInt(users.slice(-1)[0].id, 10) + 1}`;
  const modifiedUsers = [ ...users, { ...data, id } ];

  return new Promise(async (resolve, reject) => {
    await writeFile(modifiedUsers)
      .catch(err => {
        reject(getError(500, err));
      });
    resolve(modifiedUsers);
  });
}

function getUser(id) {
  const user = users.find(user => user.id === id);

  if (!user) {
    throw getError(404, 'User not found.');
  }

  return user;
}

function editUser(id, data) {
  const keys = Object.keys(data);

  if (!id) {
    throw getError(400, 'Missing id.');
  }
  if (!data) {
    throw getError(400, 'Missing data.');
  }
  if (!isProperFormat(keys, requiredUserProperties)) {
    throw getError(400, 'Wrong format.');
  }

  const modifiedUsers = users.map(user => {
    return user.id === id ? { ...user, ...data } : user;
  });

  return new Promise(async (resolve, reject) => {
    await writeFile(modifiedUsers)
      .catch(err => {
        reject(getError(500, err));
      });
    resolve(modifiedUsers);
  });
}

function deleteUser(id) {
  if (!id) {
    throw getError(400, 'Missing id.');
  }

  const modifiedUsers = users.filter(user => {
    return user.id !== id;
  });

  if (modifiedUsers.length === users.length) {
    throw getError(404, 'User not found.');
  }

  return new Promise(async (resolve, reject) => {
    await writeFile(modifiedUsers)
      .catch(err => {
        reject(getError(500, err));
      });
    resolve(modifiedUsers);
  });
}

function writeFile(data) {
  const stringifiedData = JSON.stringify(data);

  return new Promise((resolve, reject) => {
    fs.writeFile(usersPath, stringifiedData, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function getError(status, message) {
  return { status, message };
}

function isProperFormat(keys, properties) {
  return keys.every(key => properties.indexOf(key) !== -1 && key !== 'id');
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  editUser,
  deleteUser
};

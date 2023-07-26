const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const invalidEmail = 'invalid@email.com';
const invalidPassword = 'invalid_password';

const token = {
  token: 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0',
};

const validLogin = {
  email: validEmail,
  password: validPassword,
};

const invalidLogin = {
  email: invalidEmail,
  password: invalidPassword,
}

const invalidEmailLogin = {
  email: '',
  password: validPassword,
};

const invalidPasswordLogin = {
  email: validEmail,
  password: invalidPassword,
};

const role = {
  role: 'admin',
};

const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: validEmail,
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const users = [
  user,
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  },
];

export {
  validLogin,
  invalidLogin,
  invalidEmailLogin,
  invalidPasswordLogin,
  users,
  token,
  role,
};
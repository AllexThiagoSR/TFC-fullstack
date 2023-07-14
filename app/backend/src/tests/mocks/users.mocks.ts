const loginWithoutEmail = { password: '123456789' };
const loginWithouPassword = { email: 'test@teste.com' }
const login = { email: 'teste@test.com', password: '123456789' };
const loginWithInvalidEmail = { email: '@user.com', password: 'secret_user' };
const loginWithInvalidPassword = { email: 'user@gmail.com', password: '123' };

const user = { id: 1, username: 'test', email: 'teste@test.com', password: '123456789', role: 'ADM' };

export { loginWithoutEmail, loginWithInvalidPassword, login, loginWithouPassword, user, loginWithInvalidEmail };

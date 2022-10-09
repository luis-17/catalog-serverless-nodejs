module.exports = {
  GET_USUARIO_POR_USERNAME:
  `
  SELECT id, tipoUsuario, email, username, password
  FROM usuario
  WHERE username = :username
  AND estado = 1
  `
};

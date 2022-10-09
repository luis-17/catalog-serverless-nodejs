module.exports = {
  GET_PRODUCTO_DETALLE:
  `
  SELECT id, sku, nombre, precio, marca, vistas
  FROM producto
  WHERE id = :id
  `,
  GET_SKU_PRODUCTOS:
  `
  SELECT COUNT(*) as total
  FROM producto
  WHERE sku = :sku
  `,
  GET_CORREOS_ADMIN:
  `
  SELECT email
  FROM usuario
  WHERE id <> :id
  `,
  REGISTRAR_PRODUCTO:
  `
  INSERT INTO producto (sku, nombre, precio, marca)
  VALUES (:sku, :nombre, :precio, :marca)
  `,
  ACTUALIZAR_PRODUCTO:
  `
  UPDATE producto
  SET sku = :sku, nombre = :nombre, precio = :precio, marca = :marca
  WHERE id = :id
  `,
  ACTUALIZAR_VISTAS_PRODUCTO:
  `
  UPDATE producto
  SET vistas = vistas + 1
  WHERE id = :id
  `,
  ANULAR_PRODUCTO:
  `
  UPDATE producto
  SET estado = 2
  WHERE id = :id
  `
};

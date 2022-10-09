/* eslint-disable import/order */
const { HttpConstant } = require('../../libs/app.constant');
const AppCore = require('../../libs/app.core');
const AppValidator = require('../../libs/validator/app.validator');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const ErrorConstant = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');
const { REGEX_VALIDATION } = require('./utils/domain.constant');

module.exports = {
  async consultarDetalleProducto(payload) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      session: Joi.object().optional()
    });

    await AppValidator.validate(schema, payload).catch((reason) => {
      new CustomException(
        ErrorConstant.ERROR_ESTRUCTURA.code,
        ErrorConstant.ERROR_ESTRUCTURA.message,
        reason.message, {},
        HttpConstant.BAD_REQUEST_STATUS.code
      ).throw(!AppCore.isEmpty(reason));
    });
  },

  async crearProducto(payload) {
    const schema = Joi.object().keys({
      sku: Joi.string().required()
        .length(8).message('El campo SKU debe tener 8 caracteres.'),
      nombre: Joi.string().required(),
      precio: Joi.string().required()
        .pattern(new RegExp(REGEX_VALIDATION.NUMERICO)),
      marca: Joi.string().optional(),
      session: Joi.object().optional()
    });
    console.log('ggholaa');
    await AppValidator.validate(schema, payload).catch((reason) => {
      new CustomException(
        ErrorConstant.ERROR_ESTRUCTURA.code,
        ErrorConstant.ERROR_ESTRUCTURA.message,
        reason.message, {},
        HttpConstant.BAD_REQUEST_STATUS.code
      ).throw(!AppCore.isEmpty(reason));
    });
  },

  async actualizarProducto(payload) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      sku: Joi.string().required()
        .length(8).message('El campo SKU debe tener 8 caracteres.'),
      nombre: Joi.string().required(),
      precio: Joi.string().required()
        .pattern(new RegExp(REGEX_VALIDATION.NUMERICO)),
      marca: Joi.string().optional(),
      session: Joi.object().optional()
    });

    await AppValidator.validate(schema, payload).catch((reason) => {
      new CustomException(
        ErrorConstant.ERROR_ESTRUCTURA.code,
        ErrorConstant.ERROR_ESTRUCTURA.message,
        reason.message, {},
        HttpConstant.BAD_REQUEST_STATUS.code
      ).throw(!AppCore.isEmpty(reason));
    });
  },

  async eliminarProducto(payload) {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      session: Joi.object().optional()
    });

    await AppValidator.validate(schema, payload).catch((reason) => {
      new CustomException(
        ErrorConstant.ERROR_ESTRUCTURA.code,
        ErrorConstant.ERROR_ESTRUCTURA.message,
        reason.message, {},
        HttpConstant.BAD_REQUEST_STATUS.code
      ).throw(!AppCore.isEmpty(reason));
    });
  }
};

# luuna-tech-catalogo

Prueba Técnica Luuna Tech

## Instalación
1. Instalar las dependencias con el comando:
> npm install

2. Despliegue en local con el comando:
> npm start

## Comandos del proyecto

- Para desplegar todo el proyecto use sgte comando:
> npm run deploy dev

- Para desplegar un lambda especifico use el sgte comando:
> npm run deploy:once dev [nombre_del_lambda]

- Para correr las pruebas unitarias use el sgte comando:
> npm run test

- Para correr la herramienta de verificación de código:
> npm run lint

## Tecnologias y teorias aplicadas
- Paradigma arquitectónico: Domain Driven Design - DDD
- Arquitectura sin servidor: __AWS Lambda__
- Framework de arquitectura sin servidor: __Serverless Framework 3.22.0__
- Exposición de los servicios: __AWS API Gateway__
- Ejecución de pruebas unitarias: __Jest 27.2.3__
- Notificaciones por correo electrónico: __AWS SES__
- Herramienta de verificación de código: __EsLint 7.21.0__
- Herramienta de generación de tokens de acceso: __JWT 8.5.1__

## Base y paths del proyecto

#### Link base
https://5sk7w5ptx9.execute-api.us-east-1.amazonaws.com/dev

#### Paths:
Login: /login

Productos:
  productos/crear
  productos/actualizar
  productos/eliminar
  productos/consultar/detalle

Usuarios:
  usuarios/crear
  usuarios/actualizar
  usuarios/eliminar


# Backend - Expense Tracker Alkemy Challenge


Esta API permite gestionar los gastos e ingresos de un usuario. Cuenta con endpoints para el ingreso y registro de usuarios, además permite crear, editar, eliminar y obtener todas las transacciones del usuario que está activo en el momento. 
## Tech Stack

Node, Express, Jsonwebtoken, bcrypt, Postgresql


## Environment Variables

Para ejecutar este proyecto es necesario agregar las siguientes variables de entorno al archivo .env

`PORT`
`DB_USER`
`DB_PASSWORD`
`DB_HOST`
`DB_PORT`
`DB_DATABASE`
`JWT_SECRET`
`JWT_DURATION`
## Documentación API

### Endpoints Autentación 
#### Registrar usuario

```http
  POST /api/v1/auth/register
```
- #### Request body 
```json
{
  "email": "email@test.com",
  "password": "123456",
  "name": "username"
}
```
#### Ingreso usuario

```http
  POST /api/v1/auth/login
```
- #### Request body 
```json
{
  "email": "email@test.com",
  "password": "123456"
}
```
- #### Respuesta
    Token que contiene la informacion del usuario (name, email, userId)
### Endpoints Transacciones 
Todos los endpoints usan Bearer Token

#### Crear transacción
```http
  POST /api/v1/transactions
```

- #### Request body
```json
{
  "concepto": "transaccion",
  "monto": 123000,
  "tipo": "ingreso",
  "categoria": "comida"
}
```
#### Obtener todas las transacciones del usuario actual
```http
  GET /api/v1/transactions
```
| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Opcional**. Tipo de transacción (egreso - ingreso) |
| `category`| `string` | **Opcional**. Categoria de la transacción (ej: comida) |
- #### Respuesta
    Objeto con todas las transacciones e información adicional.
    ```json
    {
        "transactions": [],
        "totalIncome": "",
        "totalExpenses": "",
        "balance": "",
        "quantity": ""
    }
    ```

#### Obtener transacción por id
```http
  GET /api/v1/transactions/:id
```
| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Requerido**. Id de la transacción|

#### Actulizar transacción por id
```http
  PUT /api/v1/transactions/:id
```
| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Requerido**. Id de la transacción|

#### Actulizar transacción por id
```http
  PUT /api/v1/transactions/:id
```
| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Requerido**. Id de la transacción|

- #### Request body
```json
{
  "concepto": "nuevo concepto",
  "monto": 124000,
  "categoria": "categoria"
}
```
#### Eliminar transacción por id
```http
  DELETE /api/v1/transactions/:id
```
| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int`    | **Requerido**. Id de la transacción|


## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/julandrod/Expense-Tracker-Alkemy-Challenge.git
```

Ir al directorio del proyecto

```bash
  cd expense-tracker-alkemy
```

Instalar dependencias
```bash
  npm install
```

Iniciar el servidor

```bash
  npm run start
```


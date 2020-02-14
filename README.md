## API Details
### Registration

Specifications:
- POST: /api/v1/auth/register
- Sample URL: localhost:9090/api/v1/auth/register
- Sample request:
```json
{
	"username":"himanshu2@gmail.com",
	"password":"admin"
}
```
- It will return 200 OK On successful registraion

Validations:
- The user name must be unique. If not, the following error will be thrown:
```json
{
    "status": "BAD_REQUEST",
    "time": "2020-02-14T03:45:58.336Z",
    "path": "/api/v1/auth/register",
    "method": "POST",
    "errors": [
        {
            "message": "User with username himanshu2@gmail.com already exists in the DB",
            "code": "INVALID_INPUT"
        }
    ]
}
```
- Both user name and password are mandatory fields. If not provided, the following error will be thrown:
```json
{
    "status": "BAD_REQUEST",
    "time": "2020-02-14T03:46:55.864Z",
    "path": "/api/v1/auth/register",
    "method": "POST",
    "errors": [
        {
            "message": "must not be blank",
            "code": "INVALID_PARAMS"
        }
    ]
}
```

### Login

Specifications:
- POST: /api/v1/auth/login
- Sample URL: localhost:9090/api/v1/auth/login
- Sample request:
```json
{
	"username":"himanshu2@gmail.com",
	"password":"admin"
}
```
- It will return 200 OK On successful login with the following response:
```json
{
    "userId": 5,
    "username": "himanshu2@gmail.com"
}
```

Validations:
- The user must be present. If not, the following error will be thrown:
```json
{
    "timestamp": "2020-02-14T03:49:24.689+0000",
    "status": 400,
    "error": "Bad Request",
    "message": "User not found!",
    "path": "/api/v1/auth/login"
}
```
- Both user name and password are mandatory fields. If not provided, the following error will be thrown:
```json
{
    "status": "BAD_REQUEST",
    "time": "2020-02-14T03:46:55.864Z",
    "path": "/api/v1/auth/register",
    "method": "POST",
    "errors": [
        {
            "message": "must not be blank",
            "code": "INVALID_PARAMS"
        }
    ]
}
```

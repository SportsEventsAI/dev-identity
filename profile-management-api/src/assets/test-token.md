# The Testing Secret

## Inputs: HEADER:ALGORITHM & TOKEN TYPE

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

## PAYLOAD:DATA

```json
{
  "sub": "user1",
  "name": "John Doe",
  "iat": 1516239022
}
```

## VERIFY SIGNATURE

```plaintext
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    "test_secret"
)
```

## Generated Token from jwt.io

Token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.TyBkpinEE3vgMSER1tZ4kmvH8rfvILFuotJOx7KcDR4`

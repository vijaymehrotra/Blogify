FROM golang:1.22.5-alpine AS builder

WORKDIR /app

COPY ./server/go.mod ./server/go.sum ./

RUN go mod download

COPY . .

WORKDIR /app/server

RUN go build -o main .

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/server/main .

# Copy the .env file if necessary (optional)
COPY --from=builder /app/server/.env .
COPY --from=builder /app/client ./client

EXPOSE 8000

CMD ["./main"]


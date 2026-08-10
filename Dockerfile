FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
ARG VITE_APP_NAME=Librar
ARG VITE_APP_DOMAIN=localhost
ARG VITE_APP_URL=localhost:3000
ARG VITE_API_SERVER_URL=http://localhost:8000/api
ARG VITE_SERVER_URL=http://localhost:8000

ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_APP_DOMAIN=${VITE_APP_DOMAIN}
ENV VITE_APP_URL=${VITE_APP_URL}
ENV VITE_API_SERVER_URL=${VITE_API_SERVER_URL}
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
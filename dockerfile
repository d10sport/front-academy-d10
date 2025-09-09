# Etapa de build
FROM node:18 AS build
WORKDIR /app

# Recibir variables desde Dokploy
ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_API_KEY_RAPIDAPI
ARG VITE_API_HOST_RAPIDAPI
ARG VITE_RAPIDAPI_API_KEY
ARG VITE_API_HOST_RAPID_INSTAGRAM

# Exponerlas como ENV para Vite
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_KEY=${VITE_API_KEY}
ENV VITE_API_KEY_RAPIDAPI=${VITE_API_KEY_RAPIDAPI}
ENV VITE_API_HOST_RAPIDAPI=${VITE_API_HOST_RAPIDAPI}
ENV VITE_RAPIDAPI_API_KEY=${VITE_RAPIDAPI_API_KEY}
ENV VITE_API_HOST_RAPID_INSTAGRAM=${VITE_API_HOST_RAPID_INSTAGRAM}

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Ejecutar build
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
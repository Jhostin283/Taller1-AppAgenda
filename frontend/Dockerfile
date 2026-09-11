# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
# Copiar configuración de dependencias
COPY package*.json ./
RUN npm install
# Copiar el resto del código
COPY . .
# Compilar Angular en modo producción
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM nginx:alpine
# Copiar configuración custom de nginx para soportar las rutas de Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
# En Angular 19+ (Application Builder), los estáticos se generan en /dist/<project_name>/browser
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

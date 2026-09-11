# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
# Copiar el pom.xml y descargar dependencias para aprovechar la cache de Docker
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente y compilar el JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copiar el JAR generado de la etapa de build
COPY --from=build /app/target/*.jar app.jar
# Exponer el puerto donde corre Spring Boot
EXPOSE 8080
# Comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar"]

# Dev

1. Clonar el .env.template y crear el .env
2. Ejecutar el comando ```docker compose up -d```
2. Ejecutar el comando para bajar ```docker compose down```

# Node con TypeScript - TS-Node-dev (preferido)

1. Instalar TypeScript y demás dependencias
```
npm i -D typescript @types/node ts-node-dev rimraf
```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))
```
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

# Generar certificados para el http2 en Linux
```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

# Instalacion de prisma para ORM de Postgresql
1. Ejecutar comando 
```
npm install prisma --save-dev
```
2. Comando para decir que DB vamos a usar
```
npx prisma init --datasource-provider postgresql
```
3. Cambios la configuracion en misma a nuestra variable de .env
4. Creamos el modelo
5. Generamos la migración
```
npx prisma migrate dev --name init
```

# Buenas practicas de express
- https://expressjs.com/en/advanced/best-practice-performance.html


# Pasos para configurar Jest con TypeScript, en Node 

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started)


1. Instalaciones de desarrollo (super test es útil para probar Express)
```
npm install -D jest @types/jest ts-jest supertest
```

2. Crear archivo de configuración de Jest
```
npx jest --init
```

3. En el archivo **jest.config.js** configurar
```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```

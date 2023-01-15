FROM node as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps --silent

RUN npm install react-scripts@3.0.1 -g --silent

RUN npm install env-cmd -g --silent

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8082

CMD ["nginx","-g","daemon off;"]

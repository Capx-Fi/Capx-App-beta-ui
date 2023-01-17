#!/bin/bash
FROM nginx:stable

COPY ./build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8082

CMD ["nginx","-g","daemon off;"]

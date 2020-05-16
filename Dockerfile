FROM node:12.6.0-alpine

RUN apk update \
    && apk add tzdata \
    && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
    && echo "America/Sao_Paulo" >  /etc/timezone \
    && apk del tzdata

WORKDIR /app

COPY src/ ./src
RUN npm i --production --no-progress

EXPOSE 3030

CMD ["node", "src/server.js"]

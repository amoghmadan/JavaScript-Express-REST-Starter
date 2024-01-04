FROM node:20-bookworm-slim

LABEL maintaner="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /reception-register/

COPY . .

RUN npm install --location=project

RUN npm run build

CMD ["npm", "start", "bootstrap"]

FROM node:23

RUN corepack enable

WORKDIR /app

# COPY package*.json ./

RUN userdel -r node

ARG USER_ID
ARG GROUP_ID

RUN addgroup --gid ${GROUP_ID} user
RUN useradd -u ${USER_ID} -g ${GROUP_ID} -m -s /bin/bash -p "" user
USER user

# RUN yarn install

COPY . .

ENTRYPOINT ["yarn"]
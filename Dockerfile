FROM node:lts-alpine

# Setup environment variables.
# If using one liner breakpoint '\' you can't use previously defined
# variables in posterior variables. Just define ENV per line
ENV NODE_ENV=production
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH=${PATH}:${NPM_CONFIG_PREFIX}/bin

# Following best practices at:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md


# RUN apk update && apk upgrade && \
#     apk add --no-cache build-base git && \
#     rm -f /var/cache/apk/*

RUN apk update && apk upgrade && \
    rm -f /var/cache/apk/*

# ENV PATH=${PATH}:"$(yarn global bin)"

# add a group and user for our app, for a system user or group
# add '-S' to addgroup or adduser commands
RUN addgroup -S app && adduser -S -g app app

COPY . /home/app/site1

RUN chown -R app:app /home/app

USER app

WORKDIR /home/app/site1

RUN yarn

RUN yarn run build:prod

EXPOSE 10001

CMD ["node_modules/pm2/bin/pm2-docker", "start", "pm2-conf.json"]
# CMD ["tail","-f", "/dev/null"]

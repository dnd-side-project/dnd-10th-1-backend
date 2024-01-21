
# [ Builder Stage ]
FROM node:18 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn 
RUN yarn generate

COPY . .

RUN yarn local:build

# [ Final Stage ]
FROM node:18

# Copies the node_modules directory from the builder stage to the final image. 
# This avoids having to reinstall all the dependencies since they were already installed in the builder stage.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "yarn" , "start" ]
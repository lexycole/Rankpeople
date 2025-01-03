FROM node:lts

# Install necessary tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    openssl \
    dos2unix

RUN apt-get install -y libc6-dev

WORKDIR /usr/app

# Copy all package.json files first
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/native/package.json ./apps/native/
COPY apps/web/package.json ./apps/web/
COPY packages/backend/package.json ./packages/backend/
COPY packages/ui/package.json ./packages/ui/
COPY packages/database/package.json ./packages/database/
COPY packages/environment/package.json ./packages/environment/
COPY packages/logger/package.json ./packages/logger/
COPY packages/profanity-filter/package.json ./packages/profanity-filter/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/jest-presets/package.json ./packages/jest-presets/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install dependencies
RUN yarn install --network-timeout 1000000000

# Copy entire project
COPY . .

# Normalize line endings
RUN find . -type f -exec dos2unix -k -s -o {} \;
RUN find . -type f -name "*.sh" -exec chmod +x {} \;

# Set environment variables
ENV DOCKER_ENV=true
ENV NODE_ENV=$BuildMode

# Build packages in correct order, skipping GraphQL generation for UI initially
RUN yarn turbo run build --filter=!@repo/ui

# Build UI package separately after other dependencies
RUN cd packages/ui && yarn build

CMD ["yarn", "turbo", "run", "dev"]
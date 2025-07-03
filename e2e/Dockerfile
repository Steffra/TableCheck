FROM mcr.microsoft.com/playwright:v1.53.2-jammy

WORKDIR /e2e

COPY e2e/package.json ./
RUN ls -las
RUN npm install

COPY e2e ./e2e

CMD ["npx", "playwright", "test"]
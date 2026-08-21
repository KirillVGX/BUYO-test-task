FROM node:22-slim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5173

# --host is required so the Vite dev server accepts connections coming from
# outside the container (Docker's published port), not just localhost.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

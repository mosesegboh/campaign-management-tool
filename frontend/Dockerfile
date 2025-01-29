# stage 1: Build the React application
FROM node:18-alpine AS build

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install the dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# build the React app for production
RUN npm run build

# stage 2: Serve the React application using nginx
FROM nginx:stable-alpine

# remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# copy the build output from Stage 1 to nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

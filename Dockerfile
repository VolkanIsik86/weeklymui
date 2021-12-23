# Set the base image to node:12-alpine
FROM node:16-alpine as build
# Specify where our app will live in the container
WORKDIR /app

#Copy package to install dependencies
COPY package.json package-lock.json ./

# Prepare the container for building React
RUN npm install
RUN npm install react-scripts -g

# Copy the React App to the container
COPY . /app/

# We want the production version
RUN npm run build

# Prepare nginx
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html/

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

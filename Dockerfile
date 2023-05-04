# pull official base image
FROM node:14.7.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
#COPY package.json .
COPY ./package.json /app
COPY . /app
#RUN npm config set strict-ssl false
#RUN npm config set proxy http://security-proxy.emea.svc.corpintra.net:3128 && npm install
#RUN npm install -g npm@9.6.2
RUN npm install
#RUN npm run build
RUN chown -R 999 /app
# RUN npm install react-scripts@3.4.1 -g --silent
#RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
# add app
COPY . .
# start app
CMD ["npm", "start"]

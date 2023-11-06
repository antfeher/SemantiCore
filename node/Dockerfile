FROM node:18

WORKDIR /usr/src/app

COPY ./src ./
RUN npm install 

#RUN wget  https://nodejs.org/dist/v16.14.2/node-v16.14.2-linux-x64.tar.xz && \
#    tar -xvf node-v16.14.2-linux-x64.tar.xz && ls && \
#    cp -r node-v16.14.2-linux-x64 /usr/ && \
#    export PATH=/usr/node-v16.14.2-linux-x64/bin:$PATH && \
#    rm -r ./node-v16.14.2-linux-x64 ./node-v16.14.2-linux-x64.tar.xz


EXPOSE 3100
CMD [ "node", "index.js" ]

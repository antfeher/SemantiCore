FROM ubuntu 

RUN apt update 
RUN apt install -y apache2 apache2-utils nano wget curl


WORKDIR /var/www/html

RUN rm /var/www/html/index.html
COPY ./src /var/www/html

EXPOSE 80

CMD service apache2 start && sleep infinity
#CMD [ "node", "index.js" ]


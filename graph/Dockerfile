FROM ubuntu 

RUN apt update 
RUN apt install -y apache2 apache2-utils \
                   libapache2-mod-perl2 libapache2-mod-perl2-dev \
                   libapache2-request-perl libdatetime-perl perl-debug \
                   libcgi-pm-perl libcgi-session-perl libgraph-writer-graphviz-perl
RUN apt install -y nano wget curl

RUN a2enmod cgi && a2enmod cgid


WORKDIR /var/www/html

RUN rm /var/www/html/index.html /etc/apache2/sites-available/000-default.conf
COPY ./src/html /var/www/html
COPY ./src/cgi-bin /usr/lib/cgi-bin
COPY ./src/000-default.conf /etc/apache2/sites-available

RUN mkdir /var/www/html/tmp
RUN chmod 777 -R /var/www/html/tmp

EXPOSE 8080

CMD service apache2 start && sleep infinity
#CMD [ "node", "index.js" ]

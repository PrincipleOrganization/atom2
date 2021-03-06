FROM ioft/armhf-ubuntu:16.04

MAINTAINER Princip <principle.main@gmail.com>

ENV WORKING_DIR /distr
ENV NODE_ENV 'production'

WORKDIR $WORKING_DIR

ADD ./distr $WORKING_DIR

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN chmod 755 $WORKING_DIR
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl wget build-essential python unixodbc unixodbc-dev ffmpeg -y
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN cd $WORKING_DIR
RUN npm i --production --unsafe-perm --build-from-source
RUN cd $WORKING_DIR
RUN chmod 755 run.sh

# Windows add specific CR LF to the end of line
RUN sed -i -e 's/\r$//' run.sh

EXPOSE 4000-4500

CMD ./run.sh

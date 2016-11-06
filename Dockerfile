FROM ioft/armhf-ubuntu

MAINTAINER Princip <principle.main@gmail.com>

ENV WORKING_DIR /distr
ENV NODE_ENV 'production'

WORKDIR $WORKING_DIR

ADD ./distr $WORKING_DIR

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN chmod 755 $WORKING_DIR
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl wget -y
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN cd $WORKING_DIR
RUN npm i
RUN cd $WORKING_DIR
RUN chmod 755 run.sh

# Windows add specific CR LF to the end of line
RUN sed -i -e 's/\r$//' run.sh

EXPOSE 4000

CMD ./run.sh

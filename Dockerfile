FROM alpine:3.13

RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone
RUN apk add ca-certificates
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories \
&& apk add --update --no-cache python3 py3-pip \
&& rm -rf /var/cache/apk/*

COPY . /app

WORKDIR /app
RUN pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple \
&& pip config set global.trusted-host mirrors.cloud.tencent.com \
&& pip install --upgrade pip \
&& pip install --user -r requirements.txt

EXPOSE 80
CMD ["python3", "manage.py", "runserver", "0.0.0.0:80"]
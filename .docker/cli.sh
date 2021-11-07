#!/bin/bash
clear

if [ "$#" == "0" ]
  then
    echo "Pass a parameter."
    exit 1
fi

ROOTSCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

case "$1" in
  build)
  echo "[-] Building $2"
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" build $2
  ;;
  start)
    echo "[-] Starting $2"
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" up -d $2
  ;;
  restart)
    echo "[-] Restarting $2"
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" restart $2
  ;;
  remove)
    echo "[-] Removing $2"
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" rm -fv $2
  ;;
  update)
    echo "[-] Updating $2"
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" pull $2
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" up -d --force-recreate $2
  ;;
  logs | log)
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" logs $2
  ;;
  tail | follow)
    docker-compose -p ariel -f "$ROOTSCRIPTPATH/docker-compose.yml" logs -f $2
  ;;
  * | help)
   echo "List of Commands:
build        - Builds a Docker image to be ran.
start        - Starts a Docker Service.
stop         - Stops a Docker Service.
restart      - Restarts a Docker Service.
remove       - Removes a Docker Service.
update       - Updates the Image a docker service is running and re-runs it.
logs, logs   - Returns with the recent logs.
tail, follow - Follows log output."

    exit 1
  ;;
esac

echo "[#] Finished."

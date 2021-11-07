#!/bin/bash

if [ "$#" == "0" ]
  then
    echo "Pass a parameter."
    exit 1
fi

case "$1" in
  build)
  echo "[-] Building $2"
    docker-compose -p ariel -f ".docker/docker-compose.yml" build $2
  ;;
  start)
    echo "[-] Starting $2"
    docker-compose -p ariel -f ".docker/docker-compose.yml" start $2
  ;;
  stop)
    echo "[-] Stopping $2"
    docker-compose -p ariel -f ".docker/docker-compose.yml" stop $2
  ;;
  restart)
    echo "[-] Restarting $2"
    docker-compose -p ariel -f ".docker/docker-compose.yml" restart $2
  ;;
  remove)
    echo "[-] Removing $2"
    docker-compose -p ariel -f ".docker/docker-compose.yml" rm -fv $2
  ;;
  update)
    echo "[-] Updating $2"
    docker-compose -p ariel -f ".docker/docker-compose.yml" pull $2
    docker-compose -p ariel -f ".docker/docker-compose.yml" up --force-recreate $2
  ;;
  * | help)
   echo "List of Commands:

    build   - Builds a Docker image to be ran.
    start   - Starts a Docker Service.
    stop    - Stops a Docker Service.
    restart - Restarts a Docker Service.
    remove  - Removes a Docker Service.
    update  - Updates the Image a docker service is running and re-runs it."

    exit 1
  ;;
esac

echo "[#] Finished."

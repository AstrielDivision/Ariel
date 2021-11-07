#!/bin/bash

echo -n "What would you like todo? (type help for the list of commands)"
read COMMAND

echo -n "What service would you like to control?"
read SERVICE

case $COMMAND in

  build)
    docker-compose -p ariel -f "./docker/docker-compose.yml" build $SERVICE
  ;;
  start)
    docker-compose -p ariel -f "./docker-compose" start $SERVICE
  ;;
  stop)
    docker-compose -p ariel -f "./docker-compose" stop $SERVICE
  ;;
  restart)
    docker-compose -p ariel -f "./docker-compose" restart $SERVICE
  ;;
  remove)
    docker-compose -p ariel -f "./docker-compose" rm -fv $SERVICE
  ;;
  update)
    docker-compose -p ariel -f "./docker-compose" pull $SERVICE
    docker-compose -p ariel -f "./docker-compose" up --force-recreate $SERVICE
  ;;
  * | help)
    echo "List of Commands:

    build   - Builds a Docker image to be ran.
    start   - Starts a Docker Service.
    stop    - Stops a Docker Service.
    restart - Restarts a Docker Service.
    remove  - Removes a Docker Service.
    update  - Updates the Image a docker service is running and re-runs it."

    exit
  ;;
esac

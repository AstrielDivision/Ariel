Clear-Host

function Main {
  Param(
    [String]$Service = $( Read-Host "What service would you like to control?" ),
    [String]$Command)

  if ($Command -Ne "help" -And $Command -Ne "h" -And $Command -Eq "") {
    $Command = $( Read-Host "What would you like to do?" )
  }

  switch ($Command) {
    build {
      Write-Host "[-] Building Service $Service"
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" build $Service
    }
    start {
      Write-Host "[-] Starting Service $Service"
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" up -d $Service
    }
    restart {
      Write-Host "[-] Restarting Service $Service"
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" restart $Service
    }
    remove {
      Write-Host "[-] Removing $Service"
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" rm -sfv $Service
    }
    update {
      Write-Host "[-] Updating $Service"
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" pull $Service;
      docker-compose -p ariel -f "$($PSScriptRoot)t/docker-compose.yml" up -d --force-recreate $Service
    }
    logs {
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" logs $Service
    }
    follow {
      docker-compose -p ariel -f "$($PSScriptRoot)/docker-compose.yml" logs -f $Service
    }
    default {
      Write-Host "build        - Builds a Docker image to be ran.
start        - Starts a Docker Service.
stop         - Stops a Docker Service.
restart      - Restarts a Docker Service.
remove       - Removes a Docker Service.
update       - Updates the Image a docker service is running and re-runs it.
logs   		 - Returns with the recent logs.
follow 		 - Follows log output." -ForegroundColor yellow
    }
  }
}

Main @args

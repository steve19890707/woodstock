const host = window.location.host
let env = ""
switch(host){
  case "rd3-dev-help.guardians.one":
    env = "develope"
    break
  case "rd3-qa-help.guardians.one":
    env = "qa"
    break
  case "help.cqgame.games":
    env = "int"
    break
  default:
    env = "pord"
    break
}

export default env
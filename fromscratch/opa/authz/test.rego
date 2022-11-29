package fromscratch

import future.keywords.if


default allow = false


allow {

  input.token.realm_access.roles[_] = "admin"

}

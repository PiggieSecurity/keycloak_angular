package authz

import future.keywords.in

default allow = false

allow{
	input.token.payload.realm_access.roles[_] == "admin"
}

token = {"payload": payload} {
	[_, payload, _] := io.jwt.decode(input.token)

#!/bin/sed -nf

1 {
	s/.*/Name: /
	p
}

2 {
	x
	s/$/\nname:/
	G
	s/name:\n/name:/
	s/$/\n/
	x
	s/.*/Conference: /
	p
}

3 {
	x
	s/$/\nconference:/
	G
	s/conference:\n/conference:/
	s/$/\n/
	x
	s/.*/City: /
	p
}

4 {
	x
	s/$/\ncity:/
	G
	s/city:\n/city:/
	s/$/\n/
	x
	s/.*/Thank you/
	p
}

$ {
	g
	s/\nname:\(.*\)\n\nconference:\(.*\)\n\ncity:\(.*\)\n/Hello \1, are you at \2 in \3?/
	p
}



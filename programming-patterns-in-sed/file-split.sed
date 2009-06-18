#!/bin/sed -nf

/^City:/ {
	h
	x
	s/^City: */\n/
	s/$/\n/
	h
}

x

/San Francisco/ {
	x
	s/^\n//
	w sfo.txt
	b end
}

/Portland/ {
	x
	s/^\n//
	w pdx.txt
	b end
}

x
w others.txt

:end

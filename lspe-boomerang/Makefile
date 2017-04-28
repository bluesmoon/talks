REAL_USERS := $(shell ls Pictures/Photo\ on\ 1-17-13* | tail -1 | sed -e 's/ /\\ /g')

all: lspe-boomerang.pdf

real-users.jpg: $(REAL_USERS)
	cp $(REAL_USERS) real-users.jpg

lspe-boomerang.pdf: lspe-boomerang.tex real-users.jpg
	pdflatex $<


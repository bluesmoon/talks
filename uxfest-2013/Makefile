REAL_USERS := $(shell ls Pictures/Photo\ on\ 10* | tail -1 | sed -e 's/ /\\ /g')

all: uxfest.pdf

real-users.jpg: $(REAL_USERS)
	cp $(REAL_USERS) real-users.jpg

uxfest.pdf: uxfest.tex real-users.jpg
	pdflatex $<


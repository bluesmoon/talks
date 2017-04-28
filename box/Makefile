REAL_USERS := $(shell ls Pictures/Photo\ on\ 5-14-13* | tail -1 | sed -e 's/ /\\ /g')

all: sf-webperf-rum.pdf

real-users.jpg: $(REAL_USERS)
	cp $(REAL_USERS) real-users.jpg

sf-webperf-rum.pdf: sf-webperf-rum.tex real-users.jpg
	pdflatex $<


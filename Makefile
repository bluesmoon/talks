.DEFAULT:
	if [ ! -d $@ ]; then \
		mkdir $@; \
		touch $@/index.txt; \
	fi; \
	if [ ! -e $@/Makefile ]; then \
		echo "all: index.html\n\n%.html: %.txt\n\t../slide-parser.pl $$<\n" > $@/Makefile; \
	fi; \
	cd $@; \
	make; \
	cd ..


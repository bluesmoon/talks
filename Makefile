.DEFAULT:
	if [ ! -d $@ ]; then \
		mkdir $@; \
		touch $@/$@.tex; \
	fi; \
	if [ ! -e $@/Makefile ]; then \
		echo "all: $@.pdf\n\n%.pdf: %.tex\n\tpdflatex $$<\n" > $@/Makefile; \
	fi; \
	cd $@; \
	make; \
	cd ..


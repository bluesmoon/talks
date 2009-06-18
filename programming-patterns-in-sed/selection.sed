/^hello/ s/^hello/hello world/

3 p

/^next\>/ {
   N
   s/\(.*\)\n\(.*\)/\2\n\1/
}


#!/bin/bash
echo "Total arguments : $#"

# store arguments in a special array 
args=("$@") 
# get number of elements 
ELEMENTS=${#args[@]} 
 
# echo each element in array  
# for loop 
for (( i=0;i<$ELEMENTS;i++)); do 
    echo ${args[${i}]} 
done


usage() { echo "Usage: $0 [-m <git commit description>] [DIRNAME]" 1>&2; }

while getopts ":s:m:" o; do
    case "${o}" in
        s)
            s=${OPTARG}
            ((s == 45 || s == 90)) || usage
            ;;
        m)
            m=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
##shift $((OPTIND-1))

if [ -z "$m" ]
then
    echo "\$m is empty"
    echo "No commit message. Problem"
    usage
    return 0
else
    echo " commit message ${m}"
fi



#add README file in daily_sketches
git add ../README.md
git add ../docs/*.md

#$3 is the DIRECTORY NAME
echo $3
git add "../2021/$3/*.js"
git add "../2021/$3/README.md"
git add "../2021/$3/*.html"
git add "../2021/$3/images"
git commit -m "$3/daily_sketch $m"


#!/bin/bash
# This has cd, so this should be sourced. Use . as shortcut
#echo $(date +'%Y-%m-%d')
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


usage() { echo "Usage: $0 [-m <string>] [Y]" 1>&2; }

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


if [[ $3 == "Y" ]]; then
    echo "Committing Yesterday's files"
fi


git add ../README.md
git add ../docs/*.md

echo $3
echo [[$3=="Y"]]
if [[ $3 == "Y" ]]; #get yesterday's date and go there
then
    echo "Committing Yesterday's files"
    YDAY=$(date -d "yesterday 13:00" '+%d')
    YMONTH=$(date -d "yesterday 13:00" '+%m')
    YYEAR=$(date -d "yesterday 13:00" '+%Y')
    yd="../2021/$YYEAR-$YMONTH-$YDAY"
    echo $yd
    git add "../2021/$YYEAR-$YMONTH-$YDAY/*.js"
    git add "../2021/$YYEAR-$YMONTH-$YDAY/images"
    git add "../2021/$YYEAR-$YMONTH-$YDAY/README.md"
    git add "../2021/$YYEAR-$YMONTH-$YDAY/*.html"
    git commit -m "$YYEAR-$YMONTH-$YDAY $m"

else
    echo $3
    echo "Committing Today's files"

    DAY=$(date '+%d')
    MONTH=$(date '+%m')
    YEAR=$(date '+%Y')

    #echo "Day: $DAY"
    #echo "Month: $MONTH"
    #echo "Year: $YEAR"

    dd="../2021/$YEAR-$MONTH-$DAY"
    git add "../2021/$YEAR-$MONTH-$DAY/*.js"
    git add "../2021/$YEAR-$MONTH-$DAY/images"
    git add "../2021/$YEAR-$MONTH-$DAY/README.md"
    git add "../2021/$YEAR-$MONTH-$DAY/*.html"

    git commit -m "$YEAR-$MONTH-$DAY/daily_sketch $m"
fi


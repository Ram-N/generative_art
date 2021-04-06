#!/bin/bash
# This has cd, so this should be sourced. Use . as shortcut
#echo $(date +'%Y-%m-%d')
#echo "Total arguments : $#"

if [[ $1 == "Y" ]] #get yesterday's date and go there
then
    echo "Yesterday"
    YDAY=$(date -d "yesterday 13:00" '+%d')
    YMONTH=$(date -d "yesterday 13:00" '+%m')
    YYEAR=$(date -d "yesterday 13:00" '+%Y')
    yd="../2021/$YYEAR-$YMONTH-$YDAY"
    echo $yd
    cd $yd

else
    DAY=$(date '+%d')
    MONTH=$(date '+%m')
    YEAR=$(date '+%Y')

    #echo "Day: $DAY"
    #echo "Month: $MONTH"
    #echo "Year: $YEAR"

    dd="../2021/$YEAR-$MONTH-$DAY"
    echo $dd
    cd $dd
fi

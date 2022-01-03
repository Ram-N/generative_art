#!/bin/bash
# This has cd, so this should be sourced. Use . as shortcut
# run by . start_fromdate_todate.sh

#echo "Total arguments : $#"

#check to see that the new director $2 doesn't already exist!

readonly YEAR="2022"
echo $YEAR


if [ ! -d "../$YEAR/$2" ]; then
    echo "Latest Directory = $1"
    echo "New Directory for today = $2"
    echo "Will create $2 directory by copying $1 directory. Okay? Abort if not"
    read ok
    cp -r ../2021/$1 ../$YEAR/$2


    `touch ../$YEAR/$2/todays_notes.txt`
    `rm ../$YEAR/$2/README.md`
    rm ../$YEAR/$2/images/*
    `cd ../$YEAR/$2`
    echo "Directory $YEAR/$2 Ready"

else
    echo "Please check inputs... $2 already exists"
fi

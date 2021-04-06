#!/bin/bash
# This has cd, so this should be sourced. Use . as shortcut
# run by . start_fromdate_todate.sh

#echo "Total arguments : $#"
echo "Latest Directory = $1"
echo "New Directory for today = $2"
echo "Will create $2 directory by copying $1 directory. Okay? Abort if not"
read ok
cp -r ../2021/$1 ../2021/$2


`touch ../2021/$2/todays_notes.txt`
`rm ../2021/$2/README.md`
rm ../2021/$2/images/*
`cd ../2021/$2`
echo "Directory 2021/$2 Ready"

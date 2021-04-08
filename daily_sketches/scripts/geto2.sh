#!/bin/bash
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
shift $((OPTIND-1))

#if [ -z "${s}" ] || [ -z "${p}" ]; then
#    usage
#fi

if [ -z "$m" ]
then
    echo "\$m is empty"
    echo "No commit message. Problem"
    usage
    exit 0
else
    echo " commit message ${m}"
fi


if [[ $1 == "Y" ]]; then
    echo "Committing Yesterday's files"
fi




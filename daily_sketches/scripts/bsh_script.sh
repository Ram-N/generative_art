#!/bin/bash
echo 'hello'
while getopts ":a:" opt; do
  case $opt in
    a)
      echo "-a was triggered, Parameter: $OPTARG" >&2
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      ;;
  esac
done

echo 'leaving'
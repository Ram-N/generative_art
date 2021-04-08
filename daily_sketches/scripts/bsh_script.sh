#!/bin/bash
echo 'hello'

while getopts ":am:" ot; do
  case ${ot} in
    a)
      echo "-a was triggered, Parameter: $OPTARG "
      ;;

    m)
      echo "-m was triggered, Parameter: $OPTARG "
      ;;

    *)
      echo "Usage gitcommit Y -m commit-message"
      echo "Invalid option: -$OPTARG" >&2
      ;;      
  esac
done

echo 'leaving'
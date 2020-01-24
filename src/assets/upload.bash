#!/bin/bash


if [ "$(ls -A ./upload)" ]; then
    printf '\n'
    echo *******WELCOME RAD DOM to FILE UPLOAD*******
    printf '\n'
    echo "( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"
    printf '\n'
else
    echo "UPLOAD (upload/) DIRECTORY is Empty!!!!!!!"
    exit
fi

for filename in ./upload/*; do

    ans=-1

    if [ ${filename:9:4} == "min-" ]
      then
        continue
    fi

    while [ "${ans}" -gt 5 -o "${ans}" -lt 0 ]; do
    printf '\n'
    echo "What category does ${filename:9} go to?"
    echo "0 - People"
    echo "1 - Compositions"
    echo "2 - Food"
    echo "3 - Landscapes"
    echo "4 - Other"
    echo "5 - SKIP THIS FILE"
    read ans
    done

    if [ "${ans}" == 5 ]; then
      ans=-1;
      continue
    fi

    categories=(people compositions food landscapes other)

    echo "Moving main file to the designated folder..."
    mv "$filename" pics/${categories[ans]}
    echo "Adding filename to order.csv..."
    echo >> pics/${categories[ans]}/order.csv
    echo "${filename:9}" >> pics/${categories[ans]}/order.csv
    echo "Done! ( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"
    printf '\n'

done

echo "BYE NOW"
echo "( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"



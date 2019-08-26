#!/bin/bash
printf '\n'
echo *******WELCOME RAD DOM to FILE UPLOAD*******
printf '\n'
echo "( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"
printf '\n'
for filename in ./*.jpg; do

    while [[ "${ans}" > 4 ]] || [[ "${ans}" < 0 ]]; do
    echo "What category does $filename go to?"
    echo "0 - People"
    echo "1 - Compositions"
    echo "2 - Food"
    echo "3 - Landscapes"
    echo "4 - Other"
    read ans
    done

    categories=(people compositions food landscapes other)

    echo "Moving file to designated folder..."
    mv "$filename" ../pics/${categories[ans]}
    echo "Adding filename to order.csv..."
    echo "${filename:2}" >> ../pics/${categories[ans]}/order.csv
    echo "Done!"
    printf '\n'
    ans=-1;

done

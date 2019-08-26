#!/bin/bash
printf '\n'
echo *******WELCOME RAD DOM to FILE UPLOAD*******
printf '\n'
echo "( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"
printf '\n'
for filename in ./*.jpg; do
    if [ ${filename:2:4} == "min-" ]
      then
        continue
    fi

    while [[ "${ans}" > 4 ]] || [[ "${ans}" < 0 ]]; do
    printf '\n'
    echo "MAKE SURE YOU HAVE THE MINIFIED FILE AS WELL ! ! ! !"
    printf '\n'
    echo "What category does ${filename:2} go to?"
    echo "0 - People"
    echo "1 - Compositions"
    echo "2 - Food"
    echo "3 - Landscapes"
    echo "4 - Other"
    read ans
    done

    categories=(people compositions food landscapes other)

    echo "Moving main file and minified file to the designated folder..."
    mv "$filename" ../pics/${categories[ans]}
    mv "${filename:0:2}min-${filename:2}" ../pics/${categories[ans]}
    echo "Adding filename to order.csv..."
    echo "${filename:2}" >> ../pics/${categories[ans]}/order.csv
    echo "Done! ( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"
    printf '\n'
    ans=-1;

done

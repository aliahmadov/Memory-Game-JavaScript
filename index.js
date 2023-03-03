


let numbers = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


let icons = [
    '<i class="fa-solid fa-face-smile "></i>',
    '<i class="fa-solid fa-face-kiss-beam "></i>',
    '<i class="fa-regular fa-face-grin-hearts "></i>',
    '<i class="fa-solid fa-face-smile-beam "></i>',
    '<i class="fa-regular fa-face-grin-beam "></i>',
    '<i class="fa-solid fa-face-angry "></i>',
    '<i class="fa-solid fa-face-tired "></i>',
    '<i class="fa-solid fa-face-smile-wink "></i>',
    '<i class="fa-solid fa-face-laugh-beam "></i>',
    '<i class="fa-solid fa-face-flushed "></i>'

]


function main() {

    let mytable = document.getElementById("game-area");
    let content = "";
    for (let i = 0; i < 4; i++) {
        content += "<tr>";
        for (let k = 0; k < 5; k++) {
            let id = `${i + 1}${k + 1}`;

            content += `
                <td class='emoji animate__animated animate__slow 2s' id='${id}' onclick='Click(id)' '>  
                    ${icons[0]}
                    </td>
                `;

        }

        content += "</tr>";
    }
    console.log(numbers);
    mytable.innerHTML = content;
    FullTable();

    CheckCards();


}


function FullTable() {
    let elements = document.getElementsByClassName('emoji');
    let random_nums = [];

    for (let i = 0; i < 10; i++) {

        for (let k = 0; k < 2; k++) {

            while (true) {
                number = getRandom(20);

                if (!random_nums.includes(number)) {
                    elements[number].innerHTML = icons[i];
                    random_nums.push(number);
                    break;
                }
                else
                    continue;

            }

        }
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

isAllowed = false;
let selectedCards = [];
let counter = 0;

let move_count = 0;
let corr_count = 0;
let acc_level = 0;

function Click(id) {
    if (isAllowed && counter < 2) {
        let card = document.getElementById(id);
        selectedCards.push(card);
        card.classList.add("animate__flipInY");
        card.style.backgroundColor = "#FCF800";
        counter++;
    }
    else {
        CheckCards();
    }

}


function CheckCards() {
    let cards = document.getElementsByClassName("emoji");
    isAllowed = true;

    if (selectedCards.length == 2) {
        isAllowed = false;
        if (selectedCards[0].innerHTML == selectedCards[1].innerHTML) {
            var sound = new Audio("sounds\\correct.wav");
            sound.play();
            let correct=document.getElementById("correct");
            corr_count++;
            correct.innerHTML=corr_count;
            for (let i = 0; i < 2; i++) {

                selectedCards[i].style.backgroundColor = "#00FF00";
                selectedCards[i].classList.remove("animate__flipInY");
                selectedCards[i].classList.add("animate__shakeY");
                selectedCards[i].classList.add("animate__fadeOutLeftBig");

            }
        }
        else {
            var sound = new Audio("sounds\\wrong-answer (2).wav");
            sound.play();
            for (let i = 0; i < 2; i++) {
                
                selectedCards[i].classList.add("animate__shakeX");
                selectedCards[i].style.backgroundColor = "#000000";
                selectedCards[i].classList.remove("animate__flipInY");
            }
        }
        move_count++;
        let moves = document.getElementById("moves");
        moves.innerHTML=move_count.toString();
        percent=((corr_count/move_count)*100).toFixed(2);
        acc_level=percent.toString() + "%";
        accuracy=document.getElementById("accuracy");
        accuracy.innerHTML=acc_level;
        counter = 0;
        selectedCards = [];
        isAllowed = true;
    }

}





main();
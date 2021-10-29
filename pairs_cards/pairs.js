document.addEventListener('DOMContentLoaded', function() {
    const count = 16;
    let button = [];

    let container = document.createElement('div');

    let hasFlippedCard = false;
    let firstCard, secondCard;

    function createForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let createCardFieldButton = document.createElement('button');
        
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Кол-во карточек по вертикали/горизонтали';
        buttonWrapper.classList.add('input-group-append');
        createCardFieldButton.classList.add('btn', 'btn-primary');
        createCardFieldButton.textContent = 'Начать игру';

        document.body.append(form);
        buttonWrapper.append(createCardFieldButton);
        form.append(input);
        form.append(buttonWrapper);

        form.addEventListener('submit', function(event) {
            container.innerHTML = "";
            event.preventDefault();
            if(input.value % 2 == 0 && input.value >= 2 && input.value <= 10) {
                createCardField(Math.pow(input.value, 2));
            } else {
                createCardField();
            }
        });
    }

    /*if(true) {
        createCardField();
    }*/

    //console.log(document.body.style.width);

    function createCardField(number = count) {

        for(let i = 0; i < number; ++i) {
            button[i] = document.createElement('button');
            button[i].value = (i % 8) + 1;

            document.body.append(container);
            
            container.appendChild(button[i]);
            
            container.style.width = Math.sqrt(number) + '00px';
            container.style.height = Math.sqrt(number) + '00px';
        }

        for (let i = button.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
            
            [button[i].value, button[j].value] = [button[j].value, button[i].value];
        }

        for(let i = 0; i < number; ++i) {
            button[i].addEventListener('click', function() {
                button[i].textContent = button[i].value;
                if (!hasFlippedCard) {
                    firstCard = this;
                    hasFlippedCard = true;
                    one = i;
                    return;
                }
                
                secondCard = this;
                hasFlippedCard = false;

                let two = i;
                
                if(firstCard.textContent !== secondCard.textContent || one == two) {
                    firstCard.textContent = '';
                    secondCard.textContent = '';
                }
    
            //console.log(firstCard.textContent);
            //console.log(secondCard.textContent);
            //console.log(one);
            //console.log(two);
            
            }); 
        }
    }
    
    window.createForm = createForm();
});
const score = document.querySelector('.score_value')
const final_score = document.querySelector('.final_score > span')
const melhor_score = document.querySelector('.melhor_score > span')
const nome_score = document.querySelector('#nome_score')
const menu = document.querySelector('.menu_screen')
const btn_play = document.querySelector('.btn_play')
const dificuldade = document.querySelector('#id_dificuldade')
const nome_da_dificuldade = document.querySelector('#nome_da_dificuldade')
const exposed_dificulty = document.querySelector('#exposed_dificulty')
const controle_esquerda = document.querySelector('#esquerda')
const controle_cima = document.querySelector('#cima')
const controle_baixo = document.querySelector('#baixo')
const controle_direita = document.querySelector('#direita')
const controles = document.querySelector('#controles')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

console.log(dificuldade.value);


let value = dificuldade.value
let padrao = true
let facil = false
let medio = false
let dificil = false
let extremo = false
let impossivel = false

const Cheak_difficulty = () => {
    
    if (nome_da_dificuldade.innerText == 'Aleatório') {
        value = Randow_Number(1, 5)
        console.log(value);
    }

    if (value == 1) {
        facil = true
        exposed_dificulty.innerText = 'Dificuldade: Fácil'
        console.log('dificuldade = facil');

        
        padrao = false
        medio = false
        dificil = false
        extremo = false
        impossivel = false
    }

    if (value == 2) {
        medio = true
        exposed_dificulty.innerText = 'Dificuldade: Médio'
        console.log('dificuldade = medio');

        padrao = false    
        facil = false
        dificil = false
        extremo = false
        impossivel = false

    }

    if (value == 3) {
        dificil = true
        exposed_dificulty.innerText = 'Dificuldade: Difícil'
        console.log('dificuldade = dificil');

        padrao = false    
        facil = false
        medio = false
        extremo = false
        impossivel = false

    }

    if (value == 4) {
        extremo = true
        exposed_dificulty.innerText = 'Dificuldade: Extremo'
        console.log('dificuldade = extremo');

        padrao = false    
        facil = false
        medio = false
        dificil = false
        impossivel = false

    }

    if (value == 5) {
        impossivel = true
        exposed_dificulty.innerText = 'Dificuldade: Impossível'
        console.log('dificuldade = impossivel');

        padrao = false    
        facil = false
        medio = false
        dificil = false
        extremo = false
    }
    
    if (nome_da_dificuldade.innerText == 'Fácil') {
        facil = true
        console.log('dificuldade = facil');

        exposed_dificulty.innerText = 'Dificuldade: Fácil'

        padrao = false
        medio = false
        dificil = false
        extremo = false
        impossivel = false
    }

    if (nome_da_dificuldade.innerText == 'Médio') {
        medio = true
        console.log('dificuldade = medio');

        exposed_dificulty.innerText = 'Dificuldade: Médio'
        
        padrao = false    
        facil = false
        dificil = false
        extremo = false
        impossivel = false
    }

    if (nome_da_dificuldade.innerText == 'Difícil') {
        dificil = true
        console.log('dificuldade = dificil');

        exposed_dificulty.innerText = 'Dificuldade: Difícil'

        padrao = false    
        facil = false
        medio = false
        extremo = false
        impossivel = false
    }

    if (nome_da_dificuldade.innerText == 'Extremo') {
        extremo = true
        console.log('dificuldade = extremo');

        exposed_dificulty.innerText = 'Dificuldade: Extremo'

        padrao = false    
        facil = false
        medio = false
        dificil = false
        impossivel = false
    }

    if (nome_da_dificuldade.innerText == '☠️ Impossível ☠️') {
        impossivel = true
        console.log('dificuldade = impossivel');

        exposed_dificulty.innerText = 'Dificuldade: Impossível'
        
        
        padrao = false    
        facil = false
        medio = false
        dificil = false
        extremo = false
    }

    if (value > 0 || facil || medio || dificil || extremo || impossivel) {
        padrao = false
    }
} 


let parar = false

const audio = new Audio('Assets/Audio/audio.mp3')

const size = 30

const Inicial_Position = {x: 270, y: 240}

let snake = [Inicial_Position]


const Randow_Number = (Min, Max) => {
    return Math.round(Math.random() * (Max - Min) + Min)
}

const Randow_Position = () => {
    const number = Randow_Number(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const Randow_Color = () => {
    const red = Randow_Number(0, 255)
    const blue = Randow_Number(0, 255)
    const green = Randow_Number(0, 255)

    return `rgb(${red}, ${blue}, ${green})`
}

const food = {
    x: Randow_Position(0, 570),
    y: Randow_Position(0, 570),
    color: Randow_Color()
}

let direction, loop_id

const Draw_Food = () => {
    const {x, y, color} = food
    
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = '#ddd'
    
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = '#ddd'
        }
        
        ctx.fillRect(position.x, position.y, size, size)  
    })
}

controle_esquerda.addEventListener('click', () => {
    if (direction != 'right') {
        direction = 'left'
    }
})

controle_cima.addEventListener('click', () => {
    if (direction != 'down') {
        direction = 'up'
    }

})

controle_baixo.addEventListener('click', () => {
    if (direction != 'up') {
        direction = 'down'
    }

})

controle_direita.addEventListener('click', () => {
    if (direction != 'left') {
        direction = 'right'
    }

})


const move_snake = () => {
    if (!parar) {
        if (!direction) return
    
        const head = snake[snake.length -1]
        
        if (direction == 'right') {
            snake.push({ x: head.x + size, y: head.y })
        }
        
        if (direction == 'left') {
            snake.push({ x: head.x - size, y: head.y })
        }
        
        if (direction == 'down') {
            snake.push({ x: head.x, y: head.y + size })
        }
        
        if (direction == 'up') {
            snake.push({ x: head.x, y: head.y - size })
        }
        
        snake.shift()
        
    }
    
}

const Draw_Grid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#191919'
    
    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        
        ctx.stroke()
        
        ctx.beginPath()
        
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)

        ctx.stroke()
    }
    
}

const Chek_Collision = () => {
    const head = snake[snake.length - 1]
    const Canvas_Limit = canvas.width - size
    const Neck_Index = snake.length - 2

    const Wall_Collision = 
    head.x < 0 || head.x > Canvas_Limit || head.y < 0 || head.y > Canvas_Limit
        
    const Self_Collision = snake.find((position, index) => {
        return index < Neck_Index && position.x == head.x && position.y == head.y
    })
    
    if (Wall_Collision || Self_Collision) {
        Game_Over()
    }
}

let number = 0
let objeto = {}
let melhor_pontuacao = []
const Chek_Eat = () => {
    const head = snake[snake.length - 1]
    
    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio.play()
        
        let x = Randow_Position(0, 570)
        let y = Randow_Position(0, 570)
        
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = Randow_Position(0, 570)
            y = Randow_Position(0, 570)
        }

        food.x = x
        food.y = y
        food.color = Randow_Color()

        number++
        Increment_Score(number)

    }
}

let zerar = false
let cheak_save = false
let parar_cheak_save = false
let salvar_number = [0]

if (!JSON.parse(localStorage.getItem('Pontos'))) {
    localStorage.setItem('Pontos', JSON.stringify(salvar_number))
}

const Game_Over = () => {
    parar_cheak_save = false
    if (!parar_cheak_save) {
        cheak_save = true
        parar_cheak_save = true
    }
    if (JSON.parse(localStorage.getItem('Pontos'))) {
        salvar_number = JSON.parse(localStorage.getItem('Pontos'))
        
        for (let c = 0; c < salvar_number.length; c++) {
            if (cheak_save) {
                    if (salvar_number[c] <= number) {
                        salvar_number.splice(c, 1)
                    }
                salvar_number.push(number)
                localStorage.setItem('Pontos', JSON.stringify(salvar_number))
        
            }
        
            if (salvar_number[0] <= 9) {
                melhor_score.innerText = `0${salvar_number[0]}`
            } else {
                melhor_score.innerText = salvar_number[0]
            }
        }
    }     

    zerar = true
    parar = true
    direction = undefined
    
    menu.style.display = 'flex'
    final_score.innerText = score.innerText
    canvas.style.filter = 'blur(5px)'
    nome_score.style.filter = 'blur(5px)'
    score.style.filter = 'blur(5px)'
    exposed_dificulty.style.filter = 'blur(5px)'
    controles.style.filter = 'blur(5px)'
}

btn_play.addEventListener('click', () => {
    if (cheak_save) {
        cheak_save = false
    }

    food.x = Randow_Position(0, 570)
    food.y = Randow_Position(0, 570)
    food.color = Randow_Color()
    
    if (nome_da_dificuldade.innerText == 'Aleatório') {
        console.log(value);
        
    }
    
    if (value == 1) {
        exposed_dificulty.innerText = 'Dificuldade: Fácil'
    }
    
    if (value == 2) {
        exposed_dificulty.innerText = 'Dificuldade: Médio'
        
    }
    
    if (value == 3) {
        exposed_dificulty.innerText = 'Dificuldade: Difícil'

    }

    if (value == 4) {
        exposed_dificulty.innerText = 'Dificuldade: Extremo'

    }

    if (value == 5) {
        exposed_dificulty.innerText = 'Dificuldade: Impossível'

    }

    if (zerar) {
        number = 0
        score.innerText = number
        zerar = false
    }

    Cheak_difficulty()
    parar = false
    score.innerText = '00'
    menu.style.display = 'none'
    canvas.style.filter = 'none'
    nome_score.style.filter = 'none'
    score.style.filter = 'none'
    exposed_dificulty.style.filter = 'none'
    controles.style.filter = 'none'

    snake = [{x: 270, y: 240}]
    value = dificuldade.value
})

const Increment_Score = (number) => {
    if (zerar) {
        zerar = false
    } else {
        if (number <= 9) {
            console.log('else = true')
            score.innerText = `0${number++}`
        } else {
            console.log('else = true')
            score.innerText = number++
        }
    }
    
}

const Game_Loop = () => {
    clearInterval(loop_id)
    ctx.clearRect(0, 0, 600, 600)
    
    Draw_Grid()
    Draw_Food()
    move_snake()
    drawSnake()
    Chek_Eat() 
    Chek_Collision()
    
    if (padrao) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 100)
    }

    if (facil) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 80)
    }

    if (medio) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 70)
    }

    if (dificil) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 60)
    }

    if (extremo) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 40)
    }

    if (impossivel) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 35)
    }
}

Game_Loop()

document.addEventListener('keydown', ({ key }) => {
    if (key == 'ArrowRight' && direction != 'left') {
        direction = 'right'
    }

    if (key == 'ArrowLeft'  && direction != 'right') {
        direction = 'left'
    }
    
    if (key == 'ArrowDown'  && direction != 'up') {
        direction = 'down'
    }
    
    if (key == 'ArrowUp'  && direction != 'down') {
        direction = 'up'
    }
})


dificuldade.addEventListener("input", function() {

  var value = dificuldade.value
  var color

  switch(value) {
    case '1':
       color = '#4CAF50'
       nome_da_dificuldade.innerText = 'Fácil'
       break
    case '2':
       color = '#FFD700'
       nome_da_dificuldade.innerText = 'Médio'

       break
    case '3':
       color = '#FF0000'
       nome_da_dificuldade.innerText = 'Difícil'

       break
    case '4':
      color = '#8B0000'
       nome_da_dificuldade.innerText = 'Extremo'

      break
    case '5':
      color = '#000000'
       nome_da_dificuldade.innerText = '☠️ Impossível ☠️'

      break
    default:
       color = 'transparent'
       nome_da_dificuldade.innerText = 'Aleatório'

  }

  
  dificuldade.style.background = 'linear-gradient(to right, ' + color + ' 0%, ' + color + ' ' + (value * 20) + '%, #ddd ' + (value * 20) + '%, #ddd 100%)'

})

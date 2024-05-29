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
const trocar_modo_para_E = document.querySelector('#mais')
const trocar_modo_para_D = document.querySelector('#menos')
const img_do_modo_de_jogo = document.querySelector('#modo_de_jogo')
const nome_do_modo = document.querySelector('#nome_do_modo')
const quantidade_de_vidas = document.querySelector('#vidas > span')
const numero_de_vidas = document.querySelector('#vidas')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
    } else if (value == 1) {
        facil = true
        exposed_dificulty.innerText = 'Dificuldade: Fácil'

        
        padrao = false
        medio = false
        dificil = false
        extremo = false
        impossivel = false
    } else if (value == 2) {
        medio = true
        exposed_dificulty.innerText = 'Dificuldade: Médio'

        padrao = false    
        facil = false
        dificil = false
        extremo = false
        impossivel = false

    } else if (value == 3) {
        dificil = true
        exposed_dificulty.innerText = 'Dificuldade: Difícil'

        padrao = false    
        facil = false
        medio = false
        extremo = false
        impossivel = false

    } else if (value == 4) {
        extremo = true
        exposed_dificulty.innerText = 'Dificuldade: Extremo'

        padrao = false    
        facil = false
        medio = false
        dificil = false
        impossivel = false

    } else if (value == 5) {
        impossivel = true
        exposed_dificulty.innerText = 'Dificuldade: Impossível'

        padrao = false    
        facil = false
        medio = false
        dificil = false
        extremo = false
    } else if (nome_da_dificuldade.innerText == 'Fácil') {
        facil = true

        exposed_dificulty.innerText = 'Dificuldade: Fácil'

        padrao = false
        medio = false
        dificil = false
        extremo = false
        impossivel = false
    } else if (nome_da_dificuldade.innerText == 'Médio') {
        medio = true

        exposed_dificulty.innerText = 'Dificuldade: Médio'
        
        padrao = false    
        facil = false
        dificil = false
        extremo = false
        impossivel = false
    } else if (nome_da_dificuldade.innerText == 'Difícil') {
        dificil = true

        exposed_dificulty.innerText = 'Dificuldade: Difícil'

        padrao = false    
        facil = false
        medio = false
        extremo = false
        impossivel = false
    } else if (nome_da_dificuldade.innerText == 'Extremo') {
        extremo = true

        exposed_dificulty.innerText = 'Dificuldade: Extremo'

        padrao = false    
        facil = false
        medio = false
        dificil = false
        impossivel = false
    } else if (nome_da_dificuldade.innerText == '☠️ Impossível ☠️') {
        impossivel = true

        exposed_dificulty.innerText = 'Dificuldade: Impossível'
        
        
        padrao = false    
        facil = false
        medio = false
        dificil = false
        extremo = false
    } else if (value > 0 || facil || medio || dificil || extremo || impossivel) {
        padrao = false
    }
} 


let parar = false

const audio_comendo_fruta = new Audio('Assets/Audio/audio.mp3')
const audio_de_dano = new Audio('Assets/Audio/dano.mp3')
const audio_de_morte = new Audio('Assets/Audio/morte.mp3')

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

const parede_aleatoria = {
    x: Randow_Position(0, 570),
    y: Randow_Position(0, 570),
    color: '#191919'
}

const food = {
    x: Randow_Position(0, 570),
    y: Randow_Position(0, 570),
    color: Randow_Color()
}

const fakefood = {
    x: Randow_Position(0, 570),
    y: Randow_Position(0, 570),
    color: Randow_Color()
}

let classico = false
let portal = false
let parede = false
let sorte = false
let cheak_number = 1
trocar_modo_para_D.addEventListener('click', () => {
        cheak_number += 1

        if (cheak_number == 1) {
            img_do_modo_de_jogo.src = 'Assets/Utils/Imgs/classico.png'
            nome_do_modo.innerText = 'Jogo clássico'
            cheak_number += 3
        }else if (cheak_number == 2) {
            img_do_modo_de_jogo.src = 'Assets/Utils/Imgs/poison_apple.png'
            nome_do_modo.innerText = 'Cofie na sorte'
        } else if (cheak_number == 3) {
            img_do_modo_de_jogo.src = 'Assets/Utils/Imgs/classico.png'
            nome_do_modo.innerText = 'Jogo clássico'

            cheak_number = 1
        }
    })

    trocar_modo_para_E.addEventListener('click', () => {
        cheak_number -= 1
        
        if (cheak_number == 0) {
            img_do_modo_de_jogo.src = 'Assets/Utils/Imgs/classico.png'
            nome_do_modo.innerText = 'Jogo clássico'
            cheak_number = 2
        }else if (cheak_number == 1) {
            img_do_modo_de_jogo.src = 'Assets/Utils/Imgs/poison_apple.png'
            nome_do_modo.innerText = 'Cofie na sorte'
        }

})

let direction, loop_id

const Draw_Food = () => {
    const {x, y, color} = food
    
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

var Draw_FakeFood = () => {
    if (sorte) {
        const {x, y, color} = fakefood
        
        
        ctx.fillStyle = color
        ctx.fillRect(x, y, size, size)
        ctx.shadowBlur = 0
    }
}

var Draw_Randow_Walls = () => {
    
    if (parede) {
        const {x, y, color} = parede_aleatoria
        
        ctx.fillStyle = color
        ctx.fillRect(x, y, size, size)
        ctx.shadowBlur = 0
    }
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
        } else if (direction == 'left') {
            snake.push({ x: head.x - size, y: head.y })
        } else if (direction == 'down') {
            snake.push({ x: head.x, y: head.y + size })
        } else if (direction == 'up') {
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

var audio_em_reproducao = false
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
        if (!audio_em_reproducao) {
            audio_de_morte.play()
            audio_em_reproducao = true
        }
        Game_Over()
    }
    
}

let vidas = 3
let number = 0
let objeto = {}
let melhor_pontuacao = []
const Chek_Eat = () => {
    const head = snake[snake.length - 1]
    
    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio_comendo_fruta.play()
        
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
        fakefood.x = Randow_Position()
        fakefood.y = Randow_Position()
        fakefood.color = Randow_Color()
    } else if (sorte) {
        numero_de_vidas.style.display = 'flex'
        quantidade_de_vidas.innerText = vidas
        if (head.x == fakefood.x && head.y == fakefood.y) {
            audio_de_dano.play()
            quantidade_de_vidas.innerText = vidas
            fakefood.x = Randow_Position()
            fakefood.y = Randow_Position()
            fakefood.color = Randow_Color()
            food.x = Randow_Position()
            food.y = Randow_Position()
            food.color = Randow_Color()
            if (vidas > 0) {
                vidas -= 1
            }else if (vidas == 0) {
                Game_Over()
                vidas = 0
            }
        }
    } else if (parede) {

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
    }else if (JSON.parse(localStorage.getItem('Pontos'))) {
        salvar_number = JSON.parse(localStorage.getItem('Pontos'))
        
        for (let c = 0; c < salvar_number.length; c++) {
            if (cheak_save) {
                    if (salvar_number[c] <= number) {
                        salvar_number.splice(c, 1)
                        salvar_number.push(number)
                        localStorage.setItem('Pontos', JSON.stringify(salvar_number))
                    }
        
            }
        }     
        
            if (salvar_number[0] <= 9) {
                melhor_score.innerText = `0${salvar_number[0]}`
            } else {
                melhor_score.innerText = salvar_number[0]
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
    direction = undefined
    vidas = 3
    audio_em_reproducao = false
    if (cheak_save) {
        cheak_save = false
    }

    food.x = Randow_Position(0, 570)
    food.y = Randow_Position(0, 570)
    food.color = Randow_Color()

    fakefood.x = Randow_Position(0, 570)
    fakefood.y = Randow_Position(0, 570)
    fakefood.color = Randow_Color()
    
    if (nome_da_dificuldade.innerText == 'Aleatório') {
        
    } else if (value == 1) {
        exposed_dificulty.innerText = 'Dificuldade: Fácil'
    } else if (value == 2) {
        exposed_dificulty.innerText = 'Dificuldade: Médio'
        
    } else if (value == 3) {
        exposed_dificulty.innerText = 'Dificuldade: Difícil'

    } else if (value == 4) {
        exposed_dificulty.innerText = 'Dificuldade: Extremo'

    } else if (value == 5) {
        exposed_dificulty.innerText = 'Dificuldade: Impossível'

    } else if (zerar) {
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
    


    if (nome_do_modo.innerText == 'Jogo clássico') {
        classico = true
        portal = false
        parede = false
        sorte = false
    } else if (nome_do_modo.innerText == 'Portal aleatório') {
        portal = true
        classico = false
        parede = false
        sorte = false
    } else if (nome_do_modo.innerText == 'Parede aleatória') {
        parede = true
        classico = false
        portal = false
        sorte = false
    } else if (nome_do_modo.innerText == 'Cofie na sorte') {
        sorte = true
        classico = false
        portal = false
        parede = false
    } 
    
})

const Increment_Score = (number) => {
    if (number <= 9) {
        score.innerText = `0${number++}`
    } else {
        score.innerText = number++
    }
}



const Game_Loop = () => {
    clearInterval(loop_id)
    ctx.clearRect(0, 0, 600, 600)

    if (sorte) {
        Draw_FakeFood()
    }
    
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
    }  else if (facil) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 80)
    }  else if (medio) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 70)
    } else if (dificil) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 60)
    } else if (extremo) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 40)
    } else if (impossivel) {
        loop_id = setTimeout(() => {
            Game_Loop()
        }, 35)
    }
}

Game_Loop()

document.addEventListener('keydown', ({ key }) => {
    if (key == 'ArrowRight' && direction != 'left') {
        direction = 'right'
    } else if (key == 'ArrowLeft'  && direction != 'right') {
        direction = 'left'
    } else if (key == 'ArrowDown'  && direction != 'up') {
        direction = 'down'
    } else if (key == 'ArrowUp'  && direction != 'down') {
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

function identificarTipoDispositivo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'Celular';
    } else if (/Windows|Win16|Win32|Win64/i.test(platform)) {
        return 'PC';
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform)) {
        return 'Mac';
    } else if (/Linux/i.test(platform)) {
        // Verifica se é uma Smart TV baseada em Linux
        if (/SMART-TV|SmartTV|smarttv|Smart|HbbTV|NetCast|Linux/i.test(userAgent)) {
            return 'TV';
        } else {
            // Se não for uma Smart TV, assume-se que seja um dispositivo Linux não específico
            return 'Linux';
        }
    } else {
        return 'Desconhecido';
    }
}
function identificarDispositivo() {
const userAgent = navigator.userAgent;
const platform = navigator.platform;

if (/Android/i.test(userAgent)) {
return 'Android';
} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
return 'iOS';
} else if (/Windows Phone/i.test(userAgent)) {
return 'Windows Phone';
} else if (/Linux/i.test(platform)) {
return 'Linux';
} else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform)) {
return 'Mac';
} else if (/Windows|Win16|Win32|Win64/i.test(platform)) {
return 'Windows';
} else {
return 'Desconhecido';
}
}

// Obtém informações sobre o dispositivo
const tipoDispositivo = identificarDispositivo();
const larguraTela = window.screen.width;
const alturaTela = window.screen.height;
const tipoDispositivo2 = identificarTipoDispositivo();

if (tipoDispositivo2 == 'Celular') {
    controles.style.display = 'flex'
}

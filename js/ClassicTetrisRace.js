var _can = document.getElementById("canvas");
var _ctx = _can.getContext("2d");
var _score = document.getElementById("score")

var _boxSize = 20;
var nCol = 9, nRow = 27;
var isLeft, isRight, isGameOver = false;
var score = 0;
var fallingSpeed = 6;

//Задаем ширину и высоту холста
_can.width = nCol * _boxSize;
_can.height = nRow * _boxSize;

//Создание игры с падающим объектом
function fallingObject (x, y) 
{
    this.x = x;
    this.y = y;

    this.draw = function()
    {
        //Создание игрового поля
        _ctx.clearRect(0 ,0, _can.width, _can.height);

        for(var i = 0; i < _can.width; i += _boxSize)
        {
            for(var j = 0; j < _can.height; j += _boxSize)
            {
                _ctx.beginPath();
                _ctx.rect(i, j, _boxSize, _boxSize);
                _ctx.stroke();
                _ctx.closePath();
            }
        }
        
        //Создание формы машинки соперника в положении холста
        _ctx.beginPath();
        _ctx.rect(this.x +  _boxSize, this.y,  _boxSize, 4 *  _boxSize);
        _ctx.rect(this.x, this.y + _boxSize, 3 * _boxSize, _boxSize)
        _ctx.rect(this.x, this.y + 3 * _boxSize, 3 * _boxSize, _boxSize)
        _ctx.fillStyle = "red";
        _ctx.fill();
    }

    //Создание движения машинки соперника, при достижение конца холста она снова появляется сверху
    this.update = function()
    {
        if(!isGameOver)
        {
            this.y += fallingSpeed;
        }
        if(this.y > _can.height + _boxSize)
        {
            this.x = Math.random() < 0.3 ? 0 : Math.random() > 0.6 ? 3 * _boxSize : 6 * _boxSize; //Задание рандомного положения по ширине при появлении сверху
            this.y = 0;
        }

        //Создание столкновения машинок (условие конца игры)
        if(this.x == mObj.x && this.y + 4 * _boxSize > 24 * _boxSize)
        {
            isGameOver = true;
        }
        
        this.draw();
    }
}

//Создание главного объекта
function mainObject (x, y)
{
    this.x = x;
    this.y = y;

    //Создание формы главной машинки в положении холста
    this.draw = function()
    {
        _ctx.beginPath();
        _ctx.rect(this.x + _boxSize, this.y + 23 * _boxSize, _boxSize, 4 * _boxSize);
        _ctx.rect(this.x, this.y + 24 * _boxSize, 3 * _boxSize, _boxSize);
        _ctx.rect(this.x, this.y + 26 * _boxSize, 3 * _boxSize, _boxSize);
        _ctx.fillStyle = "blue";
        _ctx.fill();
    }

    //Создание условий и правил движения главной машинки
    this.update = function()
    {
        if(isLeft && !isGameOver && this.x > 0)
        {
            this.x -= 3 * _boxSize;
            isLeft = false;
        }
        if(isRight && !isGameOver && this.x + 3 * _boxSize < _can.width)
        {
            this.x += 3 * _boxSize;
            isRight = false;
        }
        
        score++;
        _score.innerText = "Your score = " + score;

        this.draw();
    }
}

//Создание кнопок для движения главной машинки
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e)
{
    if(e.keyCode == 37) //Левая стрелка нажата
    {
        isLeft = true;
    }
    else if (e.keyCode == 39) //Правая стрелка нажата
    {
        isRight = true;
    }
}

var fObj = new fallingObject(3 * _boxSize, 0);
var mObj = new mainObject (0, 0);

function drawGame()
{
    if(!isGameOver)
    {
        fObj.update();
        mObj.update();

        //Увеличения скорости по ходу игры
        if (score >= 500 && score < 1000)
        {
            fallingSpeed = 7;
        }
        if (score > 1000)
        {
            fallingSpeed = 8;
        }

    }
    else
    {
        alert("GAME OVER!\n\nPlease click OK to restart");
        location.reload();
        isGameOver = false;
    }
}

setInterval(drawGame, 10);
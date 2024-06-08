;"use strict";

/**
 * Инициализация поля
 */
window.onload = () => {
    let screen = new layout(settings.canvas);

    screen.generate();
    screen.drawingCanvas();
    screen.settings.canvas.oncontextmenu = () => false;

    screen.settings.canvas.onmousedown = (e) => {
        let targetCoordinates = e.target.getBoundingClientRect(),
            coordinates = {
                'x': e.clientX - targetCoordinates.left,
                'y': e.clientY - targetCoordinates.top,
            },
            mouseButton = +e.button,
            cell = screen.getCellFromCoordinates(coordinates),
            ctx = screen.settings.canvas.getContext('2d');
        if (mouseButton === settings.mouse.leftClick) {
            screen.leftClick(cell);
        } else if (mouseButton === settings.mouse.rightClick) {
            screen.rightClick(cell);
        }
        screen.drawCell(cell.row, cell.col, ctx);
    };

    document.getElementById('changeOptions').onclick = (e) => {
        let rows = +document.getElementById('rows').value;
        let cols = +document.getElementById('cols').value;
        let bombs = +document.getElementById('bombs').value;
        let sprite = +document.getElementById('sprite').value;

        if (rows * cols > bombs) {
            screen.changeDefaultOptions({
                'rows': rows,
                'cols': cols,
                'bombs': bombs,
                'sprite': sprite
            });
            screen.generate();
            screen.drawingCanvas();
        } else {
            alert('Ошибочные данные');
        }
    }
};


let settings = {
    'canvas': {
        'rows': 15,
        'cols': 15,
        'bombs': 50,
        'cw': 50,
        'ch': 50,
        'sprite': '3'
    },
    'mouse': {
        'rightClick': 2,
        'leftClick': 0,
    }
};

let sprites = {
    '1': {
        'image': 'sprite1.png',
        'data': [
            {'sx': 2, 'sy': 2, 'sWidth': 30, 'sHeight': 29,},   // 0 - 0
            {'sx': 34, 'sy': 2, 'sWidth': 30, 'sHeight': 29,},  // 1 - 1
            {'sx': 66, 'sy': 2, 'sWidth': 30, 'sHeight': 29,},  // 2 - 2
            {'sx': 98, 'sy': 2, 'sWidth': 30, 'sHeight': 29,},  // 3 - 3
            {'sx': 130, 'sy': 2, 'sWidth': 31, 'sHeight': 29,}, // 4 - 4
            {'sx': 2, 'sy': 34, 'sWidth': 30, 'sHeight': 29,},  // 5 - 5
            {'sx': 34, 'sy': 34, 'sWidth': 30, 'sHeight': 29,}, // 6 - 6
            {'sx': 66, 'sy': 34, 'sWidth': 30, 'sHeight': 29,}, // 7 - 7
            {'sx': 98, 'sy': 34, 'sWidth': 30, 'sHeight': 29,}, // 8 - 8
            {'sx': 98, 'sy': 64, 'sWidth': 27, 'sHeight': 28,}, // 9 - bomb
            {'sx': 66, 'sy': 64, 'sWidth': 27, 'sHeight': 28,}, // 10 - question
            {'sx': 2, 'sy': 64, 'sWidth': 27, 'sHeight': 28,},  // 11 - flag
            {'sx': 130, 'sy': 32, 'sWidth': 27, 'sHeight': 28,},// 12 - closed
            {'sx': 34, 'sy': 64, 'sWidth': 27, 'sHeight': 28,}, // bomb explode
        ]
    },
    '2': {
        'image': 'sprite2.png',
        'data': [
            {'sx': 2, 'sy': 2, 'sWidth': 28, 'sHeight': 28,},   // 0 - 0
            {'sx': 34, 'sy': 2, 'sWidth': 28, 'sHeight': 28,},  // 1 - 1
            {'sx': 66, 'sy': 2, 'sWidth': 28, 'sHeight': 28,},  // 2 - 2
            {'sx': 98, 'sy': 2, 'sWidth': 28, 'sHeight': 28,},  // 3 - 3
            {'sx': 2, 'sy': 34, 'sWidth': 28, 'sHeight': 28,}, // 4 - 4
            {'sx': 34, 'sy': 34, 'sWidth': 28, 'sHeight': 28,},  // 5 - 5
            {'sx': 66, 'sy': 34, 'sWidth': 28, 'sHeight': 28,}, // 6 - 6
            {'sx': 98, 'sy': 34, 'sWidth': 28, 'sHeight': 28,}, // 7 - 7
            {'sx': 2, 'sy': 66, 'sWidth': 28, 'sHeight': 28,}, // 8 - 8
            {'sx': 67, 'sy': 67, 'sWidth': 28, 'sHeight': 29,}, // 9 - bomb
            {'sx': 34, 'sy': 98, 'sWidth': 27, 'sHeight': 28,}, // 10 - question
            {'sx': 98, 'sy': 66, 'sWidth': 27, 'sHeight': 28,},  // 11 - flag
            {'sx': 34, 'sy': 66, 'sWidth': 27, 'sHeight': 28,},// 12 - closed
            {'sx': 2, 'sy': 98, 'sWidth': 27, 'sHeight': 28,}, // bomb explode
        ]
    },
    '3': {
        'image': 'sprite3.png',
        'data': [
            {'sx': 1538, 'sy': 1024, 'sWidth': 500, 'sHeight': 500,},   // 0 - 0
            {'sx': 2, 'sy': 1536, 'sWidth': 500, 'sHeight': 500,},  // 1 - 1
            {'sx': 514, 'sy': 1536, 'sWidth': 500, 'sHeight': 500,},  // 2 - 2
            {'sx': 1026, 'sy': 1536, 'sWidth': 500, 'sHeight': 500,},  // 3 - 3
            {'sx': 1538, 'sy': 1536, 'sWidth': 500, 'sHeight': 500,}, // 4 - 4
            {'sx': 2, 'sy': 2048, 'sWidth': 500, 'sHeight': 500,},  // 5 - 5
            {'sx': 514, 'sy': 2048, 'sWidth': 500, 'sHeight': 500,}, // 6 - 6
            {'sx': 1026, 'sy': 2048, 'sWidth': 500, 'sHeight': 500,}, // 7 - 7
            {'sx': 1538, 'sy': 2048, 'sWidth': 500, 'sHeight': 500,}, // 8 - 8
            {'sx': 2, 'sy': 1024, 'sWidth': 500, 'sHeight': 500,}, // 9 - bomb
            {'sx': 512, 'sy': 512, 'sWidth': 500, 'sHeight': 500,}, // 10 - question
            {'sx': 0, 'sy': 512, 'sWidth': 500, 'sHeight': 500,},  // 11 - flag
            {'sx': 0, 'sy': 0, 'sWidth': 500, 'sHeight': 500,},// 12 - closed
            {'sx': 513, 'sy': 1024, 'sWidth': 500, 'sHeight': 500,}, // bomb explode
        ]
    }
};

/**
 * Объект игрового поля
 */
let layout = function (settings) {
    this.settings = {
        'rows': settings.rows,
        'cols': settings.cols,
        'bombs': settings.bombs,
        'cw': settings.cw,
        'ch': settings.ch,
        'nearbyOffset': [
            [-1, -1],
            [-1, 0],
            [-1, +1],
            [0, -1],
            [0, +1],
            [+1, -1],
            [+1, 0],
            [+1, +1],
        ],
        'canvasWidth': settings.cols * settings.cw,
        'canvasHeight': settings.rows * settings.ch,
        'canvas': document.getElementById('canvas'),
        'canvasImage': new Image(),
        'canvasImageSrc': sprites[settings.sprite].image,
        'sprite': sprites[settings.sprite].data,
    };
    this._data = [];

    /**
     * Изменение набора стандартных настроек
     * @param options
     */
    this.changeDefaultOptions = (options) => {
        this.settings.rows = Math.min(options.rows ? options.rows : settings.rows, 50);
        this.settings.cols = Math.min(options.cols ? options.cols : settings.cols, 50);
        this.settings.bombs = Math.min(options.bombs ? options.bombs : settings.bombs, this.settings.rows * this.settings.cols);
        sprite = options.sprite && (options.sprite == 1 || options.sprite == 2 || options.sprite == 3) ? options.sprite : settings.sprite;
        this.settings.canvasImageSrc = sprites[sprite].image,
            this.settings.sprite = sprites[sprite].data,
            this.settings.canvasWidth = options.cols * this.settings.cw;
        this.settings.canvasHeight = options.rows * this.settings.ch;
    };

    /**
     * Генерация массива данных
     */
    this.generate = () => {

        /**
         * Генерация случайного распределения мин
         */
        let randomArr = new Array(this.settings.bombs).fill(1);
        randomArr[this.settings.rows * this.settings.cols - 1] = null;
        let j, temp, counter = 0;
        for (let i = randomArr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = randomArr[j];
            randomArr[j] = randomArr[i];
            randomArr[i] = temp;
        }

        /**
         * Создание массива данных для поля (_data)
         */
        for (let i = 0; i < this.settings.rows; i++) {

            this._data[i] = [];
            for (let j = 0; j < this.settings.cols; j++) {
                let cell = new cellTemplate();

                if (!!randomArr[counter]) {
                    cell.value = 9;
                } else {
                    cell.value = 0;
                }
                this._data[i][j] = cell;
                counter++;
            }
        }


        /**
         * Рассчет значений соседних от мин ячеек
         */
        for (let i = 0; i < this.settings.rows; i++) {
            for (let j = 0; j < this.settings.cols; j++) {
                if (this._data[i][j].value === 9) {
                    for (let z = 0; z < this.settings.nearbyOffset.length; z++) {
                        let offset = this.settings.nearbyOffset;
                        this.riseNearbyCell(i + offset[z][0], j + offset[z][1]);
                    }
                }
            }
        }
    };

    /**
     * Приращение значения ячейки
     * @param row
     * @param col
     */
    this.riseNearbyCell = (row, col) => {
        if (row >= 0 && row < this.settings.rows && col >= 0 && col < this.settings.cols) {
            if (this._data[row][col].value !== 9) {
                this._data[row][col].value++;
            }
        }
    };

    /**
     * Изменения статуса ячейки в открытый режим
     * Если значение ячейки равно нулю - соседние ячейки переводятся в открытый режим
     * @param cell
     */
    this.showEmptyCells = (cell) => {
        let offset = this.settings.nearbyOffset;
        this._data[cell.row][cell.col].status = this._data[cell.row][cell.col].value;
        if (this._data[cell.row][cell.col].value === 0) {
            for (let i = 0; i < offset.length; i++) {
                this.showNearbyCell({'row': cell.row + offset[i][0], 'col': cell.col + offset[i][1]});
            }
        }
    };

    /**
     * Изменения статуса ячейки в открытый режим
     * Если значение ячейки равно нулю - соседние ячейки переводятся в открытый режим
     * @param cell
     */
    this.exposeSolvedCell = (cell) => {
        let offset = this.settings.nearbyOffset;
        let missed = 0
        let toExpose = []
        for (let i = 0; i < offset.length; i++) {
            let row = cell.row + offset[i][0]
            let col = cell.col + offset[i][1]
            if (row >= 0 && row < this.settings.rows && col >= 0 && col < this.settings.cols) {
                if (this._data[row][col].value === 9 && this._data[row][col].status === 11) {
                    // found mine
                } else if (this._data[row][col].value === 9) {
                    missed++;
                } else {
                    toExpose.push({'row': row, 'col': col});
                }
            }
        }
        if (!missed) {
            for (let i = 0; i < toExpose.length; i++) {
                this.showNearbyCell(toExpose[i])
            }
        } else {
            alert("YOU LOOSE!!!")
        }

    };

    /**
     * Проверка существования ячейки и изменение ее статуса в открытый режим
     * Если значение ячейки равно нулю и она еще не открыта, рекурсивно вызывается пересчет соседних ячеек
     * @param cell
     */
    this.showNearbyCell = (cell) => {
        if (cell.row >= 0 && cell.row < this.settings.rows && cell.col >= 0 && cell.col < this.settings.cols) {
            if (this._data[cell.row][cell.col].value !== 0) {
                this._data[cell.row][cell.col].status = this._data[cell.row][cell.col].value;
            } else if (this._data[cell.row][cell.col].status !== this._data[cell.row][cell.col].value) {
                this.showEmptyCells(cell);
            }
        }
    };

    /**
     * Отрисовка канваса
     */
    this.drawingCanvas = () => {
        if (!!this.settings.canvas) {
            this.settings.canvas.width = this.settings.canvasWidth;
            this.settings.canvas.height = this.settings.canvasHeight;
            let ctx = this.settings.canvas.getContext('2d');
            this.settings.canvasImage.src = this.settings.canvasImageSrc;
            this.settings.canvasImage.onload = () => {
                for (let i = 0; i < this.settings.rows; i++) {
                    for (let j = 0; j < this.settings.cols; j++) {
                        this.drawCell(i, j, ctx);
                    }
                }
            };
        } else {
            alert('Ошибка определения поля.');
        }
    };

    /**
     * Получение номера строки и столбца ячейки массива
     * @param coordinates
     * @returns {{row: number, col: number}}
     */
    this.getCellFromCoordinates = (coordinates) => {
        return {
            'row': Math.floor(coordinates.y / this.settings.ch),
            'col': Math.floor(coordinates.x / this.settings.cw),
        };
    };

    /**
     * Действие при нажатии левой кнопкой мыши по полю
     * @param cell
     */
    this.leftClick = (cell) => {
        if (this._data[cell.row][cell.col].value === 9) {
            for (let i = 0; i < this.settings.rows; i++) {
                for (let j = 0; j < this.settings.cols; j++) {
                    if (this._data[i][j].status !== 11) {
                        this._data[i][j].status = this._data[i][j].value;
                    }
                }
            }

            this._data[cell.row][cell.col].status = 13;
        } else if (this._data[cell.row][cell.col].value === 0) {
            this.showEmptyCells(cell);
        } else {
            if (this._data[cell.row][cell.col].status !== this._data[cell.row][cell.col].value) {
                this._data[cell.row][cell.col].status = this._data[cell.row][cell.col].value;
            } else {
                this.exposeSolvedCell(cell)
            }
        }
        this.drawingCanvas();
    };

    /**
     * Действие при нажатии правой кнопкой мыши по полю
     * @param cell
     */
    this.rightClick = (cell) => {
        if (this._data[cell.row][cell.col].status === 10) {
            this._data[cell.row][cell.col].status = 12;
        } else if (this._data[cell.row][cell.col].status > 10) {
            this._data[cell.row][cell.col].status--;
        }
    };

    /**
     * Перерисовка отдельной ячейки
     * @param row
     * @param col
     * @param ctx
     */
    this.drawCell = (row, col, ctx) => {

        ctx.drawImage(
            this.settings.canvasImage,
            this.settings.sprite[this._data[row][col].status]['sx'],
            this.settings.sprite[this._data[row][col].status]['sy'],
            this.settings.sprite[this._data[row][col].status]['sWidth'],
            this.settings.sprite[this._data[row][col].status]['sHeight'],
            col * this.settings.cw,
            row * this.settings.ch,
            this.settings.cw,
            this.settings.ch
        );
    }
};

/**
 * Объект ячейки
 */
let cellTemplate = function () {
    this.status = 12;
    this.value = 0
};




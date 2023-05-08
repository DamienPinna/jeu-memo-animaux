const content = document.querySelector("#content");
let odlSelection = [];
let nbClick = 0;
let canPlay = true;

const gameBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const randowArrayGenerator = () => {
  let array = [];
  let arrayImages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 5; j++) {
      let randowArrayGenerator = false;
      while (!randowArrayGenerator) {
        let randomImage = Math.floor(Math.random() * 10);
        if (arrayImages[randomImage] < 2) {
          row.push(randomImage + 1);
          arrayImages[randomImage]++;
          randowArrayGenerator = true;
        }
      }
    }
    array.push(row);
  }

  return array;
};

const resultBoard = randowArrayGenerator();

const getImage = (valueCell) => {
  let pathImage = "./images/";
  switch (valueCell) {
    case 1:
      pathImage += "elephant.png";
      break;
    case 2:
      pathImage += "giraffe.png";
      break;
    case 3:
      pathImage += "/hippo.png";
      break;
    case 4:
      pathImage += "monkey.png";
      break;
    case 5:
      pathImage += "panda.png";
      break;
    case 6:
      pathImage += "parrot.png";
      break;
    case 7:
      pathImage += "penguin.png";
      break;
    case 8:
      pathImage += "pig.png";
      break;
    case 9:
      pathImage += "rabbit.png";
      break;
    case 10:
      pathImage += "snake.png";
      break;
    default:
      console.log("cellule non trouvée");
  }
  return pathImage;
};

const displayGameBoard = () => {
  let text = "";

  gameBoard.forEach((row, indexRow) => {
    text += "<div>";
    row.forEach((cell, indexColumn) => {
      if (cell === 0) {
        text += `<button class='btn btn-primary m-2 p_size-card fs-4' onclick='checkCell(\"${indexRow}-${indexColumn}\")'>Dévoiler</button>`;
      } else {
        text += `<img src='${getImage(
          cell
        )}' alt='image' class='p_size-card m-2'/>`;
      }
    });
    text += "</div>";
  });

  content.innerHTML = text;
};

displayGameBoard();

const checkCell = (cell) => {
  if (canPlay) {
    nbClick++;
    const row = cell.substr(0, 1);
    const column = cell.substr(2, 1);
    gameBoard[row][column] = resultBoard[row][column];
    displayGameBoard();

    if (nbClick > 1) {
      canPlay = false;
      setTimeout(() => {
        if (
          gameBoard[row][column] !==
          resultBoard[odlSelection[0]][odlSelection[1]]
        ) {
          gameBoard[row][column] = 0;
          gameBoard[odlSelection[0]][odlSelection[1]] = 0;
        }
        displayGameBoard();
        canPlay = true;
        nbClick = 0;
        odlSelection = [row, column];
      }, 1000);
    } else {
      odlSelection = [row, column];
    }
  }
};

Hooks.on("setup", function() {
    if (game.user.isGM) {
const distributeXPButton = document.createElement('button');
distributeXPButton.innerHTML = 'Distribuir XP';
distributeXPButton.classList.add('myButton');
document.body.appendChild(distributeXPButton);

distributeXPButton.addEventListener('click', async () => {
    const API_KEY = "AIzaSyC_nufcCmf0U5XdHbghgbSp5ezis-ao0Bo"; // Google Sheet API key
const ID = "1wZSd3ilewvUM0Vx1866_j_V65N-B4JYJgxdQDJhhiQ4"; // Spreadsheet ID
const SHEET_NAME = "XP"; // Nome da planilha (página) que você deseja acessar

async function getPlayerData(cellRange) {
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${ID}/values/${cellRange}?key=${API_KEY}`
    );
    const { values } = await response.json();

    if (values && values.length > 0 && values[0].length > 0) {
        const [value] = values[0];
        return value;
    } else {
        return null;
    }
}

// Loop para percorrer as células sequencialmente
(async () => {
    try {
        let CELL_RANGE = "XP!K6"; // A célula específica que você deseja acessar
        let CELL_RANGE2 = "XP!J6"; // A célula ao lado
        let isEmpty = false;

        while (!isEmpty) {
            const PlayerData = await getPlayerData(CELL_RANGE);
            const PlayerData2 = await getPlayerData(CELL_RANGE2);

            if (PlayerData !== null && PlayerData2 !== null) {
                Actor.updateDocuments([{"_id": PlayerData, "system.details.xp.value": PlayerData2}]);
                console.log("Ficha atualizada com XP:", PlayerData2);

                // Avança para a próxima célula
                const cellIndex = parseInt(CELL_RANGE.split("K")[1]) + 1;
                CELL_RANGE = `XP!K${cellIndex}`;
                CELL_RANGE2 = `XP!J${cellIndex}`;
            } else {
                isEmpty = true;
            }
        }

        console.log("Loop concluído. Todas as células foram processadas.");
    } catch (error) {
        console.error("Erro ao obter valores da planilha:", error);
    }
})();
})}});

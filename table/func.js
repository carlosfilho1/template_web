// Adicionar linha na tabela
var rowCount = 1;
function addRowButton(idTabela) {
    var table = document.getElementById(idTabela);
    var newRow = table.rows.length;
    var row = table.insertRow(newRow)
    rowCount++;
    row.innerHTML = "<td contenteditable='false' class='disabled table-light'>" + rowCount + "</td><td class='table-light' contenteditable='true'></td><td class='table-light' contenteditable='true'></td><td class='table-light' contenteditable='true'></td><td class='table-light' contenteditable='true'></td><td class='table-light'><button class='deleteRow' onclick='deleteRow(this)'>Excluir</button></td>";
}


// Remover a linha da tabela
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    table.deleteRow(row.rowIndex - 1);
    rowCount--;
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var numberCell = rows[i].cells[0];
        numberCell.textContent = i + 1;
    }
}

// document.getElementById("saveButton").addEventListener("click", function () {
//     // Lógica para salvar as alterações no banco de dados
//     saveChangesToDatabase();
// });

// function saveChangesToDatabase() {
//     // Implemente a lógica para coletar as alterações e enviá-las para o servidor.
// }

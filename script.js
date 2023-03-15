fetch('https://raw.githubusercontent.com/AriAb247/Ariab247.github.io/main/Allocations_sheet.csv')
  .then(response => response.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;
    const table = document.getElementById('allocation-table');
    data.forEach(row => {
      const tableRow = table.insertRow(-1);
      const programmeTitleCell = tableRow.insertCell(0);
      const locationCell = tableRow.insertCell(1);
      const specialityCell = tableRow.insertCell(2);
      programmeTitleCell.innerText = row.programmeTitle;
      locationCell.innerText = row.location;
      specialityCell.innerText = row.speciality;
    });
  });


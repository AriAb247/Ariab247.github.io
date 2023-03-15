fetch('https://raw.githubusercontent.com/AriAb247/Ariab247.github.io/main/Allocations_sheet.csv')
  .then(response => response.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;
    const groupedData = {};
    
    // Group data by programmeTitle
    data.forEach(row => {
      const programmeTitle = row.programmeTitle;
      if (!groupedData[programmeTitle]) {
        groupedData[programmeTitle] = [];
      }
      groupedData[programmeTitle].push(row);
    });
    
    // Create table rows for each programmeTitle and its allocations
    const table = document.getElementById('allocation-table');
    for (const programmeTitle in groupedData) {
      const group = groupedData[programmeTitle];
      const row = table.insertRow(-1);
      const programmeTitleCell = row.insertCell(0);
      programmeTitleCell.innerText = programmeTitle;
      group.forEach(allocation => {
        const locationCell = row.insertCell(1);
        const specialityCell = row.insertCell(2);
        locationCell.innerText = allocation.location;
        specialityCell.innerText = allocation.speciality;
      });
    }
  });

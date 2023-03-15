fetch('https://raw.githubusercontent.com/ariAb247/ariab247.github.io/main/Allocations_sheet.csv')
  .then(response => response.text())
  .then(csv => {
    const data = d3.csvParse(csv);

    // Sort by Programme Title and Placement Order
    data.sort((a, b) => {
      if (a['Programme Title'] < b['Programme Title']) return -1;
      if (a['Programme Title'] > b['Programme Title']) return 1;
      return a['Placement Order'] - b['Placement Order'];
    });

    // Group data by Programme Title
    const groupedData = d3.group(data, d => d['Programme Title']);

    // Create table rows for each Programme Title and its allocations
    const table = document.getElementById('allocation-table');
    groupedData.forEach((allocations, title) => {
      const titleRow = document.createElement('tr');
      const titleCell = document.createElement('td');
      titleCell.innerText = title;
      titleCell.setAttribute('rowspan', allocations.length);
      titleRow.appendChild(titleCell);
      table.appendChild(titleRow);
      allocations.forEach(allocation => {
        const allocationRow = document.createElement('tr');
        const locationCell = document.createElement('td');
        const specialityCell = document.createElement('td');
        locationCell.innerText = allocation['Location'];
        specialityCell.innerText = allocation['Speciality'];
        allocationRow.appendChild(document.createElement('td'));
        allocationRow.appendChild(document.createElement('td'));
        allocationRow.appendChild(locationCell);
        allocationRow.appendChild(specialityCell);
        table.appendChild(allocationRow);
      });
    });
  });
    }
  });

fetch('https://raw.githubusercontent.com/AriAb247/Ariab247.github.io/main/Allocations_sheet.csv')
   .then(response => response.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;

    // Sort by Programme Title and Placement Order
    data.sort((a, b) => {
      if (a['programmeTitle'] < b['programmeTitle']) return -1;
      if (a['programmeTitle'] > b['programmeTitle']) return 1;
      return a['placementOrder'] - b['placementOrder'];
    });

    // Group data by Programme Title
    const groupedData = {};
    data.forEach(d => {
      const title = d['programmeTitle'];
      if (!groupedData[title]) {
        groupedData[title] = [];
      }
      groupedData[title].push({
        location: d['location'],
        speciality: d['speciality'],
        placementOrder: d['placementOrder']
      });
    });

    // Create table rows for each Programme Title and its allocations
    const table = document.getElementById('allocation-table');
    for (const title in groupedData) {
      const allocations = groupedData[title];
      const titleRow = document.createElement('tr');
      const titleCell = document.createElement('td');
      titleCell.innerText = title;
      titleCell.setAttribute('rowspan', allocations.length);
      titleRow.appendChild(titleCell);
      table.appendChild(titleRow);
      for (let i = 0; i < allocations.length; i++) {
        const allocation = allocations[i];
        const allocationRow = document.createElement('tr');
        const locationCell = document.createElement('td');
        const specialityCell = document.createElement('td');
        locationCell.innerText = allocation.location;
        specialityCell.innerText = allocation.speciality;
        allocationRow.appendChild(locationCell);
        allocationRow.appendChild(specialityCell);
        table.appendChild(allocationRow);
      }
    }
  });

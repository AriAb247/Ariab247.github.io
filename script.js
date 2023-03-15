d3.csv('https://raw.githubusercontent.com/ariAb247/ariab247.github.io/main/Allocations_sheet.csv')
  .then(data => {

    // Sort by Programme Title and Placement Order
    data.sort((a, b) => {
      if (a['programmeTitle'] < b['programmeTitle']) return -1;
      if (a['programmeTitle'] > b['programmeTitle']) return 1;
      return a['placementOrder'] - b['placementOrder'];
    });

    // Group data by Programme Title
    const groupedData = d3.group(data, d => d['programmeTitle']);

    // Create table rows for each Programme Title and its allocations
    const table = document.getElementById('allocation-table');
    for (const [title, allocations] of groupedData) {
      const titleRow = document.createElement('tr');
      const titleCell = document.createElement('td');
      titleCell.innerText = title;
      titleCell.setAttribute('rowspan', allocations.length);
      titleRow.appendChild(titleCell);
      table.appendChild(titleRow);
      for (let i = 0; i < allocations.length; i++) {
        const allocation = allocations[i];
        const allocationRow = document.createElement('tr');
        const placementOrderCell = document.createElement('td');
        const locationCell = document.createElement('td');
        const specialityCell = document.createElement('td');
        placementOrderCell.innerText = allocation.placementOrder;
        locationCell.innerText = allocation.location;
        specialityCell.innerText = allocation.speciality;
        allocationRow.appendChild(placementOrderCell);
        allocationRow.appendChild(locationCell);
        allocationRow.appendChild(specialityCell);
        table.appendChild(allocationRow);
      }
    }
  });

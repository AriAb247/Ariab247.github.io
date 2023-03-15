fetch('https://raw.githubusercontent.com/AriAb247/Ariab247.github.io/main/Allocations_sheet.csv')
  .then(response => response.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;

    // Sort by programmeTitle and placementOrder
   data.sort((a, b) => {
  const aTitle = a['programmeTitle'];
  const bTitle = b['programmeTitle'];

  // Extract the numeric part of the title, if any
  const aNum = parseInt(aTitle.match(/\d+/));
  const bNum = parseInt(bTitle.match(/\d+/));

  // Compare the alphabetic part of the title first
  const alphaComparison = aTitle.replace(/\d+/, '').localeCompare(bTitle.replace(/\d+/, ''));
  if (alphaComparison !== 0) {
    return alphaComparison;
  }

  // If the alphabetic part of the title is the same, compare the numeric part
  if (aNum && bNum) {
    return aNum - bNum;
  } else if (aNum) {
    return -1;
  } else if (bNum) {
    return 1;
  } else {
    return 0;
  }
});

    // Group data by programmeTitle
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

    // Create table rows for each programmeTitle and its allocations
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


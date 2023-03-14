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

    console.log(groupedData);
  });


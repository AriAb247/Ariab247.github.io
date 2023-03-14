fetch('https://raw.githubusercontent.com/AriAb247/Ariab247.github.io/main/Allocations_sheet.csv')
  .then(response => response.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;

    // Sort by Programme Title and Placement Order
    data.sort((a, b) => {
      if (a['Programme Title'] < b['Programme Title']) return -1;
      if (a['Programme Title'] > b['Programme Title']) return 1;
      return a['Placement Order'] - b['Placement Order'];
    });

    // Group data by Programme Title
    const groupedData = {};
    data.forEach(d => {
      const title = d['Programme Title'];
      if (!groupedData[title]) {
        groupedData[title] = [];
      }
      groupedData[title].push({
        location: d['Location'],
        speciality: d['Speciality'],
        placementOrder: d['Placement Order']
      });
    });

    console.log(groupedData);
  });


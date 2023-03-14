fetch('https://raw.githubusercontent.com/AriAb247/Ariab247.github.io/main/Allocations_sheet.csv')
  .then(response => response.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;
    const locations = data.map(d => d.Location);
    const specialities = data.map(d => d.Speciality);
    console.log(locations);
    console.log(specialities);
  });

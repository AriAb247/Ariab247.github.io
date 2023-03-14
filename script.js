fetch('Allocations_sheet.csv')
  .then(response => response.text())
  .then(data => {
    console.log(data); // This will log the CSV data to the console
  });

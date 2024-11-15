import Papa from 'papaparse';

export const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true, // Parse the first row as field names
      skipEmptyLines: true,
      complete: (result) => {
        console.log('Parsed JSON:', result.data); // `result.data` is the JSON representation
        // You can now use the JSON data as needed
        formatDataForDatabase(result.data)
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        // create some error service to parse this
      },
    });
  };

  export function formatDataForDatabase(data) {
    console.log('data!', data)
    // return data.map((item) => ({
    //   // Adjust field names and structure as required by your database schema
    //   name: item.name,
    //   email: item.email,
    //   age: parseInt(item.age, 10), // Example of converting string to integer
    //   createdAt: new Date().toISOString(), // Adding a timestamp, for example
    // }));
  }
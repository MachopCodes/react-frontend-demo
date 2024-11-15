import { useState, useRef } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, useMantineTheme } from '@mantine/core';
import classes from './ButtonProgress.module.css';
import { parseCSV } from '~/utils/parseCSV';
import { formatDataForDatabase } from '~/utils/formatDataForDatabase';


export function UploadButton() {
  const theme = useMantineTheme();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Interval to increment progress
  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 100; // Ensure progress reaches 100 when done
      }),
    20
  );

  // Function to trigger file input
  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Function to handle file selection and start progress
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
    //   console.log("Selected file:", files[0]);
      setLoaded(false);
      setProgress(0);
      interval.start(); // Start the progress interval
      parseCSV(files[0]); // Parse the selected CSV file
    }
  };

   // Function to parse CSV file into JSON


  return (
    <>
      <Button
        fullWidth
        onClick={handleClick}
        color={loaded ? 'dark' : theme.primaryColor}
      >
        <div className={classes.label}>
          {progress > 0 && progress < 100
            ? 'Uploading files'
            : loaded
            ? 'Files uploaded'
            : 'Upload files'}
        </div>
   
      </Button>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".csv" // Restricts input to CSV files
        onChange={handleFileChange}
      />
    </>
  );
}
// Declare global variables
let field2Value = '';
let fontSize = '14px';
let concatenatedData = ''; // New global variable to hold concatenated data

// Function to update the font size of an element
function setFontSize(element, fontSize) {
  if (element) {
    element.style.fontSize = fontSize;
  }
}

// Function to split text into chunks based on a specific token limit and "***" indicator
function chunkText(text, tokenLimit) {
  const segments = text.split('***');
  const chunks = [];

  for (const segment of segments) {
    const tokens = segment.split(/\s+/);
    let currentChunk = '';
    let currentIndicator = 0; // Initialize indicator

    for (const token of tokens) {
      const tokenLength = token.length + 1; // Adding 1 for space after each token

      if (currentChunk.length + tokenLength <= tokenLimit) {
        currentChunk += token + ' ';
      } else {
        chunks.push({ chunk: currentChunk.trim(), indicator: currentIndicator });
        currentChunk = token + ' ';
        currentIndicator = 1; // Mark as split due to token limit
      }
    }

    if (currentChunk.trim()) {
      chunks.push({ chunk: currentChunk.trim(), indicator: currentIndicator });
    } else {
      currentIndicator = 0; // Mark as split by "***"
    }
  }

  return chunks;
}

// Function to fetch a segment using the OpenAI API
async function fetchSegment(segment, indicator) {
  const prompt =
    'Give 25 pairs of non-repetition entities, where each entity contains up to 4 words, represented as "entity1; entity2". ' +
    `Place after each pair "\\n". Text to analyze:\n ${segment}`;

  const requestBody = {
    tempRange: 0.7,
    numResponses: 1,
    prompt: prompt,
    indicator: indicator // Include the indicator value in the requestBody
  };

  try {
    const response = await fetch('http://localhost:3100/?open=example-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });


    const summarized = await response.json();
    const responseChoices = summarized.choices || [];
    const responseRaw = responseChoices[0]?.message?.content || '';
    const responseDelimiter = summarized.newKey || ''; // Get the newKey value from the top-level object
    const responseData = responseRaw.replace(/\b\d+[.)]/g, '');

    if (responseData) {
      const lines = responseData.split('\n');
      const cleanedLines = lines.map((line, index) => `${index + 1}. ${line}`);
      const cleanedCuttedLines = cleanedLines.slice(0, 20)
      const cleanedResponseData = cleanedCuttedLines.join('\n');
      const prependedData = responseDelimiter + '\n\n' + cleanedResponseData; // Prepend new_document value

      return prependedData;
    } else {
      return '';
    }
  } catch (error) {
    throw error;
  }
}



// Function to handle the "GRAPH" tab click
async function handleGraphTabClick() {
  const postData = 'csv=+Copenhagen%3B+shipping+conglomerate%0D%0A%0D%0A+A.P%0D%0A%0D%0A+Danish+flag%3B+ship%27s+mast%0D%0A%0D%0A+water%3B+dock%0D%0A%0D%0A+corporate+gift+shop%3B+Maersk-branded+bags%0D%0A%0D%0A+Lego+model%3B+Triple-E+container+ship%0D%0A%0D%0A+technology+help+center%3B+IT+troubleshooters%0D%0A%0D%0A+Maersk+staffers%3B+laptops%0D%0A%0D%0A+messages%3B+red+and+black+lettering%0D%0A%0D%0A+file+system%3B+C%3A%0D%0A%0D%0A+important+files%3B+encrypted%0D%0A%0D%0A+payment%3B+%24300+worth+of+bitcoin%0D%0A%0D%0A+IT+administrator%3B+Henrik+Jensen%0D%0A%0D%0A+Maersk+compound%3B+royal+archive%0D%0A%0D%0A+IT+department%3B+corporate+empire%0D%0A%0D%0A+computer+screen%3B+turning+black%0D%0A%0D%0A+PCs%3B+irreversibly+locked%0D%0A%0D%0A+Maersk+headquarters%3B+crisis%0D%0A%0D%0A+network+shutdown%3B+IT+staff%0D%0A%0D%0A+Maersk+executive%3B+news%0D%0A%0D%0AIt%3B+was%0D%0A%0D%0Aa%3B+perfect%0D%0A%0D%0Asunny%3B+summer%0D%0A%0D%0Aafternoon%3B+in%0D%0A%0D%0ACopenhagen%3B+when%0D%0A%0D%0Athe%3B+world%E2%80%99s%0D%0A%0D%0Alargest%3B+shipping%0D%0A%0D%0Aconglomerate%3B+began%0D%0A%0D%0Ato%3B+lose%0D%0A%0D%0Aits%3B+mind%0D%0A%0D%0AThe%3B+headquarters%0D%0A%0D%0Aof%3B+A.P.%0D%0A%0D%0AM%C3%B8ller-Maersk%3B+sits%0D%0A%0D%0Abeside%3B+the%0D%0A%0D%0Abreezy%3B+cobblestoned%0D%0A%0D%0Aesplanade%3B+of%0D%0A%0D%0ACopenhagen%E2%80%99s%3B+harbor%0D%0A%0D%0AA%3B+ship%E2%80%99s%0D%0A%0D%0Amast%3B+carrying%0D%0A%0D%0Athe%3B+Danish&links=G&direct=on&act=Draw'; // Replace with your actual CSV data
  const url = 'http://localhost:8080/cgi-bin/vizg.pl';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Handle the response as needed (e.g., displaying the graph)
    const responseBody = await response.text();
    // Add code here to display the graph or handle the response data
    console.log(responseBody);
  } catch (error) {
    console.error('Error:', error);
    // Handle errors gracefully
  }
}








function search() {
  // Get the search query from the input field
  const searchQuery = document.getElementById('searchInput').value;

  // Check if field2Value is already filled
  if (field2Value) {
    // Update the content of Tab 1 with the fetched data (if available)
    const selectedContent = document.querySelector('#content-1');
    const formattedOutputContainer = selectedContent.querySelector('.formatted-output');
    const unformattedOutputContainer = selectedContent.querySelector('.unformatted-output');

    // Hide the unformatted output and display the formatted output
    unformattedOutputContainer.style.display = 'none';
    formattedOutputContainer.textContent = field2Value;

    // Set the desired font size for the output text in Tab 1
    setFontSize(formattedOutputContainer, fontSize);
  } else {
    // Perform the fetch request to the server
    fetch(`http://localhost:3100/?url=${encodeURIComponent(searchQuery)}`)
      .then(response => response.json())
      .then(data => {
        // Get the content of Tab 1 and the formatted output container
        const selectedContent = document.querySelector('#content-1');
        const formattedOutputContainer = selectedContent.querySelector('.formatted-output');
        const unformattedOutputContainer = selectedContent.querySelector('.unformatted-output');

        // Access the desired JSON field and assign it to field2Value
        field2Value = data.parsed;

        // Update the content of Tab 1 with the fetched data (if available)
        if (field2Value) {
          // Hide the unformatted output and display the formatted output
          unformattedOutputContainer.style.display = 'none';
          formattedOutputContainer.textContent = field2Value;

          // Set the desired font size for the output text in Tab 1
          setFontSize(formattedOutputContainer, fontSize);
        } else {
          // If no data is fetched, reset the unformatted output and hide the formatted output
          unformattedOutputContainer.style.display = 'block';
          formattedOutputContainer.textContent = '';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function uploadTextFile() {
  const uploadFileInput = document.getElementById('uploadFileInput');

  if (uploadFileInput.files.length > 0) {
    const uploadedFile = uploadFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      // Set the content of the uploaded file to field2Value
      field2Value = event.target.result;

      // Optionally, trigger the search function or update the UI as needed
      search(); // You can call the search function here to update the UI with the uploaded content
    };

    reader.readAsText(uploadedFile);
  }
}

// JavaScript function to switch between tabs
async function changeTab(tabNumber) {
  // Get all tab elements and content elements
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.content');

  // Remove the 'active' class from all tabs and contents
  tabs.forEach(tab => tab.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));

  // Add the 'active' class to the clicked tab and corresponding content
  const selectedTab = document.querySelector(`.tab:nth-child(${tabNumber})`);
  const selectedContent = document.querySelector(`#content-${tabNumber}`);
  selectedTab.classList.add('active');
  selectedContent.classList.add('active');

  // Perform a POST request if Tab 2 is clicked
  if (tabNumber === 2) {
    // Get the transformed output container
    const transformedOutputContainer = selectedContent.querySelector('.transformed-output');


    if (field2Value) {
      concatenatedData = ''; // Clear concatenated data before processing new chunks
      const maxSegmentLength = 72500; // Maximum segment token limit
      const chunks = chunkText(field2Value, maxSegmentLength);

      // Clear previous content and show initial message
      transformedOutputContainer.innerHTML = '';
      const waitingMessage = document.createElement('div');
      waitingMessage.textContent = 'Waiting output from OpenAI.';
      transformedOutputContainer.appendChild(waitingMessage);

      // Flag to track if all chunks have been fetched
      let allChunksFetched = false;

      for (const chunkObj of chunks) {
        const chunk = chunkObj.chunk;
        const indicator = chunkObj.indicator;

        try {
          const responseData = await fetchSegment(chunk.trim(), indicator); // Pass indicator value
          if (responseData) {
            const lines = responseData.split('\n');

            // Process and create separate containers for each text entry
            for (const line of lines) {
              if (line) { // Skip empty lines
                const entryContainer = document.createElement('div');
                entryContainer.className = 'entry';

                let numerationItemText = line.split('. ')[0]; // Extract the numeration
                if (!line.startsWith('***')) { // Add a period and spacing to numeration except for "***" lines
                  numerationItemText += '. ';
                }

                // Add a newline before lines that start with "***"
                if (line.startsWith('***')) {
                  const newline = document.createElement('br');
                  transformedOutputContainer.appendChild(newline);
                }

                const numerationItem = document.createElement('span');
                numerationItem.className = 'numeration';
                numerationItem.textContent = numerationItemText;

                const textItem = document.createElement('span');
                textItem.className = 'text';
                textItem.textContent = line.split('. ')[1]; // Extract the actual text

                entryContainer.appendChild(numerationItem);
                entryContainer.appendChild(textItem);

                transformedOutputContainer.appendChild(entryContainer);

              }
            }

            // Check if all chunks have been fetched and set the flag accordingly
            allChunksFetched = chunks.indexOf(chunkObj) === chunks.length - 1;

            // If all chunks have been fetched, remove the waiting message
            if (allChunksFetched) {
              transformedOutputContainer.removeChild(waitingMessage);
            }

          } else {
            concatenatedData += 'Error: No response data from OpenAI. \n';
          }
        } catch (error) {
          concatenatedData += 'Error: Unable to fetch data from OpenAI. \n';
          console.error('Error:', error);
        }
      }

      // Set the desired font size for the output text in Tab 2
      setFontSize(transformedOutputContainer, fontSize);
      transformedOutputContainer.style.textAlign = 'left';
      transformedOutputContainer.style.marginLeft = '250px'; // Adjust the margin as needed
    } else {
      transformedOutputContainer.textContent = 'Error: field2Value is not available. Perform a search first.';
    }

    // Apply CSS to make numeration unselectable and shadowed
    const numerationItems = transformedOutputContainer.querySelectorAll('.numeration');
    numerationItems.forEach(numerationItem => {
      numerationItem.style.userSelect = 'none';
      numerationItem.style.opacity = '0.5';
    });
  }







  // Check if the "GRAPH" tab is clicked (tabNumber 3)
  if (tabNumber === 3) {
    // Handle the "GRAPH" tab click
    handleGraphTabClick();
  }








  // Prevent form submission when clicking the "RAW ARTICLE" tab
  return false;
}

// Get the search input element
const searchInput = document.getElementById('searchInput');

// Add an event listener to the search input field for the 'input' event
searchInput.addEventListener('input', search);

// Add an event listener to the content editable element in Tab 1
const textEditor = document.querySelector('.text-editor');
textEditor.addEventListener('input', function () {
  field2Value = textEditor.textContent; // Update field2Value with the modified text
});

// Call the search function initially to show initial content in Tab 1
search();

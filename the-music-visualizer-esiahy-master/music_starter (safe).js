let firstRun = true
let PianoImg; 
let stopTime = 90000;





function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20)
  textFont('Calibri light'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);

  if (songIsPlaying) {
    let curMillis = millis();
    let timeOffset = curMillis - songEpoch;

    // Check if the current time has exceeded 90 seconds (audioStopTime)
    if (timeOffset > audioStopTime) {
      song.stop(); // Stop the audio playback
      songIsPlaying = false;
    }

    let curSlice = int(60 * timeOffset / 1000.0);
    if (curSlice < volume_table_length) {
      // ... your existing code for processing audio slices
    }
  }


   let drumOffset = map(drum, 0, 100, 0, 70); // Map drum intensity to vertical offset

   let bassEllipseSize = map(bass, 0, 300, 5, 50);

   let vocalEllipseSize = map(vocal, 0, 250, 5, 50);

   var ballSize = map(bass, 0,100, 40,150);

   var drumHight = map(drum, 0,100, 0+bass/2, height);
   
   var numLayers = 5; 

   var numEllipses = 35;

   var ellipseSpacing = 40;


   for (let layer = 0; layer < numLayers; layer++) {
    for (let i = 1; i <= numEllipses; i++) {
      let xPos = i * ellipseSpacing;
      let yPos = map(i, 1, numEllipses, height, 0) - layer * 70 - drumOffset; // Apply drum offset

      fill(120, 120, 120);
      ellipse(xPos, yPos, bassEllipseSize); // Use bassEllipseSize for the first line
    }
  }

  // Second line of ellipses (synced to vocal input)
  for (let layer = 0; layer < numLayers; layer++) {
    for (let i = 1; i <= numEllipses; i++) {
      let xPos = i * ellipseSpacing;
      let yPos = map(i, 1, numEllipses, height, 0) - layer * 70 - drumOffset + 100; // Offset the second line vertically

      fill(255, 255, 255);
      ellipse(xPos, yPos, vocalEllipseSize); // Use vocalEllipseSize for the second line
    }
  }

  // third line of ellipses synced to other input
  for (let layer = 0; layer < numLayers; layer++) {
    for (let i = 1; i <= numEllipses; i++) {
      let xPos = i * ellipseSpacing;
      let yPos = map(i, 1, numEllipses, height, 0) - layer * 70 - drumOffset + 200; // Offset the third line vertically
      fill(157, 193, 131); // Choose a different color for the third line
      let ellipseSize = map(other, 0, 150, 5, 50); // Customize size based on 'other'
      ellipse(xPos, yPos, ellipseSize); // Use the custom size for the third line
    }
  }

  // Fourth line of ellipses (synced to 'drum' input)
  for (let layer = 0; layer < numLayers; layer++) {
    for (let i = 1; i <= numEllipses; i++) {
      let xPos = i * ellipseSpacing;
      let yPos = map(i, 1, numEllipses, height, 0) - layer * 70 - drumOffset + 300; // Offset the fourth line vertically
      fill(8, 48, 80); // Choose a different color for the fourth line
      let ellipseSize = map(drum, 0, 100, 5, 50); // Sync to 'drum' input
      ellipse(xPos, yPos, ellipseSize); // Use the 'drum' input for the fourth line
    }
  }

  let seconds = counter/60
if(seconds > 0) {
  textSize(60);
  text(nf(seconds, 3, 2), 1625, 150); }


  if (firstRun) {
    rectMode(CENTER);
    pianoImg = loadImage('arima.png'); // Correct variable name and loadImage function

    firstRun = false;
  }

  image(pianoImg, 1125, 80);

   



//display "words"
 textAlign(CENTER);
 textSize(bass);
 fill(120, 120, 120);
 text(words, 200, 200);

}

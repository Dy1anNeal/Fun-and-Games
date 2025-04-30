//potential changes
// -- Change structure of grid to a matrix to allow different generation structure
// -- 




const heightIn = document.getElementById("heightInput");
const widthIn = document.getElementById("widthInput");
const dimensionButton = document.getElementById("dimensionsButton");
const imageContainer = document.getElementById("container");
const debuger = document.getElementById("debugger");

let count = 0;
let count2 = 0;

let segments = [];
let textBoxes = [];
let images = [
    "Images/Cross.png",           // 0
    "Images/Empty.png",           // 1 
    "Images/T_up.png",            // 2
    "Images/T_down.png",          // 3
    "Images/T_left.png",          // 4
    "Images/T_right.png",         // 5
    "Images/Horizontal_line.png", // 6
    "Images/Vertical_line.png",   // 7
    "Images/BL_corner.png",       // 8
    "Images/BR_corner.png",       // 9
    "Images/TR_corner.png",       // 10
    "Images/TL_corner.png",       // 11
    "Images/end_Up.png",          // 12
    "Images/end_Down.png",        // 13
    "Images/end_Left.png",        // 14
    "Images/end_Right.png"];

dimensionButton.addEventListener("click", createGrid);


//when creating the grid segments maybe have each bit be an object 
function createGrid(){
    let y = heightIn.value;
    let x = widthIn.value;
    let grid = x*y;

    for (let i = 0; i < segments.length; i++){
        imageContainer.removeChild(segments[i]);
    }

    for (let j = 0; j<textBoxes.length; j++){ 
        debuger.removeChild(textBoxes[j]);
    } 
    textBoxes = [];

    segments = [];

    let segmentObjects = [];

    for (let i = 0; i < grid; i++){
        const gridSegment = document.createElement("div");
        gridSegment.classList.add("segment")

        imageContainer.appendChild(gridSegment);
        segments.push(gridSegment);
        segmentObjects.push({tile: null, possibleTiles: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]});
    }
    
    imageContainer.style.width = "" + (100*x) + "px";
    imageContainer.style.height = "" + (100*y) + "px";

    fillSegments(segmentObjects);
}

//---------------------------------------------------------------------------------------------------------

function fillSegments(segmentObjects){
    for (let i = 0; i < segments.length; i++){
        scan(i,segmentObjects);
        let picker = Math.floor(Math.random()*segmentObjects[i].possibleTiles.length);

        if (segmentObjects[i].possibleTiles.length == 0){
            dimensionButton.innerText = i + " broken";
            break
        }
        newText("Possible tiles", segmentObjects[i].possibleTiles);
        segmentObjects[i].tile = segmentObjects[i].possibleTiles[picker];
        segments[i].style.background = "URL("+images[segmentObjects[i].tile]+")";
    }
}

//---------------------------------------------------------------------------------------------------------

//potentially get rid of options removed as a variable

function scan(currentTile,segmentObjects){
    //if statements required for edges
    let optionsRemoved = [];
    //checks right side
    newText("","");
    newText(currentTile, segmentObjects[currentTile].possibleTiles);
    //checks tile to left
    if ((currentTile) != 0){
        if ([0,2,3,5,6,9,10,15].includes(segmentObjects[currentTile-1].tile)){
            //if tile to left leads into current tile
            optionsRemoved = [1,5,7,9,10,12,13,15];
            removeLoop(optionsRemoved,segmentObjects[currentTile].possibleTiles);
            count++;
        } else{
            optionsRemoved = [0,2,3,4,6,8,11,14];
            removeLoop(optionsRemoved,segmentObjects[currentTile].possibleTiles);
        }
        newText(currentTile, segmentObjects[currentTile].possibleTiles);
    }
    
    // checks tile above
    if ((currentTile) > (widthIn.value - 1)){
        if ([0,3,4,5,7,8,9,13].includes(segmentObjects[currentTile-(widthIn.value)].tile)){
            //if tile from above leads into current tile
            optionsRemoved = [1,3,6,8,9,13,14,15];
            removeLoop(optionsRemoved,segmentObjects[currentTile].possibleTiles);

            count2++;
        } else{
            optionsRemoved = [0,2,4,5,7,10,11,12];
            removeLoop(optionsRemoved,segmentObjects[currentTile].possibleTiles);
            
        }
        newText(currentTile, segmentObjects[currentTile].possibleTiles);
    }
    
}

//---------------------------------------------------------------------------------------------------------

function removeLoop(removals,possibilities){
    //check if the value to be removed is in the list
    //loop through list of values to be removed
    for (let i = 0;i < removals.length;i++){
        let same = false;
        //loop through list of current possible tiles
        if (possibilities.includes(removals[i])){same = true;}
        newText("Possible tiles contains " + removals[i],possibilities.includes(removals[i]));
    
        if (same == true){removeOption(removals[i],possibilities);}    
        else{newText("","NO REMOVAL");}
    }
}
//Removes a given value from a list
function removeOption(option, optionsAvailable){
    //newText("A",optionsAvailable);
    const index = optionsAvailable.indexOf(option);
    optionsAvailable.splice(index, 1);
    newText("REMOVED",option);
}

//---------------------------------------------------------------------------------------------------------
//function to write some text within the debugging info box
function newText(no, possibleTiles){
    // const textbox = document.createElement("div");
    // debuger.appendChild(textbox);
    // textbox.innerText = no + ": " + possibleTiles;
    // textBoxes.push(textbox);
}
let fs = require("fs") ;

let extensionMapping = require("./util.js")

// console.log(extensionMapping) ; 

let testFolderPath = "./Download" ;

let allFiles = fs.readdirSync(testFolderPath) ;
// console.log(allFiles) ;

for(let i = 0 ; i < allFiles.length ; i++)
{
    // console.log(allFiles[i]) ;
    sortFile(allFiles[i]) ;
}

function getExtension(file)
{
    file = file.split(".") ;
    return file[1] ;
}

function checkExtensionFolder(extension)
{
    let extensionFolderName = testFolderPath ;
    for(let key in extensionMapping)
    {
        // console.log(key) ;
        let extensions = extensionMapping[key] ;
        // console.log(extensions) ;
        if(extensions.includes(extension))
        {
            // console.log(extensions) ;
            extensionFolderName += "/" + key ; 
            // console.log(extensionFolderName) ;
            break ;
        }
    }

    let isFolderExist = fs.existsSync(extensionFolderName) ;
    if(!isFolderExist)
    {
        fs.mkdirSync(extensionFolderName) ;
    }
    return extensionFolderName ;
}

function moveFile(file , extenionFolderName)
{
    let sourceFile = testFolderPath + "/" + file ;
    let destinationFile = extenionFolderName + "/" + file ;
    fs.copyFileSync(sourceFile , destinationFile) ;

    fs.unlinkSync(sourceFile) ;
}

function sortFile(file)
{
    let extension = getExtension(file) ;
    // console.log(extension) ;

    // let extensionFolderName = checkExtensionFolder(extension) ;
    // moveFile(file , extensionFolderName) ;
}


// ======================= Folder Sorting =========================


// // console.log(testFolderPath) ;

// let otherFolder = fs.readdirSync(testFolderPath) ;

// // console.log(otherFolder) ; // gives all files/folder of the current directory
// for(let i = 0 ; i < otherFolder.length ; i++)
// {
//     // console.log(otherFolder[i]) ;
//     sortFolder(otherFolder[i]) ; // Gives all files\folder one by one
// }

// function checkOddFolderPath(folder)
// {
//     let folderNamePath = testFolderPath ;
//     let folderName = folder ;

//     let allKeys = Object.keys(extensionMapping) ;
//     // console.log(allKeys) ;

//     if(!allKeys.includes(folderName))
//     {
//         // console.log(folderName) ;
//         folderNamePath = testFolderPath + "/" + folderName ;
//         console.log(folderNamePath) ;   
//     }
//     return folderNamePath ;
// }

// function sortFolder(folder)
// {
//     let folderToBeSortedPath = checkOddFolderPath(folder) ;
//     testFolderPath = folderToBeSortedPath ;
//     let filesOfFolder = fs.readdirSync(testFolderPath) ;
//     for(let i = 0 ; i < filesOfFolder.length ; i++)
//     {
//         console.log(filesOfFolder[i]) ;
//         sortFile(filesOfFolder[i])
//     }
// }


let otherFolderPath = fs.readdirSync(testFolderPath) ;
// console.log(otherFolderPath) ;

for(let i = 0  ; i < otherFolderPath.length ; i++)
{
    // console.log(otherFolderPath[i]) ;
    sortFolder(otherFolderPath[i]) ;
}


function sortFolder(folder)
{
    let folderToBeSortedName = checkOddFolderName(folder) ;
    // console.log(folderToBeSortedName) ;
}


function checkOddFolderName(folder)
{
    let folderName = folder ;
    let allKeys = Object.keys(extensionMapping) ;
    // console.log(allKeys) ;
    if(allKeys.includes(folderName) == false)
    {
        console.log(folderName) ;
    }
}
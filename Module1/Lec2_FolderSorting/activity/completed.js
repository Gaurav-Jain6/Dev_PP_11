let fs = require("fs") ;

let extensionMapping = require("./util.js")

let testFolderPath = "./Download" ; 

let allFiles = fs.readdirSync(testFolderPath) ;

for(let i = 0 ; i < allFiles.length ; i++)
{
    sortFile(allFiles[i] , testFolderPath) ;
    sortFolder(allFiles[i] , testFolderPath) ;
}

function getExtension(file)
{
    file = file.split(".") ;
    return file[1] ;
}

function checkExtensionFolder(extension , filePath1)
{
    let extensionFolderName = filePath1 ;
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
    // console.log(extensionFolderName);
    if(!isFolderExist)
    {
        fs.mkdirSync(extensionFolderName) ;
        console.log(extensionFolderName);
    }
    return extensionFolderName ;
}

function moveFile(file , extenionFolderName , filePath1)
{
    let sourceFile = filePath1 + "/" + file ;
    let destinationFile = extenionFolderName + "/" + file ;
    // console.log(sourceFile + "==============" + destinationFile) ;
    
    if(sourceFile != destinationFile)
    {
        
        fs.copyFileSync(sourceFile , destinationFile) ;
        fs.unlinkSync(sourceFile) ;
    }
}

function sortFile(file , filePath)
{
    let filePath1 = filePath ;
    // console.log(filePath1) ;
    let extension = getExtension(file) ;
    // console.log(extension) ;

    let extensionFolderName = checkExtensionFolder(extension , filePath1) ;
    moveFile(file , extensionFolderName , filePath1) ;
}

function sortFolder(folder , testFolderPath)
{
    let tothertestFolderPath = testFolderPath ;
    // console.log(tothertestFolderPath) ;
    let allKeys = Object.keys(extensionMapping) ;
    if(!folder.includes(".") && !allKeys.includes(folder))
    {
        // console.log(folder) ;
        tothertestFolderPath = tothertestFolderPath + "/" + folder ;
        // console.log(tothertestFolderPath);
        let allFilesinFolder = fs.readdirSync(tothertestFolderPath) ;
        // console.log(allFilesinFolder) ;

        for(let i = 0 ; i < allFilesinFolder.length ; i++)
        {
            // console.log(allFilesinFolder[i]) ;
            
            if(!folder.includes(".") && !allKeys.includes(folder))
            {
                sortFolder(allFilesinFolder[i] , tothertestFolderPath) ;
            }
            sortFile(allFilesinFolder[i] , tothertestFolderPath) ;   
        }
    }
}
var Constants = {
	TemplateContainerId: "templateContainer",
	FileListId: "fileList",
	ProgressBarContainerId: "progressBarContainer",
	FileItemClass: "fileItem",
	FileNameClass: "itemName",
	FileThumbnailClass: "itemThumbnail",
	FileSizeClass: "itemSize",
	RemoveButtonClass: "removeButton",
	FileFooterClass: "itemFooter"
};
var selectedFiles = [];
var currentFileIndex = -1;
        
function onUploadControlTextChanged(s, e) {
    var files = UploadControl.GetSelectedFiles();
    if(files.length == 0) {
        if(currentFileIndex != -1)
            resetProgressBar();
        clearFileList();
    }
    else {
        var newFiles = [];
        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            if(ASPxClientUtils.ArrayIndexOf(selectedFiles, file) == -1)
                newFiles.push(file);
        }
        addNewFiles(newFiles);
    }
}
function onUploadControlFilesUploadStart(s, e) {
    currentFileIndex = 0;
    setRemoveFileElementsVisible(false);
    moveProgressBarToFileElement(0);
    FileProgressBar.SetVisible(true);
    FileProgressBar.SetPosition(0);
}
function onUploadControlProgressChanged(s, e) {
    if(currentFileIndex == -1)
        return;
    updateProgressBar(currentFileIndex, e);
    if(e.currentFileProgress == 100)
        currentFileIndex++;
}
function onUploadControlFilesUploadComplete(s, e) {
    resetProgressBar();
    setRemoveFileElementsVisible(true);
    currentFileIndex = -1;
}
function clearFileList() {
    getFileListElement().innerHTML = "";
    selectedFiles = [];
}
function addNewFiles(files) {
    var fileListElement = getFileListElement();
    for(var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileElement = createFileElement(file);
        fileListElement.appendChild(fileElement);
        selectedFiles.push(file);
    }
}
function createFileElement(file) {
    var fileTemplateElement = document.getElementsByClassName(Constants.FileItemClass)[0]; // TODO use container
    var fileElement = fileTemplateElement.cloneNode(true);
    var nameElement = fileElement.getElementsByClassName(Constants.FileNameClass)[0],
        thumbnailElement = fileElement.getElementsByClassName(Constants.FileThumbnailClass)[0],
        sizeElement = fileElement.getElementsByClassName(Constants.FileSizeClass)[0],
        removeElement = fileElement.getElementsByClassName(Constants.RemoveButtonClass)[0];

    nameElement.innerHTML = file.name;
    sizeElement.innerHTML = getContentLengthString(file.size);
    if(file.sourceFileObject) {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            thumbnailElement.src = fileReader.result;
        }
        fileReader.readAsDataURL(file.sourceFileObject);
    }
    removeElement.onclick = function() {
        removeFile(file, fileElement);
    }

    return fileElement;
}
function removeFile(file, fileElement) {
    UploadControl.RemoveFileFromSelection(file);
    ASPxClientUtils.ArrayRemove(selectedFiles, file);
    fileElement.parentNode.removeChild(fileElement);
}
function setRemoveFileElementsVisible(visible) {
    var value = visible ? "" : "hidden";
    var removeFileElements = getFileListElement().getElementsByClassName(Constants.RemoveButtonClass);
    for(var i = 0; i < removeFileElements.length; i++)
        removeFileElements[i].style.visibility = value;
}
function moveProgressBarToFileElement(fileIndex) {
    var progressContainer = document.getElementById(Constants.ProgressBarContainerId);
    var fileElements = getFileListElement().getElementsByClassName(Constants.FileItemClass);
    var currentFileElement = fileElements[fileIndex];
    currentFileElement.appendChild(progressContainer);
}
function updateProgressBar(fileIndex, progressArgs) {
    moveProgressBarToFileElement(fileIndex);
    FileProgressBar.SetPosition(progressArgs.currentFileProgress);
}
function resetProgressBar() {
    FileProgressBar.SetVisible(false);
    var progressContainer = document.getElementById(Constants.ProgressBarContainerId),
        templateContainer = document.getElementById(Constants.TemplateContainerId);
    templateContainer.appendChild(progressContainer);
}
function getFileListElement() {
    return document.getElementById(Constants.FileListId);
}
function getContentLengthString(contentLength) {
    var sizeDimensions = ['bytes', 'KB', 'MB', 'GB', 'TB'],
        index = 0,
        length = contentLength,
        postfix = sizeDimensions[index];
    while(length > 1024) {
        length = length / 1024;
        postfix = sizeDimensions[++index];
    }
    var numberRegExpPattern = /[-+]?[0-9]*(?:\.|\,)[0-9]{0,2}|[0-9]{0,2}/,
        results = numberRegExpPattern.exec(length);
    length = results ? results[0] : Math.floor(length);
    return length.toString() + ' ' + postfix;
}
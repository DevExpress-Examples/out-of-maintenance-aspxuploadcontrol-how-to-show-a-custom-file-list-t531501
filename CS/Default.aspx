<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<%@ Register assembly="DevExpress.Web.v17.1, Version=17.1.17.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>T531501</title>
    <link rel="stylesheet" type="text/css" href="Styles.css" />
    <script src="Scripts.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="uploadContainer">
            <dx:ASPxUploadControl runat="server" ID="UploadControl" ClientInstanceName="UploadControl" Width="320"
                NullText="Select multiple files..." UploadMode="Advanced" 
                ShowClearFileSelectionButton="false" ShowUploadButton="True" ShowProgressPanel="True"
                OnFileUploadComplete="UploadControl_FileUploadComplete">
                <AdvancedModeSettings EnableMultiSelect="True" EnableFileList="false" EnableDragAndDrop="True" />
                <ValidationSettings MaxFileSize="4194304" AllowedFileExtensions=".jpg,.jpeg,.gif,.png" />
                <ClientSideEvents TextChanged="onUploadControlTextChanged" 
                    FilesUploadStart="onUploadControlFilesUploadStart"
                    UploadingProgressChanged="onUploadControlProgressChanged"
                    FilesUploadComplete="onUploadControlFilesUploadComplete" />
            </dx:ASPxUploadControl>
            <div id="fileList" class="fileList"></div>
            <br />
            <p class="note">
                <dx:ASPxLabel ID="AllowedFileExtensionsLabel" runat="server" Text="Allowed file extensions: .jpg, .jpeg, .gif, .png." Font-Size="8pt">
                </dx:ASPxLabel>
                <br />
                <dx:ASPxLabel ID="MaxFileSizeLabel" runat="server" Text="Maximum file size: 4 MB." Font-Size="8pt">
                </dx:ASPxLabel>
            </p>
        </div>
        <div id="templateContainer" class="templateContainer" style="display: none;">
            <div class="fileItem">
                <a href="javascript:void(0);" class="removeButton">Remove</a>
                <img class="itemThumbnail" src="javascript:;" />
                <div class="itemFooter">
                    <div class="itemName"></div>
                    <div class="itemSize"></div>
                </div>
            </div>
            <div id="progressBarContainer" class="fileProgress">
                <dx:ASPxProgressBar runat="server" ID="FileProgressBar" ClientInstanceName="FileProgressBar" 
                    Width="175px" Height="20px" ClientVisible="false" />
            </div>
        </div>
    </form>
</body>
</html>

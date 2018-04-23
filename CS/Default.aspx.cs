using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DevExpress.Web;

public partial class _Default : System.Web.UI.Page {
    const string UploadDirectory = "~/UploadedFiles/";

    protected void Page_Load(object sender, EventArgs e) {

    }
    protected void UploadControl_FileUploadComplete(object sender, FileUploadCompleteEventArgs e) {
        string resultExtension = Path.GetExtension(e.UploadedFile.FileName);
        string resultFileName = Path.ChangeExtension(Path.GetRandomFileName(), resultExtension);
        string resultFileUrl = Path.Combine(UploadDirectory, resultFileName);
        string resultFilePath = MapPath(resultFileUrl);
        e.UploadedFile.SaveAs(resultFilePath);
    }
}
using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Umbraco.Core.Models;
using System.Data.SqlClient;
namespace queengallery.Models
{
    public class ExhibitionsLoaderController : Umbraco.Web.Mvc.SurfaceController
    {
        public ActionResult Upload(FormCollection formCollection)
        {
            if (Request != null)
            {
                HttpPostedFileBase file = Request.Files["UploadedFile"];
                int MediaId = Convert.ToInt32(Request.Params["MediaId"]);


                string      connecStionstring = "Data Source=NODE-PC;Initial Catalog=QEEN;User ID=sa;Password=P@ssw0rd";
                SqlConnection conn = new SqlConnection(connecStionstring);
                conn.Open();
                SqlCommand cmd = new SqlCommand(
                 "SELECT [ID],[NameTh],[NameEn],[DateOfBirth],[DescriptionTh],[DescriptionEn] FROM  [Artists]", conn);


                SqlDataReader rdr = null;
                rdr = cmd.ExecuteReader();


                while (rdr.Read())
                {
                    // get the results of each column
                    //string contact = (string)rdr["ContactName"];
                    //string company = (string)rdr["CompanyName"];
                    //string city = (string)rdr["City"];

                    //// print out the results
                    //Console.Write("{0,-25}", contact);
                    //Console.Write("{0,-20}", city);
                    //Console.Write("{0,-25}", company);
                    //Console.WriteLine();

                    var mediaService = Services.MediaService;

                    var mediaImage = mediaService.CreateMedia(rdr["ID"].ToString(), MediaId, "ArtistsMedia");
                    mediaImage.SetValue("artistsID", rdr["ID"]);
                    mediaImage.SetValue("nameTh", rdr["nameTh"]);
                    mediaImage.SetValue("nameEn", rdr["nameEn"]);


                    if (!rdr.IsDBNull(3))
                    {
                        DateTime dt = Convert.ToDateTime(rdr["dateOfBirth"]);
                        mediaImage.SetValue("dateOfBirth", dt);
                    }
                

                    
                    mediaImage.SetValue("descriptionTh", rdr["descriptionTh"]);
                    mediaImage.SetValue("descriptionEn", rdr["descriptionEn"]);



                    try
                    {

                      
                        ImportsArtisPicture(ref mediaImage, rdr["ID"].ToString());
                    }
                    catch (Exception ex)
                    {
                    }



                    mediaService.Save(mediaImage);
                }

                rdr = null;
                conn.Close();
                //if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                //{


                //    var reader = new StreamReader(file.InputStream, System.Text.Encoding.GetEncoding(874));

                //    while (!reader.EndOfStream)
                //    {
                //        var line = reader.ReadLine();
                //        var values = line.Split(',');

                //        var mediaService = Services.MediaService;

                //        var mediaImage = mediaService.CreateMedia(values[0], MediaId, "ArtistsMedia");

                //        //var folder = uQuery.GetMediaByName(values[0]).FirstOrDefault();

                //        //mediaService.Delete(mediaImage);
                //        //string _fullFilePath = Server.MapPath($@"\App_Data\TEMP\FileUploads\artist\{values[14]}");

                //        //FileStream fs = new FileStream(_fullFilePath,
                //        //    FileMode.Open, FileAccess.Read, FileShare.Read);
                //        //mediaImage.SetValue("umbracoFile", values[14], fs);
                //        //mediaImage.SetValue("arts", values[14], fs);

                //        //fs.Close();

                //    //artistsID
                //    //nameTh
                //    //nameEn
                //    //dateOfBirth
                //    //descriptionTh
                //    //descriptionEn
                //    //image


                //        mediaImage.SetValue("artistsID", values[0]);
                //        mediaImage.SetValue("nameTh", values[1]);
                //        mediaImage.SetValue("nameEn", values[2]);
                //        mediaImage.SetValue("dateOfBirth", values[3]);
                //        mediaImage.SetValue("descriptionTh", values[4]);
                //        mediaImage.SetValue("descriptionEn", values[5]);

                //        //try
                //        //{
                //        //    ImportsGalerryPicture(ref mediaImage, string.Format("{0}.jpg", values[0]));
                //        //}
                //        //catch (Exception ex)
                //        //{
                //        //}
                //        //try
                //        //{
                //        //    ImportsArtisPicture(ref mediaImage, values[14]);
                //        //}
                //        //catch (Exception ex)
                //        //{
                //        //}

                //        mediaService.Save(mediaImage);
                //    }
                //}
            }

            return RedirectToCurrentUmbracoPage();
            //return View("Index");
        }

        public void ImportsArtisPicture(ref IMedia Media, string id)
        {                                                    
            string imageFilePath = Server.MapPath(string.Format(@"~\App_Data\TEMP\FileUploads\Artist\{0}\Avatar.jpg", id));
            string noImageFilePath = Server.MapPath(@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            //string imageFilePath = Server.MapPath($@"~\App_Data\TEMP\FileUploads\Gallery\{filename}");
            //string noImageFilePath = Server.MapPath($@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            string DataTypeName = "image";
            LoadImageStream(ref Media, "Avatar.jpg", DataTypeName, imageFilePath, noImageFilePath, "no-user-image.jpg");
        }

        public void ImportsGalerryPicture(ref IMedia Media, string filename)
        {
            //string imageFilePath = Server.MapPath($@"\App_Data\TEMP\FileUploads\Gallery\{filename}");
            //string noImageFilePath = Server.MapPath($@"\App_Data\TEMP\FileUploads\noimage.jpg");

            //string imageFilePath = Server.MapPath(string.Format(@"~\App_Data\TEMP\FileUploads\Gallery\{0}", filename));
            //string noImageFilePath = Server.MapPath(@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            string imageFilePath = Server.MapPath(string.Format(@"~\App_Data\TEMP\FileUploads\Gallery\{0}", filename));

            string noImageFilePath = Server.MapPath(@"~\App_Data\TEMP\FileUploads\noimage.jpg");

            string DataTypeName = "umbracoFile";

            LoadImageStream(ref Media, filename, DataTypeName, imageFilePath, noImageFilePath, "noimage.jpg");
        }

        public void LoadImageStream(ref IMedia Media, string fileName, string DataTypeName, string imageFilePath, string noImageFilePath, string NoImage)
        {
            try
            {
                FileStream fs;
                fs = new FileStream(imageFilePath,
                FileMode.Open, FileAccess.Read, FileShare.Read);
                Media.SetValue(DataTypeName, fileName, fs);
                fs.Close();
            }
            catch (Exception ex)
            {
                FileStream fs;
                fs = new FileStream(noImageFilePath,
                FileMode.Open, FileAccess.Read, FileShare.Read);
                Media.SetValue(DataTypeName, NoImage, fs);
                fs.Close();
            }
        }
    }
}
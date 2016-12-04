using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Umbraco.Core.Models;
using System.Data.SqlClient;
using Umbraco.Core.Services;
using System.Data;
using Umbraco.Web;
using umbraco.MacroEngines;

namespace queengallery.Models
{
    public class ExhibitionsLoaderController : Umbraco.Web.Mvc.SurfaceController
    {
        public ActionResult Upload(FormCollection formCollection)
        {
            if (Request != null)
            {
                 LoadExhibitionArtPieces();
                //LoadMedia();
            }

            return RedirectToCurrentUmbracoPage();
            //return View("Index");
        }


        public void LoadExhibitionArtPieces()
        {

            //HttpPostedFileBase file = Request.Files["UploadedFile"];
            int MediaId = 3576;


            string connecStionstring = "Data Source=192.168.96.135;Initial Catalog=QEEN;User ID=sa;Password=P@ssw0rd";
            SqlConnection conn = new SqlConnection(connecStionstring);
            conn.Open();
            SqlCommand cmd = new SqlCommand(
             "SELECT    *    FROM [QEEN].[dbo].[Exhibitions]", conn);


            SqlDataReader rdr = null;
            rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                var mediaService = Services.MediaService;

                var mediaImage = mediaService.CreateMedia(rdr["nameEn"].ToString(), MediaId, "exhibitionsMedia");
                mediaImage.SetValue("eXID", rdr["ID"]);
                mediaImage.SetValue("nameTh", rdr["nameTh"]);
                mediaImage.SetValue("nameEn", rdr["nameEn"]);

                mediaImage.SetValue("descriptionTh", rdr["descriptionTh"]);
                mediaImage.SetValue("descriptionEn", rdr["descriptionEn"]);


                try
                {


                    ImportsExhibitionPicture(ref mediaImage, rdr["ID"].ToString());
                }
                catch (Exception ex)
                {


                }

                string Exbit = rdr["ID"].ToString();

             
                string sql = "SELECT * FROM [QEEN].[dbo].[ExhibitionArtPieces] where [ExhibitionID]="+Exbit;


                SqlConnection conn2 = new SqlConnection(connecStionstring);
                SqlDataAdapter adapter = new SqlDataAdapter(sql, conn2);
                DataSet ds = new DataSet();
              
                adapter.Fill(ds);

                string condition = "";
                Boolean isfirt = true;
                foreach    (DataRow dr in ds.Tables[0].Rows)
                {
                    //  condition ="(from < Todate) && (!( (from <= Todate) && (to >= Todate)))";
                    if (isfirt)
                        condition += "(ArtPiecesIDXX =\"" + dr["ArtPieceID"] + "\")";
                    else
                        condition += "||(ArtPiecesIDXX =\"" + dr["ArtPieceID"] + "\")";


                    isfirt = false;
                }


                //var items = Umbraco.Media(1366).Children().Where(condition).ToList(); ;

                // DynamicMedia folder = new DynamicMedia(1366).AncestorOrSelf("artPiecesMedia");

                //var items = Umbraco.Media(1366).AncestorOrSelf("artPiecesMedia");

                //condition = "artPiecesID =\"1\"";
                //var items = Umbraco.Media(1366).DescendantsOrSelf("artPiecesMedia").Where(condition).ToList(); ;
                //var items = Umbraco.Media(1366).GetDescendantOrSelfMedia("artPiecesMedia").Children.Where(condition).ToList();

                // var items = Umbraco.Media(1366).GetDescendantOrSelfMedia("artPiecesMedia");
                // Int32  mediaIDa =Convert.ToUInt32( items.Id);
                //loop Art Pice

                // GetDescendantOrSelfMedia
                //var items = Umbraco.Media(1366).Descendants("artPiecesMedia").Where(condition) ;
                if (condition != "")
                { 
                var items = Umbraco.Media(1366).Descendants("artPiecesMedia").Where(condition).ToList();
                string ArtistList = "";
                bool isFirstAties = true;
                foreach (Umbraco.Web.Models.DynamicPublishedContent item in items)
                {

                    //Int32 mediaIDa = item.GetPropertyValue<string>("Id");
                    //string mediaIDa = item.Id;
                    string mediaIDa = item.Id.ToString();

                    if (isFirstAties)
                    {
                        ArtistList = mediaIDa;
                    }
                    else
                    {
                        ArtistList +="," +mediaIDa;
                    }
                    isFirstAties = false;
                    //var mediaServicePice = Services.MediaService;
                }
                    mediaImage.SetValue("artists", ArtistList);
                }

              




                mediaService.Save(mediaImage);
            }

            //artists

            //Artists





        }


        public void LoadMedia()
        { 

                //HttpPostedFileBase file = Request.Files["UploadedFile"];
                int MediaId = Convert.ToInt32(Request.Params["MediaId"]);


                string connecStionstring = "Data Source=192.168.96.135;Initial Catalog=QEEN;User ID=sa;Password=P@ssw0rd";
                SqlConnection conn = new SqlConnection(connecStionstring);
                conn.Open();
                SqlCommand cmd = new SqlCommand(
                 "SELECT  [ID],[NameTh],[NameEn],[DateOfBirth],[DescriptionTh],[DescriptionEn] FROM  [Artists]", conn);


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

                    var mediaImage = mediaService.CreateMedia(rdr["nameEn"].ToString(), MediaId, "ArtistsMedia");
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


                    //Loop หา รูป
                }


                conn.Close();
                rdr.Close();

                conn.Open();
                cmd.CommandText = "SELECT * FROM ArtPieces";
                rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    string ArtistID = rdr["ArtistID"].ToString();

                    string condition = "artistsID =\"" + ArtistID + "\"";
                    var items = Umbraco.Media(MediaId).Children().Where(condition).ToList(); ;

                    // Int32  mediaIDa =Convert.ToUInt32( items.Id);
                    //loop Art Pice

                    foreach (var item in items)
                    {

                        //Int32 mediaIDa = item.GetPropertyValue<string>("Id");
                        var mediaIDa = Convert.ToInt32(item.Id);
                        var mediaServicePice = Services.MediaService;

                        IMedia mediaPiceImage = mediaServicePice.CreateMedia(rdr["nameEn"].ToString(), mediaIDa, "artPiecesMedia");

                        mediaPiceImage.SetValue("ArtPiecesIDXX", rdr["ID"]);
                        mediaPiceImage.SetValue("nameTh", rdr["nameTh"]);
                        mediaPiceImage.SetValue("nameEn", rdr["nameEn"]);
                        mediaPiceImage.SetValue("materialTechniqueDescription", rdr["materialTechniqueDescription"]);

                        mediaPiceImage.SetValue("dimension", rdr["dimension"]);
                        mediaPiceImage.SetValue("descriptionTh", rdr["descriptionTh"]);
                        mediaPiceImage.SetValue("descriptionEn", rdr["descriptionEn"]);
                        mediaPiceImage.SetValue("artPieceTypeID", rdr["artPieceTypeID"]);
                        mediaPiceImage.SetValue("artPieceType", "AAAA");

                        //PropertyType metaRobots = content.ContentType.PropertyTypes.FirstOrDefault(x => x.Alias == "metaRobots");
                        //int dataTypeDefinitionId = metaRobots.DataTypeDefinitionId;
                        //IEnumerable<string> prevalues = ds.GetPreValuesByDataTypeId(dataTypeDefinitionId);

                        var dataType = Services.DataTypeService.GetDataTypeDefinitionByName("ArtPieceTypes");

                        var preValuesFromDataType = umbraco.library.GetPreValues(dataType.Id);
                        mediaPiceImage.SetValue("artPieceType", rdr["ArtPieceType"]);

                        //mediaPiceImage.getProperty("artPieceType").Value = "จิตรกรรม";

                        //DataTypeService dts = new DataTypeService();

                        // Get an instance of the status editor
                        //var statusEditor = dts.GetAllDataTypeDefinitions().First(x => x.Name == "Status");



                        try
                        {


                            ImportsGalerryPicture(ref mediaPiceImage, rdr["ID"].ToString());
                        }
                        catch (Exception ex)
                        {
                        }
                        mediaServicePice.Save(mediaPiceImage);

                    }


                    //string     condition = "(from <= Todate) && (to >= Todate)";
                    //    valuesFilter.Add("Todate", DateTime.Now);
                    //    items = Umbraco.Content(blogId).Children().Where(condition, valuesFilter).OrderBy(sort);

                }


                rdr = null;

                conn.Close();


            }




        public void ImportsExhibitionPicture(ref IMedia Media, string id)
        {
            string imageFilePath = Server.MapPath(string.Format(@"~\App_Data\TEMP\FileUploads\Exhibition\{0}\Banner.jpg", id));
            string noImageFilePath = Server.MapPath(@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            //string imageFilePath = Server.MapPath($@"~\App_Data\TEMP\FileUploads\Gallery\{filename}");
            //string noImageFilePath = Server.MapPath($@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            string DataTypeName = "image";
            LoadImageStream(ref Media, "Picture.jpg", DataTypeName, imageFilePath, noImageFilePath, "no-user-image.jpg");
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

        public void ImportsGalerryPicture(ref IMedia Media, string id)
        {

            string imageFilePath = Server.MapPath(string.Format(@"~\App_Data\TEMP\FileUploads\ArtPiece\{0}\Large.jpg", id));
            string noImageFilePath = Server.MapPath(@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            //string imageFilePath = Server.MapPath($@"~\App_Data\TEMP\FileUploads\Gallery\{filename}");
            //string noImageFilePath = Server.MapPath($@"~\App_Data\TEMP\FileUploads\no-user-image.jpg");

            string DataTypeName = "image";
            LoadImageStream(ref Media, "Picture.jpg", DataTypeName, imageFilePath, noImageFilePath, "no-user-image.jpg");
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
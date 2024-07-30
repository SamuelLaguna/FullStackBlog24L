<!-- Our goal is to create a fullstack web app for a blog setting -->
<!-- Backed Will be done .Net 8, web api, EF core, SQL Server -->
<!-- Front end will be done in react with JS -->
<!-- Deploy with azure Statatic web apps -->



<!-- Create an API for Blog, This must handle all CRUD functions -->

<!-- 
Create
Read 
Update
Delete
 -->

 <!-- In this app the user should be able to log in so we need login page -->
<!-- Blog view post page of published items -->
<!-- Dashboard Page(This is the profile page, will edit, delete, and umpublish your post) -->

<!-- SQL Server from azure for our database  -->
<!-- Folder structure  -->

<!-- Controllers//Folders 
    UserController: This handle all our user interactions 
    All our endpoints will be in this controller for users

-->

<!-- Login//ednpoint
    AddUser//endpoint
    UpdateUser//endpoint
    DeleteUser//endpoint


 -->

 <!-- BlogController 
      
      AddBlogItems//endpoint
      GetAllBlogItems//endpoint R
      GetAllBLogItemsCatagory//endpoint
      GetAllBlogItemsByTags//
      GetAllBLogItemByDate//
      UpdateBlogItems//endpoint U
      DeleteBlogItems;;endpoint D 
 -->

 <!-- Models -->

 <!-- Model Folder -->

 <!-- UserModel

      id int
      username string
      Salt string
      Hash string 

      
  -->

  <!-- BlogItemModel
       

       id int
       UserId ing
       PublisherName string
       Title string
       Image string
       Descriptions string
       Date string
       Category string
       Ispublished bool
       IsDeleted bool
  
   -->

   <!-- Items That will be saved to our database are above -->

   <!-- LoginModel 
        Username string 
        password string 
    CreateAccountModel

        id int
        Username string
        password string
    PasswordModel

        Salt string
        Hash string  
   
    -->

 <!-- Service//Folder
    UserService//file
        GetUserByUsername
        Login
        AddUSer
        DeleteUSer
    BlogItemService
    AddBlogItem
    GetAllBlogItemsByCatagory//functions(methods)
    GetAllBlogItemsByTag
    GetAllBlogItemsByDate
    UpdateAllBlogItems
    DeleteAllBlogItems
    GetUsersById

     -->


<!-- PasswordServices//file
    Hash password

    very hash password

 -->
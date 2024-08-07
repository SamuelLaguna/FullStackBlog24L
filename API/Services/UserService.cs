using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class UserService : ControllerBase
    {
        private readonly DataContext _context;
        public UserService(DataContext context)
        {
           _context = context; 
        }

        //Helper Functions To Help Us Check If the users exist 
        //DoesUserExist 
        public bool DoesUserExist(string username)
        {
            //Check out tables to see is username exists
          return _context.UserInfo.SingleOrDefault(user => user.Username == username) !=null ;
           //Yes or no if it exists
           
            //if one item matches our condition that item will return
            //if no items mathes it will retrun null
            //if ,ultiple items match it will return an error
        }
        //adding user logic
        public bool AddUser(CreateAccountDTO userToAdd)
        {
            bool result = false;
            //if the user alreadty exists
            if(!DoesUserExist(userToAdd.Username))
            {
                UserModel User = new UserModel();

                UserModel newUser = new UserModel();


                var newHashedPassword = HashPassword(userToAdd.Password);

                newUser.Id = userToAdd.id;
                newUser.Username = userToAdd.Username;
                newUser.Salt = newHashedPassword.Salt;
                newUser.Hash = newHashedPassword.Hash;

                _context.Add(newUser);

               result = _context.SaveChanges() != 0;
                

            }

            //if the do not we add an account 
            return result;
            //Else throw a false
        }

        public PasswordDTO HashPassword(string password)
        {
            //create a password DTO this is what will returned
        //New instance of our PasswordDTO
      PasswordDTO newHashedPassword = new PasswordDTO();
      //create a new instance or byte 64 array and save it to Saltbytes
       byte[] SaltBytes = new byte[64];
       //RNGCryptoServiceProvider creates random number
       var provider = new RNGCryptoServiceProvider();
       //now here we are going to get rid of the zeros
       provider.GetNonZeroBytes(SaltBytes); 
       //create a variable for our Salt. This will take our 64 string and encrypt it for us
       var Salt = Convert.ToBase64String(SaltBytes);
       //Now lets create our Hash. first arg is password,bytes, iterations
       var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes,10000);
       var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));
       
       newHashedPassword.Salt = Salt;
       newHashedPassword.Hash = Hash;

       return newHashedPassword;
        }


        //function to verify user password
        public bool VerifyUserPassword(string? Password, string? StoredHash, string? StoredSalt)
        {
            var SaltBytes = Convert.FromBase64String(StoredSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password, SaltBytes,10000);
            var newHash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return newHash == StoredHash;
        }

        public IEnumerable<UserModel> GetAllUsers()
        {
            return  _context.UserInfo;
        }

        public UserModel GetAllUserDataByUsername(string username)
        {
            return _context.UserInfo.FirstOrDefault(user => user.Username == username);
        }

        public IActionResult Login(LogInDTO user)
        {
          IActionResult Result = Unauthorized(); 
          if(DoesUserExist(user.UserName))
          {

            UserModel foundUser = GetAllUserDataByUsername(user.UserName);
            if(VerifyUserPassword(user.Password, foundUser.Hash, foundUser.Salt))
            {
                
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("moresuperreallylongkeysuperSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            Result = Ok(new  { Token = tokenString });
            }
          }
          return Result;
        }

        internal UserIdDTO GetUserIdDTOByUsername(string username)
        {
            throw new NotImplementedException();
        }

        public UserModel GetUserByUsername(string? username)
        {
            return _context.UserInfo.SingleOrDefault(user => user.Username == username);
        }

        public bool DeleteUser(string userToDelete)
        {
           //send  over our username
           UserModel foundUser = GetUserByUsername(userToDelete);
           //get the object and update it
           bool result = false;
           if(foundUser != null)
           {
            foundUser.Username = userToDelete;
            _context.Remove<UserModel>(foundUser);
            result = _context.SaveChanges() !=0;
           }
           return result;
        }

        public UserModel GetUserById(int id)
        {
            return _context.UserInfo.SingleOrDefault(user => user.Id == id);

        }

        public bool UpdateUser(int id, string username)
        {
            UserModel foundUser = GetUserById(id);
            bool result = false;
            if(foundUser != null)
            {
                foundUser.Username = username;
                _context.Update<UserModel>(foundUser);
                result = _context.SaveChanges() !=0;
            }
            return result;
        }
    }
}
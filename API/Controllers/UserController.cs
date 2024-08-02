using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;

        public UserController(UserService dataFromService)
        {
            _data = dataFromService;
        }

        //Add User
        [HttpPost("AddUsers")]

        public bool AddUser(CreateAccountDTO UserToAdd)
        {
          return  _data.AddUser(UserToAdd);
        }


        //GetAllUser Endpoint
        [HttpGet("GetAllUsers")]
        public IEnumerable<UserModel> GetAllUsers()
        {
            return _data.GetAllUsers();
        }
       

        [HttpGet("GetUserByUsername/{username}")]
       public UserIdDTO GetUserIdDTOByUsername(string username)
       {
        return _data.GetUserIdDTOByUsername(username);
       }

        [HttpPost("Login")]

        public IActionResult Login([FromBody] LogInDTO User)
        {
            return _data.Login(User);
        }


        //Delete User
        [HttpPost("DeleteUser/{UserToDelete}")]
        public bool DeleteUser(string UserToDelete)
        {
            return _data.DeleteUser(UserToDelete);
        }

        
        [HttpPost("UpdateUser")]
        public bool UpdateUser(int id, string username)
        {
            return _data.UpdateUser(id,username);
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [HttpPost]

        public bool AddUser(CreateAccountDTO UserToAdd)
        {
          return  _data.AddUser(UserToAdd);
        }
        //LogIn
        //Update user Account
        //Delete user Account
    }
}
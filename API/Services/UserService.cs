using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTO;
using API.Services.Context;

namespace API.Services
{
    public class UserService
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
            //if one item matches our condition that item will return
            //if no items mathes it will retrun null
            //if ,ultiple items match it will return an error
        }
        //adding user logic
        public bool AddUser(CreateAccountDTO userToAdd)
        {
            //if the user alreadty exists
        }
    }
}
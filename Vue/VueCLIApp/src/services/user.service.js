import {ApiService} from '../common/api.service'

export const userService = {
  register,
  getAll,
  login
};

function register(user){
  console.log(user);
}

function login(user){
  return ApiService.post("user/login", user);
}

function getAll(slug = ""){
  return ApiService.get("user", slug);
}
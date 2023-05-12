package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
public class RestApiController {

    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public RestApiController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("admin/json")
    public List<User> admin() {
        return userService.getAllUsers();
    }

    @PostMapping("json/newAddUser")
    public void saveNewUser(@RequestBody User user) {
        userService.create(user);
    }

}

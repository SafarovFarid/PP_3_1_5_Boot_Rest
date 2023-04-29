package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
public class UserController {


    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String admin(Model model) {
        model.addAttribute("users",userService.getAllUsers());
        return "admin";
    }

    @GetMapping("/admin/addNewUser")
    public String addNewUser(Model model) {
        model.addAttribute("user", new User());
        return "addNewUser";
    }

    @PostMapping("/admin/createUser")
    public String create(@ModelAttribute("user") User user,@RequestParam("listRoleId") List<String> roles) {
        Set<Role> userRole = new HashSet<>();
        for (String roleId : roles) {
            Role role = roleService.getRoleById(Long.parseLong(roleId));
            userRole.add(role);
        }
        user.setRoles(userRole);
        userService.create(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/update/{id}")
    public String addNewUser(@PathVariable(name = "id") long id, Model model) {
        User user = userService.getById(id);
        model.addAttribute("user", user);
        return "updateUser";
    }

    @PostMapping("/admin/updateUser")
    public String update(@ModelAttribute("user") User user, @RequestParam("listRoleId") List<String> roles) {
        Set<Role> userRole = new HashSet<>();
        for (String roleId : roles) {
            Role role = roleService.getRoleById(Long.parseLong(roleId));
            userRole.add(role);
        }
        user.setRoles(userRole);
        userService.update(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/delete/{id}")
    public String delete(@PathVariable(name = "id") long id, Model model) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @GetMapping("/user")
    public String user(@AuthenticationPrincipal User activeUser, Model model) {
        model.addAttribute("user",activeUser);
        return "user";
    }








}

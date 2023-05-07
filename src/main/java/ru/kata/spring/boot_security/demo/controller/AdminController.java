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
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String admin(@AuthenticationPrincipal User activeUser, Model model) {
        model.addAttribute("users",userService.getAllUsers());
        model.addAttribute("user", activeUser);
        model.addAttribute("newUser", new User());
        return "admin";
    }


    @PostMapping("/admin/createUser")
    public String create(@ModelAttribute("user") User user, @RequestParam("newListRoleId") List<String> roles) {
        Set<Role> userRole = new HashSet<>();
        for (String roleId : roles) {
            Role role = roleService.getRoleById(Long.parseLong(roleId));
            userRole.add(role);
        }
        user.setRoles(userRole);
        userService.create(user);
        return "redirect:/admin";
    }


    @PutMapping("/admin/updateUser")
    public String update(@ModelAttribute("user") User user, @RequestParam("newListRoleId") List<String> roles) {
        Set<Role> userRole = new HashSet<>();
        for (String roleId : roles) {
            Role role = roleService.getRoleById(Long.parseLong(roleId));
            userRole.add(role);
        }
        user.setRoles(userRole);
        userService.update(user);
        return "redirect:/admin";
    }
    @DeleteMapping("/admin/delete")
    public String delete(@ModelAttribute("user") User user) {
        userService.delete(user.getId());
        return "redirect:/admin";
    }

}

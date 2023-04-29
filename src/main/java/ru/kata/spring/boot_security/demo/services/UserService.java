package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();

    void create(User user);

    User getById (long id);

    void update(User user);

    void delete(long Id);
}

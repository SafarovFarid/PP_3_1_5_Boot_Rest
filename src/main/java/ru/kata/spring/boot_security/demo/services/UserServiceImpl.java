package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.model.User;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void create(User user) {
        userRepository.save(user);
    }

    @Override
    public User getById(long id) {
        return userRepository.getById(id);
    }

   @Transactional
    @Override
    public void update(User user) {
        userRepository.save(user);

    }
    @Transactional
    @Override
    public void delete(long id) {
        userRepository.deleteById(id);
    }
}

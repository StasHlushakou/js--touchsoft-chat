package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.Message;
import com.touchsoft.js7.spring.entityes.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface UserRepository extends CrudRepository<User, Long> {

    User findOneByNameLike(String name);

    List<User> findByIsOnline(boolean isOnline);


}

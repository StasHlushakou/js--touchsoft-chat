package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {

    User findOneByNameLike(String name);


}

package com.touchsoft.js7.spring.entityes;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String name;
    private String botname;

    public User() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBotname() {
        return botname;
    }

    public void setBotname(String botname) {
        this.botname = botname;
    }

    public User(Long id, String name, String botname) {
        this.id = id;
        this.name = name;
        this.botname = botname;
    }
}

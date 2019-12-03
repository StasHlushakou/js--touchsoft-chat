package com.touchsoft.js7.spring.entityes;

import javax.persistence.*;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private Long userID;
    private boolean isReadUser;
    private boolean isReadAdmin;
    private String senderName;
    private String time;


    public Message() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public boolean isReadUser() {
        return isReadUser;
    }

    public void setReadUser(boolean readUser) {
        isReadUser = readUser;
    }

    public boolean isReadAdmin() {
        return isReadAdmin;
    }

    public void setReadAdmin(boolean readAdmin) {
        isReadAdmin = readAdmin;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Message(Long id, String text, Long userID, boolean isReadUser, boolean isReadAdmin, String senderName, String time) {
        this.id = id;
        this.text = text;
        this.userID = userID;
        this.isReadUser = isReadUser;
        this.isReadAdmin = isReadAdmin;
        this.senderName = senderName;
        this.time = time;
    }
}
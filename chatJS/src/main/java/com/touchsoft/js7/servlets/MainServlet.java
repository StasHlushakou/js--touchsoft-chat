package com.touchsoft.js7.servlets;
/*
import com.google.gson.Gson;
import com.touchsoft.js7.core.Message;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("")
public class MainServlet extends HttpServlet {

    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {


        Message msg = new Message("Hello!");
        String employeeJsonString = this.gson.toJson(msg);
        resp.setContentType("application/json; charset=utf-8");
        PrintWriter out = resp.getWriter();
        out.print(employeeJsonString);
        out.flush();

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {


        Message msgReq = new Gson().fromJson(req.getReader(), Message.class);
        System.out.println(msgReq.getText());
        Message msgResp = new Message(msgReq.getText().toUpperCase());
        String employeeJsonString = this.gson.toJson(msgResp);
        System.out.println(employeeJsonString);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        resp.setContentType("application/json; charset=utf-8");
        PrintWriter out = resp.getWriter();
        out.print(employeeJsonString);
        out.flush();

    }



}*/
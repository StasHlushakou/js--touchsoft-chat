package com.touchsoft.js7.servlets;
/*
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



@ WebFilter(asyncSupported = true, urlPatterns = { "/*" })
public class CORSFilter implements Filter {


    public CORSFilter() {
        // TODO Auto-generated constructor stub
    }


    public void destroy() {
        // TODO Auto-generated method stub
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        System.out.println("CORSFilter HTTP Request: " + request.getMethod());

        // Authorize (allow) all domains to consume the content
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "*");




        HttpServletResponse resp = (HttpServletResponse) servletResponse;

        // For HTTP OPTIONS verb/method reply with ACCEPTED status code -- per CORS handshake
        if (request.getMethod().equals("OPTIONS")) {
            ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");
            ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers","Content-Type");
            ((HttpServletResponse) servletResponse).addHeader("Access-Control-Max-Age","10000");
            resp.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // pass the request along the filter chain
        chain.doFilter(request, servletResponse);
    }


    public void init(FilterConfig fConfig) throws ServletException {
        // TODO Auto-generated method stub
    }

}
*/
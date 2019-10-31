package com.zjw.websocket.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * @author zhaojinwei
 */

//@CrossOrigin
@RestController
@RequestMapping("/jsonp")
public class TestJsonpController {

    @Value("${port}")
    private String port;

    @Resource
    HttpServletRequest request;
    @Resource
    HttpServletResponse response;

    @GetMapping("/test")
    public String jsonp(){
        System.out.println(port);
        String str="func('zjw');";
        return str;
    }

}

package com.zjw.websocket.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin
@RestController
@RequestMapping("/jsonp")
public class TestJsonpController {

    @GetMapping("/test.do")
    public String jsonp(){
        Map<String,Object> map=new HashMap<>(6);
        map.put("name","zjw");
        map.put("age",26);
        String str="func('zjw');";
        return str;
    }
}

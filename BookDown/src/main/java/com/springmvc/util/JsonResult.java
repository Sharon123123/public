package com.springmvc.util;

import java.io.Serializable;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/29
 * @description： 用户封装服务器到客户端的Json 返回值
 * @modified By：
 */
public class JsonResult<T> implements Serializable {

    // Serializable 将对象的状态保存在存储媒体中以便可以在以后重新创建出完全相同的副本
    public static final int SUCCESS = 200;
    public static final int ERROR = 404;
    public static final int OTHER = 2;

    private int state;
    private String message = "";
    private T data;
    private String pass = "";
    private String imgurl = "";

    public String getImgurl() {
        return imgurl;
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl;
    }

    public JsonResult() {
        state = SUCCESS;
    }

    // 为了方便，重载n个构造器
    public JsonResult(int state, String message, T data) {
        super();
        this.state = state;
        this.message = message;
        this.data = data;
    }

    public JsonResult(int state, String error) {
        this(state, error, null);
    }

    public JsonResult(int state, T data) {
        this(state, "", data);
    }

    public JsonResult(String error) {
        this(ERROR, error, null);
    }

    public JsonResult(T data) {
        this(SUCCESS, "", data);
    }

    public JsonResult(int state) {
        this(state, "", null);
    }

    public JsonResult(Throwable e) {
        this(ERROR, e.getMessage(), null);
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static int getSuccess() {
        return SUCCESS;
    }

    public static int getError() {
        return ERROR;
    }

    @Override
    public String toString() {
        return "JsonResult [state=" + state + ", message=" + message
                + ", pass=" + pass + ",imgUrl=" + imgurl + ", data=" + data + "]";
    }

}

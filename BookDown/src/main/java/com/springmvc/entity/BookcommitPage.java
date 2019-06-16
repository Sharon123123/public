package com.springmvc.entity;

/**
 *  用户评论的封装
 */
public class BookcommitPage {
    private Integer bcId;

    private String bookName;

    private String userName;

    private String userPhoto;

    private String commtime;

    private String comm;

    public Integer getBcId() {
        return bcId;
    }

    public void setBcId(Integer bcId) {
        this.bcId = bcId;
    }


    public String getUserPhoto() {
        return userPhoto;
    }

    public void setUserPhoto(String userPhoto) {
        this.userPhoto = userPhoto;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCommtime() {
        return commtime;
    }

    public void setCommtime(String commtime) {
        this.commtime = commtime;
    }

    public String getComm() {
        return comm;
    }

    public void setComm(String comm) {
        this.comm = comm;
    }
}
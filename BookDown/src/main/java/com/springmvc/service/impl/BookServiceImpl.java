package com.springmvc.service.impl;

import com.springmvc.dao.BookMapper;
import com.springmvc.dao.BooktypeMapper;
import com.springmvc.entity.AdminBook;
import com.springmvc.entity.Book;
import com.springmvc.entity.Page;
import com.springmvc.entity.RecodCount;
import com.springmvc.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/26
 * @description：
 * @modified By：
 */
@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper mapper;
    @Autowired
    private BooktypeMapper booktypeMapper;

    @Override
    public int saveBook(Book book) {
        return mapper.insertSelective(book);
    }

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return mapper.deleteByPrimaryKey(id);
    }

    @Override
    public Book selectByPrimaryKey(Integer id) {
        return mapper.selectByPrimaryKey(id);
    }


    @Override
    // 查询所有的图书
    public List<Book> selectBookList() {
        return mapper.selectBookList();
    }

    @Override
    public List<Book> selectBookByName(String name) {
        return mapper.searchBook(name);
    }

    /**
     *  根据choice 的值选择是网页推荐还是排行。
     * @param choice
     * @return
     */
    @Override
    public List<Book> selectBookByChoice(int choice) {
        return mapper.selectBookByChoice(choice);
    }

    @Override
    // 查询数量
    public int selectCount(Integer bgid) {
        return mapper.selectCount(bgid);
    }



    @Override
    public Page findBypage(int currentPage, int tagid ,String u ) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        Page<Book> page = new Page<>();
        Page<AdminBook> adminPage = new Page<>();

        page.setCurrPage(currentPage);
        adminPage.setCurrPage(currentPage);

        // 每页显示20条数据
        int pageSize = 20;
        page.setPageSize(pageSize);
        adminPage.setPageSize(pageSize);

        // 封装总记录数
        int totalCount = mapper.selectCount(tagid);
        page.setTotalCount(totalCount);
        adminPage.setTotalCount(totalCount);

        // 封装总页数
        double tc = totalCount;
//         向上取整
        Double num = Math.ceil(tc / pageSize);
        page.setTotalPage(num.intValue());
        adminPage.setTotalPage(num.intValue());

        map.put("start", (currentPage - 1) * pageSize);
        if (u.equals("u")){
            map.put("size", page.getPageSize());
        }else {
            map.put("size", adminPage.getPageSize());
        }

        map.put("tagid",tagid);

        // 封装每页显示的数据
        // 管理员，和首页查询所有图书
        if (u.equals("u")){
            // 普通用户查询图书
            List<Book>lists = mapper.findByPage(map);
            page.setLists(lists);
            return page;
        }else {
            // 管理员查询
            List<AdminBook>list = mapper.adminGetBook(map);
            adminPage.setLists(list);
            return adminPage;
        }



    }


    @Override
    public int updataBookByKey(Book bId) {
        return mapper.updateByPrimaryKeySelective(bId);
    }

    @Override
    public int updateByPrimaryKeySelective(Book book) {
        return mapper.updateByPrimaryKeySelective(book);
    }

    @Override
    public List<RecodCount> countBootNum() {
        return booktypeMapper.connectSelect();
    }
}

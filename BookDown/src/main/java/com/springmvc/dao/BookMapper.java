package com.springmvc.dao;

import com.springmvc.entity.AdminBook;
import com.springmvc.entity.Book;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.HashMap;
import java.util.List;

@Repository
public interface BookMapper {

    //    根据主键删除一条数据
    int deleteByPrimaryKey(Integer bId);

    int insert(Book record);

    int insertSelective(Book record);

    /**
     * 查询所有图书
     *
     * @return
     */
    List<Book> selectBookList();

    /**
     * 根据书名或者作者查找图书
     *
     * @param name
     * @return
     */
    List<Book> searchBook(@Param(value = "name")String name);

    /**
     * 根据浏览量，和下载量查询图书
     * 下载量代表图书排行
     * 图书评分代表网站推荐
     * map 包含两个产生
     *
     * @return
     */
    List<Book> selectBookByChoice(@Param(value = "choice") int choice);

    /**
     * 查询图书记录数
     *
     * @return
     */
    int selectCount(@Param(value = "tagid") int tagid);

    /**
     * 分页操作，limit 分页方法
     *
     * @param map
     * @return
     */
    List<Book> findByPage(HashMap<String, Object> map);

    List<AdminBook> adminGetBook(HashMap<String, Object> map);

    Book selectByPrimaryKey(Integer bId);


    int updateByPrimaryKeySelective(Book record);

    int updateByPrimaryKey(Book record);

}
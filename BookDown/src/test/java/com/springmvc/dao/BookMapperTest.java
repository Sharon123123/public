package com.springmvc.dao;

import com.springmvc.entity.Book;
import com.springmvc.util.ImgeUtils;
import net.sf.json.JSONObject;
import org.apache.http.entity.ContentType;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/29
 * @description： 批量添加书的信息
 * @modified By：
 */
public class BookMapperTest {

    private ApplicationContext applicationContext;

    @Autowired
    private BookMapper mapper;

    @Before
    public void setUp() throws Exception {
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        mapper = applicationContext.getBean(BookMapper.class);

    }

    @After
    public void tearDown() throws Exception {
    }

    /**
     * 图书类型
     * 100	azw3
     * 101	epub
     * 102	mobi
     * 103	中国文学
     * 104	传记
     * 105	历史
     * 106	哲学
     * 107	商业
     * 108	外国文学
     * 109	小说
     * 110	心理
     * 111	心理学
     * 112	思维
     * 113	悬疑
     * 114	推理
     * 115	散文
     * 116	文化
     * 117	文学
     * 118	日本
     * 119	日本文学
     * 120	社会学
     * 121	科幻
     * 122	科普
     * 123	管理
     * 124	经济
     * 125	经济学
     * 126	美国
     * 127	英国
     * 128	金融
     * 129	随笔
     *
     * @throws Exception
     */
    @Test
    public void testInsertSective() throws Exception {
        ArrayList<String> files = new ArrayList<String>();
        String path = "E:\\developTools\\python\\Deployment\\nove\\novelphoto";
        File file = new File(path);
        File[] temlist = file.listFiles();
        Book book;
        Date date;
        BufferedReader reader = null;
        InputStreamReader isr = null;
        int booktype = 100;
        for (File item : temlist) {
            if (item.isDirectory()) {
//                File[] itemFile = item.getCanonicalFile().listFiles();
                try {
//                    System.out.println(item.getCanonicalPath());
                    String jsonPath = item.getCanonicalPath() + "\\" + item.getName() + ".json";

                    isr = new InputStreamReader(new FileInputStream(jsonPath), "UTF-8");
                    reader = new BufferedReader(isr);
                    String tempString = null;
                    while ((tempString = reader.readLine()) != null) {

                        tempString = tempString.replaceAll("},", "}");
                        JSONObject json = JSONObject.fromObject(tempString);
                        book = new Book();
                        book.setbName(json.getString("bookName"));
                        book.setbAuthor(json.getString("author"));
                        book.setbBooktag(booktype);
                        book.setbDescripation(json.getString("bookDescripation"));
                        book.setbIsbn(json.getString("ISBN"));
                        book.setbScore(json.getString("score"));
                        book.setbPublishing(json.getString("bookPublishing"));
                        date = new Date();
                        book.setbIntime(new SimpleDateFormat("yyyy-MM-dd").format(date));
                        book.setAuthorDescripation(json.getString("authorDescripation"));
//                        保存照片信息，以及上传文件。
                        File bookjpg = new File(item.getCanonicalPath() + "\\" + book.getbName() + ".jpg");
                        FileInputStream in_file = new FileInputStream(bookjpg);
                        // 文件转 multipartFile
                        MultipartFile multi = new MockMultipartFile(bookjpg.getName(), bookjpg.getName(), ContentType.APPLICATION_OCTET_STREAM.toString(), in_file);
                        String imgPath = ImgeUtils.upload(multi);
                        book.setbPhoto(imgPath);
                        String bookLink = ImgeUtils.upload(ImgeUtils.isExist(item.getCanonicalPath() + "\\" + book.getbName()));
                        book.setbDownlink(bookLink);

                        // 将数据插入到数据库中
                        mapper.insertSelective(book);

                    }
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (reader != null) {
                        try {
                            reader.close();
                        } catch (IOException e) {

                        }
                    }
                }
            }

            booktype = booktype + 1;
            System.out.println(item.getName() + "数据上传成功");
            ;
        }
    }


    @Test
    public void selectAllBook() throws Exception {
        List<Book> list = mapper.selectBookList();
        System.out.println(list.get(0).getbName());
        System.out.println(mapper.selectCount(0));

    }

    @Test
    public void selectCount() throws Exception {
        int rsult = mapper.selectCount(0);
        System.out.println(rsult);
    }

    @Test
    public void selectChoice() throws Exception {
        List<Book> list = mapper.selectBookByChoice(1);
        System.out.println("结果数据大小：" + list.size());
        for (Book item : list
        ) {
            System.out.println(item.getbId() + "\t" + item.getbName());
        }
    }

    @Test
    public void selectBookByName() throws Exception {
        List<Book> list = mapper.searchBook("东野圭吾");
        System.out.println("结果数据大小：" + list.size());
        for (Book item : list
        ) {
            System.out.println(item.getbId() + "\t" + item.getbName());
        }
    }

}
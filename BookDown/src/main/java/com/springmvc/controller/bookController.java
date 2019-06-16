package com.springmvc.controller;

import com.springmvc.entity.*;
import com.springmvc.service.BookService;
import com.springmvc.service.BookTypeService;
import com.springmvc.util.Constant;
import com.springmvc.util.ImgeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/26
 * @description： 和图书有关的操作，图书上传，图书回显，图书照片上传等。
 * @modified By：
 */
@Controller
public class bookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private BookTypeService bookTypeService;


    /**
     *  管理员 添加图书 相关信息
     * @param model
     * @return
     */
    @RequestMapping(value = "/admin_addcontent")
    public String bookAddMange(HttpSession session,Model model){
        Admin admin = (Admin) session.getAttribute("admin");
        model.addAttribute("admin",admin);
        return "admin_content_post";
    }

    /**
     *  管理员添加图书
     * @param book
     * @return
     */

    @RequestMapping(value = "/admin_add_book",method = RequestMethod.POST)
    @ResponseBody
    public String adminAddBook(@ModelAttribute Book book){
        Map<String,Integer> map = new HashMap<>();
        int statue=bookService.saveBook(book);
        map.put("statue",statue);
        return Constant.JsonByMap(map);
    }


    /**
     * 添加图书信息
     *
     * @param book                               ，封装表单中除，地址以外的其他数据，（要求<input> 中的name 跟实体类中的属性一致
     * @param pictureFile，封装上传图片的信息，如大小，文件名，扩展名等
     * @return 图片提交input 输入框的name 属性值要与Controller 中MultipartFile
     * 接口所声明的形参名一致，不然需要用@RequestParam 注解绑定。
     */
    @RequestMapping(path = "/addbook", method = RequestMethod.POST)
    public String addBook(Book book, MultipartFile pictureFile, Model model) {

        String imgPath = null;
        try {
            imgPath = ImgeUtils.upload(pictureFile);
            if (imgPath != null) {
                // 上传图片的地址封装到实体类
                book.setbPhoto(imgPath);
                book.setbName("测试");
                book.setbAuthor("张三1");
                System.out.println("图片地址" + imgPath);
                System.out.println("---------图片上传成功---");
            } else {
                System.out.println("-----图片上传失败---");
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("-----图片上传失败---");
        }

//        将数据提交到数据库（包含文件和普通表单数据）
        int rowNo = bookService.saveBook(book);
        System.out.println(rowNo);
        if (rowNo > 0) {
            System.out.println("------- 图书添加成功");
            model.addAttribute("book", book);
            System.out.println(book);
            return "";
        } else {
            System.out.println("----- 图书添加失败-");
            return "addBook";
        }


    }

    /**
     * 根据书名或者作者查找图书
     *
     * @param session
     * @param content
     * @param model
     * @return
     */
    @RequestMapping(value = "/search")
    public String searchBook(HttpSession session, @RequestParam(value = "content") String content, Model model) {
        String message = "查询结果";
        model.addAttribute("message", message);
        List<Book> bookList = bookService.selectBookByName(content);
        model.addAttribute("bookList", bookList);
        List<Booktype> booktypes = bookTypeService.selectBooktag();
        model.addAttribute("booktypes", booktypes);
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        System.out.println(content);
        return "search";
    }

    /**
     * 图书排行榜以及图书推荐功能实现
     *
     * @param choice 图书的标签
     * @param model 将查询的结果放在model 里
     * @return 跳转到查询结果页面
     */

    @RequestMapping(value = "/rating")
    public String ratingPage(HttpSession session, @RequestParam(value = "choice") int choice, Model model) {
        List<Book> bookList = bookService.selectBookByChoice(choice);
        List<Booktype> booktypes = bookTypeService.selectBooktag();
        String message = null;
        if (choice == 0) {
            message = "最新下载图书 Top20 排行榜";
        } else {
            message = "最新图书评分 Top20 排行榜";
        }
        model.addAttribute("booktypes", booktypes);
        model.addAttribute("bookList", bookList);
        model.addAttribute("message", message);
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        return "ratepage";
    }

    /**
     *  管理员更新图书信息
     * @param book 前端传来图书数据
     * @return 返回更新是否成功
     */
    @RequestMapping(value = "/update_book",method = RequestMethod.POST)
    @ResponseBody
    public String updateBookByAdmin(@ModelAttribute Book book){
        HashMap<String, Integer> map = new HashMap<>();
        int message;
        int result = bookService.updateByPrimaryKeySelective(book);
        if (result == 1) {
            message = 1;
        } else {
            message = 0;
        }
        map.put("message", message);
        return Constant.JsonByMap(map);
    }


    /**
     *  管理员根据 后台ID 获取图书信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/get_one_book", method = RequestMethod.POST)
    @ResponseBody
    public Book getOneBook(@RequestParam(value = "id") int id) {
        return bookService.selectByPrimaryKey(id);
    }


    /**
     * 首页点击下一页跳转，显示主页内容
     *
     * @param pn
     * @param model
     * @return
     */
    @RequestMapping(value = "/page")
    public String showBookByPage(HttpSession session, @RequestParam(value = "pn", defaultValue = "1") int pn, Model model) {
        Page<Book> bookPage = bookService.findBypage(pn, 0, "u");
        List<Booktype> booktypes = bookTypeService.selectBooktag();
        model.addAttribute("booktypes", booktypes);
        model.addAttribute("bookPage", bookPage);
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        return "pagebook";
    }

    /**
     * 根据标签查找图书
     *
     * @param tagid
     * @param model
     * @return
     */
    @RequestMapping(value = "/tag")
    public String bookTag(HttpSession session, @RequestParam(value = "tagid") int tagid, @RequestParam(value = "pn", defaultValue = "1") int pn, Model model) {

        Page<Book> bookPage = bookService.findBypage(pn, tagid, "u");
        Booktype booktype = bookTypeService.selectByPrimaryKey(tagid);
        List<Booktype> booktypes = bookTypeService.selectBooktag();
        model.addAttribute("bookPage", bookPage);
        model.addAttribute("booktag", booktype);
        model.addAttribute("booktypes", booktypes);
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        return "booktagInfo";
    }

    /**
     * 管理员图书管理,显示所有图书
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "/admin_content")
    public String bookMange(HttpSession session, Model model, @RequestParam(value = "pn", defaultValue = "1") int pn) {
        Admin admin = (Admin) session.getAttribute("admin");
        model.addAttribute("admin", admin);
        // 管理员查询图书
        Page<AdminBook> bookList = bookService.findBypage(pn, 0, "a");
        model.addAttribute("allBook", bookList);
        return "admin_content";

    }

    /**
     * 管理员根据图书ID，删除图书
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "book_delete", method = RequestMethod.POST)
    @ResponseBody
    public String bookDelete(@RequestParam(value = "id") int id) {
        Book recode = bookService.selectByPrimaryKey(id);
        HashMap<String, String> map = new HashMap<>();
        String message = null;
        if (recode != null) {
            String image = recode.getbPhoto();
            String downLink = recode.getbDownlink();
            if (ImgeUtils.deleteImage(image) && ImgeUtils.deleteImage(downLink)) {
                if (bookService.deleteByPrimaryKey(id) == 1) {
                    // 删除用户成功
                    message = "删除图书成功！";
                    map.put("message", message);
                    return Constant.JsonByMap(map);
                }
            }
        }
        message = "出现意外，删除图书失败";
        map.put("message", message);
        return Constant.JsonByMap(map);
    }


    /**
     * 图书详情页，图书介绍
     *
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value = "/bookInfo")
    public String bookInfo(HttpSession session, @RequestParam(value = "id") int id, Model model) {
        Book book = bookService.selectByPrimaryKey(id);
        int look = book.getbLook() + 1;
        book.setbLook(look);
//        每浏览一次，增加1
        String desc = book.getbDescripation().replaceAll("收起", " ");
        book.setbDescripation(desc);
        bookService.updataBookByKey(book);

        Booktype booktype = bookTypeService.selectByPrimaryKey(book.getbBooktag());
        List<Booktype> booktypes = bookTypeService.selectBooktag();

        model.addAttribute("bookInfo", book);
        model.addAttribute("booktype", booktype);
        model.addAttribute("booktypes", booktypes);
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        return "bookInfo";
    }


    /**
     * 首页显示图书
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/showBook")
    @ResponseBody
    public Page<Book> getAllBook(HttpServletRequest request, @RequestParam(value = "pn", defaultValue = "1") int pn) {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        Page<Book> bookList = bookService.findBypage(pn, 0, "u");
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("user", user);
        bookList.setMap(hashMap);
        return bookList;
    }


    /**
     * 根据图书的ID 查询数据库，然后进行文件下载
     *
     * @param request
     * @param response
     * @param id
     * @throws Exception
     */
    @RequestMapping(value = "/downbook")
    @ResponseBody
    public void fileDownload(HttpServletRequest request,
                             HttpServletResponse response, @RequestParam(value = "id") int id) throws Exception {

        Book book = bookService.selectByPrimaryKey(id);

        // 下载次数加1
        book.setbTimes(book.getbTimes() + 1);

        String localPath = Constant.localPath;
        String down = book.getbDownlink().replaceAll("/", "\\\\");
        localPath = localPath + down;
        ServletOutputStream out;
        // 得到要下载的文件
        File file = new File(localPath);
        System.out.println("下载文件名:" + file.getName());
        try {
            response.setContentType("multipart/form-data");

            // 获取浏览器信息，并处理文件名
            String headerType = request.getHeader("User-Agent").toUpperCase();

            String fileName = URLEncoder.encode(book.getbName(), "UTF-8");
            String exe = file.getName().split("\\.")[1];
            fileName = fileName + "." + exe;
            response.addHeader("Content-Disposition", "attachment;filename=" + fileName);
            response.addHeader("Content-Length", "" + file.length());
            FileInputStream inputStream = new FileInputStream(file);
            out = response.getOutputStream();
            int b = 0;
            byte[] buffer = new byte[1024];
            while (b != -1) {
                b = inputStream.read(buffer);                //写到输出流(out)中
                if (b != -1) out.write(buffer, 0, b);
            }
            inputStream.close();
            out.close();//关闭输出流
            out.flush();
            bookService.updateByPrimaryKeySelective(book);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}



package com.springmvc.controller;

import com.springmvc.entity.User;
import com.springmvc.service.UserService;
import com.springmvc.util.Constant;
import com.springmvc.util.Encryption;
import com.springmvc.util.GenerateID;
import com.springmvc.util.ImgeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller层，核心控制器。在controller层中的类里面一定要导入service层，
 * 因为service中的方法是我们使用到的，
 * controller通过接收前端传过来的参数后进行业务操作，
 * 然后再给前端返回一个指定的路径或者数据表
 */

@Controller
public class userController {

    @Autowired
    private UserService userService;


    /**
     * @return 由首页跳转到登录页面
     */
    @RequestMapping(value = "/login")
    public String gotoLogin() {
        return "login";
    }

    /**
     * 用户登录
     * 获取用户的用户名，密码，并且进行验证
     */
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    @ResponseBody
    public String loginValidate(HttpSession session, User userlogin) {
        String pwd = Encryption.MD5(userlogin.getuPwd());

        User user = userService.getUserByName(userlogin.getuName(), pwd);

        String message = null;
        if (user != null) {
//            将用户数据放进session 中
            session.setAttribute("user", user);
            message = "success";
        } else {
//           密码或者用户名错误
            message = "false";
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("message", message);
        // 将map 里的数据转为json 发送给前端
        return Constant.JsonByMap(map);

    }

    /**
     * 检测用户名是否重复
     *
     * @param uName
     * @return
     */
    @RequestMapping(value = "/checkusername", method = RequestMethod.POST)
    @ResponseBody
    public String checkUserName(@RequestParam(value = "uName") String uName) {

        Map<String, Boolean> map = new HashMap<String, Boolean>();
        boolean result = userService.checkUserName(uName);
        map.put("valid", result);
        return Constant.JsonByMap(map);

    }


    /**
     * 根据用户ID查询用户信息
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/checkUser", method = RequestMethod.POST)
    @ResponseBody
    public User checkUser(@RequestParam(value = "id") String id) {
        User user = userService.select(id);
        return user;
    }


    /**
     * 管理员删除用户
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/adminDelete", method = RequestMethod.POST)
    @ResponseBody
    public String adminDelete(@RequestParam(value = "id") String id) {
        User recode = userService.select(id);
        HashMap<String, String> map = new HashMap<>();
        String message = null;
        if (recode != null) {
            String image = recode.getuPhoto();
            if (ImgeUtils.deleteImage(image)) {
                if (userService.deleteUser(id) == 1) {
                    // 删除用户成功
                    message = "删除用户成功！";
                    map.put("message", message);
                    return Constant.JsonByMap(map);
                }
            }
        }
        message = "出现意外，删除用户失败";
        map.put("message", message);
        return Constant.JsonByMap(map);
    }

    /**
     * 管理员用户头像添加，图书照片添加，以及文件
     *
     * @param multipartFile
     * @return
     */
    @RequestMapping(value = "/adminUpImage", method = RequestMethod.POST)
    @ResponseBody
    public String adminUpImage(@RequestParam(value = "file") MultipartFile multipartFile) {

        Map<String, String> map = new HashMap<String, String>();
        String message = null;
        String img = null;
        // 判断是否为空
        if (multipartFile != null && !multipartFile.isEmpty()) {
            try {
                img = ImgeUtils.upload(multipartFile);
                if (img != null) {

                    message = "success";
                    map.put("img", img);
                }
            } catch (IOException e) {
                message = "warn";
                e.printStackTrace();
            }
        } else {
            message = "error";
        }
        map.put("message", message);
        return Constant.JsonByMap(map);
    }


    /**
     * 管理员添加用户,将所有信息保存到数据库中
     *
     * @param user
     * @return
     */
    @RequestMapping(value = "/adminAddUser", method = RequestMethod.POST)
    @ResponseBody
    public String adminAddUser(@ModelAttribute User user) {
        Map<String, Integer> map = new HashMap<>();
        // 图片保存到数据库里的位置
        String img = null;
        int message = 1;

        // 图片已经上传到服务器里了
        System.out.println(user.getuPhoto());
        // 生成ID
        user.setuId(GenerateID.generateShortUuid());
        // 密码加密
        user.setuPwd(Encryption.MD5(user.getuPwd()));


        if (userService.insert(user) == 1) {
            // 用户信息添加到数据库中
            message = 0;
            map.put("statue", message);
            return Constant.JsonByMap(map);
        }
        map.put("statue", message);
        return Constant.JsonByMap(map);

    }


    /**
     * 管理员更新用户数据
     *
     * @param user
     * @return
     */
    @RequestMapping(value = "/adminUpdateUser", method = RequestMethod.POST)
    @ResponseBody
    public String adminUpdate(@ModelAttribute User user) {
        Map<String, Integer> map = new HashMap<>();
        int message;
        int result = userService.updateByPrimaryKeySelective(user);
        if (result == 1) {
            message = 1;
        } else {
            message = 0;
        }
        map.put("message", message);
        return Constant.JsonByMap(map);
    }


    /**
     * 用户个人中心数据更新
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/userUpdate_info", method = RequestMethod.POST)
    @ResponseBody
    public String updateImage(HttpSession session, @ModelAttribute User recode) {

        // 从session 中取出用户数据
        User user = (User) session.getAttribute("user");
        Map<String, Integer> map = new HashMap<String, Integer>();
        // 密码加密
        if (recode.getuPwd() != null) {
            user.setuPwd(Encryption.MD5(recode.getuPwd()));
        }
        if (recode.getuPhoto() != null) {
            user.setuPhoto(recode.getuPhoto());
        }
        if (recode.getuEmail() != null) {
            user.setuEmail(recode.getuEmail());
        }
        if (user.getuPhone() != null) {
            user.setuPhone(recode.getuPhone());
        }


        // 更新数据库中的用户数据
        int result = userService.updateByPrimaryKeySelective(user);
        if (result == 1) {
            // 更新session 用户数据
            session.setAttribute("user", user);
        }

        map.put("result", result);
        return Constant.JsonByMap(map);
    }

    //    用户注销登录
    @RequestMapping(value = "/user/logout", method = RequestMethod.GET)
    public String logout(HttpSession session) {
        session.invalidate();
        return "login";
    }

    /**
     * 用户个人信息页面
     *
     * @param model
     * @param session
     * @return
     */
    @RequestMapping(value = "/user/userInfo", method = RequestMethod.GET)
    public String userInfo(Model model, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            model.addAttribute("user", user);
        }

        return "userinfor";
    }

    /**
     * @return 跳转到注册页面
     */
    @RequestMapping(value = "/toregister")
    public String toRegister() {

        return "register";
    }

    /**
     * 用户注册
     *
     * @param user
     * @param
     * @return
     */

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addUser(HttpSession session, @ModelAttribute User user) {
        User record = new User();
        HashMap<String, Object> map = new HashMap<>();
        record.setuName(user.getuName());
        List<User> list = userService.selectSelective(record);
        if (list.size() == 0) {

            /**
             *  新注册用户默认类型是
             *  10：新手上路
             *  11：初级会员
             *  12：中级会员
             *  13：高级会员
             *   user.setCreatetime(new Date());
             */
            // 生成用户id
            user.setuId(GenerateID.generateShortUuid());
            int utype = 10;
            user.setuTypeid(utype);

            user.setuPwd(Encryption.MD5(user.getuPwd()));
            // 性别 默认是男生就是true,否则是女生
            if (user.getuSex()) {
                user.setuPhoto("/images/man.jpg");
            }
            user.setuPhoto("/images/woman.jpg");
//            System.out.println("性别"+ user.getuSex());
            if (userService.insert(user) == 1) {
//                注册成功
                map.put("statue", 0);
                session.setAttribute("user", user);
            } else {
//                注册失败
                map.put("statue", 1);

            }
        } else {
//            该用户名已经存在,请更换一个
            map.put("statue", 2);

        }

        return map;
    }
}

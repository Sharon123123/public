package com.springmvc.util;

import org.apache.commons.io.FilenameUtils;
import org.apache.http.entity.ContentType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/26
 * @description： 图片上传工具类
 * @modified By：
 */
public class ImgeUtils {

    /**
     * 根据图片的物理地址删除本地图片，和图书
     *
     * @param picture
     * @return
     */

    public static boolean deleteImage(String picture) {

        if (picture.indexOf("images") != -1) {
            // 返回值不等于-1 说明
            // 该图片保存在服务器里，不需要删除
            return true;
        }

        // 存放的物理地址
        String localPath = Constant.localPath;
        localPath = localPath + picture;
        File file = new File(localPath);
        if (file.exists()) {
//            删除图片
            file.delete();
            return true;
        }
        return false;
    }

    /**
     * 上传图片
     *
     * @param pictureFile
     * @return
     * @throws IOException
     */
    public static String upload(MultipartFile pictureFile) throws IOException {

//        装配后的图片地址
        String imgPath = null;
        // 定义文件保存的本地路径
        String localPath = Constant.localPath;
        // 上传图片
        if (pictureFile != null && !pictureFile.isEmpty()) {
            // 使用UUID 给图片重命名，并去掉四个“_”
            String name = UUID.randomUUID().toString().replace("-", "");

            //   获取文件的扩展名，可以将照片，和文本分离
            String ext = FilenameUtils.getExtension(pictureFile.getOriginalFilename());
            if (ext.equals("jpg")) {
                localPath = localPath + "\\img";
            } else {
                localPath = localPath + "\\txt";
            }

            // 检查文件夹是否存在
            isFolderExists(localPath);
            // 以绝对路径保存重命名后的图片
            pictureFile.transferTo(new File(localPath + "/" + name + "." + ext));
            // 装配图片地址,把图片的相对路径保存到数据库中
            if (ext.equals("jpg")) {
                imgPath = "/img/";
            } else {
                imgPath = "/txt/";
            }
            imgPath = imgPath + name + "." + ext;

        }
        return imgPath;

    }

    /**
     * 验证文件夹是否存在
     *
     * @param strFolder
     * @return
     */

    private static boolean isFolderExists(String strFolder) {
        File file = new File(strFolder);
        if (!file.exists()) {
            if (file.mkdir()) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    /**
     * 用户头像上传
     *
     * @param file
     * @param request
     * @return
     */
    public static String uploadUserImage(MultipartFile file, HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath("/userImage");

        return null;
    }


    /**
     * 根据上传文件的路径，返回一个multipartFile 对象
     *
     * @param path
     * @return
     */
    public static MultipartFile isExist(String path) {

        File bookLink;
        String[] exe = {".azw3", ".epub", ".mobi"};
        for (int i = 0; i < exe.length; i++) {
            bookLink = new File(path + exe[i]);
            if (bookLink.exists()) {
                try {
                    FileInputStream in_file = new FileInputStream(bookLink);
                    // 文件转 multipartFile
                    MultipartFile multi = new MockMultipartFile(bookLink.getName(), bookLink.getName(), ContentType.APPLICATION_OCTET_STREAM.toString(), in_file);
                    return multi;
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }

        return null;
    }


    /**
     * 获取目录下所有文件（按时间排序）
     *
     * @param path
     * @return
     */
    public static List<File> getFileSort(String path) {
        List<File> list = getFiles(path, new ArrayList<File>());
        if (list != null && list.size() > 0) {
//           按照时间降序排列
            Collections.sort(list, (File file, File newFile) -> (int) (newFile.lastModified() - file.lastModified()));
        }
        return list;
    }

    /**
     * 获取目录下所有文件
     *
     * @param path
     * @param files
     * @return
     */
    public static List<File> getFiles(String path, List<File> files) {
        File realFile = new File(path);
        if (realFile.isDirectory()) {
            File[] subfiles = realFile.listFiles();
            for (File file : subfiles
            ) {
                if (file.isDirectory()) {
                    getFiles(file.getAbsolutePath(), files);
                } else {
                    files.add(file);
                }

            }
        }
        return files;
    }


}

# 创建数据库
create database Library;
use Library;

/* 1.创建管理员表 */
create table Admin
(
  a_id   int          not null primary key auto_increment,
  a_name nvarchar(20) not null,
  a_pwd  varchar(34)  not null
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;
# alter  table Admin modify column a_pwd varchar(34) not null ;
# delete  from  Admin  where a_id=3;

/**
*  2.创建用户类型表，如果是会员，拥有所有的下载权限
  最大下载数量
  新手上路  初级会员，中级会员，高级会员

 */
create table Duty
(
  d_id       int          not null primary key auto_increment,
  d_name     nvarchar(20) not null,
  d_maxcount tinyint      not null
) ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8;

/* 3.创建用户表
  包含，用户id，用户名，用户密码，用户性别，
  用户类型，用户手机号，用户email,用户照片。
  其中用户类型是外键
*/
create table User
(
  u_id     varchar(10) PRIMARY KEY,
  u_name   nvarchar(20) not null,
  u_pwd    varchar(20)  not null,
  u_sex    bit,
  u_phone  varchar(20),
  u_email  varchar(20),
  u_typeid int          not null,
  u_photo  nvarchar(20),
  foreign key (u_typeid) references Duty (d_id) on DELETE cascade on UPDATE cascade
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

# alter table User modify column u_photo nvarchar(100);
# truncate table User;

/* 4.创建图书类型表*/
create table BookType
(
  bt_id   int primary key not null AUTO_INCREMENT,
  bt_name nvarchar(20)    not null
) ENGINE = InnoDB
  AUTO_INCREMENT = 100
  DEFAULT CHARSET = utf8;

/* 5.创建图书信息表
  图书id，图书名字，图书作者，图书出版时间，图书标签，图书评分，
  图书ISBN，图书添加时间，图书介绍，图书照片，图书下载次数(默认是0次），图书类型，图书浏览次数
*/
create table Book
(
  b_id                int primary key not null auto_increment,
  b_name              nvarchar(40)    not null,
  b_author            nvarchar(60)    not null,
  b_publishing        nvarchar(20),
  b_bookTag           int,
  b_score             varchar(30),
  b_ISBN              varchar(20),
  b_intime            varchar(20),
  b_descripation      text,
  author_descripation text,
  b_photo             nvarchar(100),
  b_times             int default 0,
  b_downLink          nvarchar(100),
  b_look              int default 100,
  foreign key (b_bookTag) references BookType (bt_id) on delete cascade on UPDATE cascade
) ENGINE = InnoDB
  AUTO_INCREMENT = 1000
  DEFAULT CHARSET = utf8;
# 为图书名字和作者添加索引 加快查询速度
# alter  table  Book add index (b_author);
# alter  table  Book add index (b_id);
# alter  table  Book add index (b_name);

select count(*) as num, bt_name as name
from booktype
       inner join Book B on BookType.bt_id = B.b_bookTag
group by bt_id;

# alter table Book modify column b_name nvarchar(40);
# set  foreign_key_checks =1;
# drop table  Book;
/* 6创建图书评论表
     图书编号，用户ID，评论内容，评论时间,并添加索引
 */

create table bookCommit
(
  bc_id    int primary key not null auto_increment,
  b_id     int,
  u_id     varchar(10),
  comm     text,
  commtime varchar(50),
  foreign key (b_id) references book(b_id) on UPDATE cascade  on delete cascade ,
  foreign key (u_id) references user(u_id) on update  cascade  on  delete  cascade
)ENGINE = InnoDB
 AUTO_INCREMENT = 10000
 DEFAULT CHARSET = utf8;
alter table bookCommit add index (b_id,u_id);
alter table bookCommit add index (b_id);




# select  * from  Book order by b_score desc
select d_name as name,count(*) as num
from Duty
       inner join User U on Duty.d_id = U.u_typeid
group by d_id;
select u_id as uId,u_name as uName,u_phone as uPhone,u_email as uEmail,d_name as uTypeid
from duty
       inner join user u on duty.d_id = u.u_typeid;
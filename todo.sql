/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : todo

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-08-04 22:22:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(20) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '宇智波鼬');
INSERT INTO `users` VALUES ('2', '宇智波佐助');
INSERT INTO `users` VALUES ('3', '止水');
INSERT INTO `users` VALUES ('4', '带土');
INSERT INTO `users` VALUES ('5', '李世民');
INSERT INTO `users` VALUES ('6', '不问世事只求天下太平');
INSERT INTO `users` VALUES ('7', '当年明月');

-- ----------------------------
-- Table structure for weixin
-- ----------------------------
DROP TABLE IF EXISTS `weixin`;
CREATE TABLE `weixin` (
  `wx_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wx_name` varchar(20) DEFAULT '',
  `gf_counts` char(20) DEFAULT '',
  `reg_counts` char(20) DEFAULT '',
  `reg_where` char(20) DEFAULT '',
  `m_in_counts` char(20) DEFAULT '',
  `created_time` char(20) DEFAULT '',
  `user_id` int(11) DEFAULT '0',
  PRIMARY KEY (`wx_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of weixin
-- ----------------------------
INSERT INTO `weixin` VALUES ('1', 'u001', '500', '12', '??', '5', '121212', '1');
INSERT INTO `weixin` VALUES ('2', 'u002', '600', '22', '??', '6', '121212', '1');
INSERT INTO `weixin` VALUES ('3', 'z001', '200', '23', '??', '3', '23232', '2');
INSERT INTO `weixin` VALUES ('4', 'z002', '600', '33', '??', '5', '23232', '2');
INSERT INTO `weixin` VALUES ('5', 'z001', '700', '50', '//', '23', '1111', '3');
INSERT INTO `weixin` VALUES ('6', 'd001', '255', '23', '<<', '23', '111', '4');
INSERT INTO `weixin` VALUES ('7', 'l001', '500', '22', '11', '3', '', '5');
INSERT INTO `weixin` VALUES ('8', 'l002', '700', '66', '22', '3', '', '5');
INSERT INTO `weixin` VALUES ('9', 'b001', '400', '22', '11', '00', '00', '6');
INSERT INTO `weixin` VALUES ('10', 'd001', '500', '22', '??', '22', '', '7');

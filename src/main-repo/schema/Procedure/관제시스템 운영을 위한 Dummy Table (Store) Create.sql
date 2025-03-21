/*
 Navicat Premium Data Transfer

 Source Server         : bjbarkNAS
 Source Server Type    : MariaDB
 Source Server Version : 100311
 Source Host           : bjbark.synology.me:3307
 Source Schema         : angel

 Target Server Type    : MariaDB
 Target Server Version : 100311
 File Encoding         : 65001

 Date: 27/05/2019 18:05:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stor
-- ----------------------------
DROP TABLE IF EXISTS `stor`;
CREATE TABLE `stor`  (
  `stor_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '매장ID',
  `ctrl_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '관제ID',
  `hq_grp` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '본사그룹',
  `hq_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '본사ID',
  `stor_grp` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장그룹',
  `stor_nm` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장명',
  `stor_gb` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장구분',
  `wrhs_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '창고ID',
  `cust_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '거래처ID',
  `sale_mngt_gb` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매출관리구분',
  `pri_no` int(11) NULL DEFAULT NULL COMMENT '단가번호',
  `rnd_gb` int(11) NULL DEFAULT NULL COMMENT '반올림구분',
  `stor_sts` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장상태',
  `warn_msg` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '경고메시지',
  `deli_day` int(11) NULL DEFAULT NULL COMMENT '배송일',
  `stor_st_tm` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장시작시간',
  `stor_end_tm` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장종료시간',
  `stor_st_tm_sat` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장시작시간토요일',
  `stor_end_tm_sat` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장종료시간토요일',
  `stor_st_tm_sun` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장시작시간일요일',
  `stor_end_tm_sun` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장종료시간일요일',
  `deli_day_web` int(11) NULL DEFAULT NULL COMMENT '배송일웹',
  `small_end_tm` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '쇼핑몰종료시간',
  `small_cert_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '쇼핑몰인증번호',
  `biz_gb` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업구분',
  `biz_no` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업번호',
  `biz_nm` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업명',
  `biz_type` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '업태',
  `biz_kind` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '업종',
  `biz_owner` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업장 대표자',
  `biz_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업이메일',
  `biz_tel_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업전화번호',
  `biz_hp_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업휴대폰',
  `biz_fax_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업팩스번호',
  `biz_zip_cd` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업장우편번호',
  `biz_addr_1` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업주소1',
  `biz_addr_2` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업주소2',
  `biz_state` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업주소_시도',
  `biz_city` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업주소_군구',
  `biz_dong` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업주소_읍면동',
  `zip_cd` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '우편번호',
  `state` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '주소_시도',
  `city` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '주소_군구',
  `dong` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '주소_읍면동',
  `addr_1` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '주소1',
  `addr_2` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '주소2',
  `map_img` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '지도이미지',
  `map_url` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '지도URL',
  `map_vw` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '지도뷰',
  `map_zone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '지도구역',
  `map_area` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '지도면적',
  `info_tel_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '정보전화번호',
  `fee_type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '수수료타입',
  `fee_rt` decimal(6, 3) NULL DEFAULT NULL COMMENT '수수료율',
  `tax_type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '세율 타입',
  `tax_rt` decimal(6, 3) NULL DEFAULT NULL COMMENT '적용세율',
  `bnkbk_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '계좌ID',
  `pnt_type` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '포인트타입',
  `pnt_rt` decimal(6, 3) NULL DEFAULT NULL COMMENT '포인트율',
  `min_use_pnt` decimal(10, 0) NULL DEFAULT NULL COMMENT '최소사용포인트',
  `cash_pnt_rt` decimal(6, 3) NULL DEFAULT NULL COMMENT '현금포인트율',
  `card_pnt_rt` decimal(6, 3) NULL DEFAULT NULL COMMENT '카드포인트율',
  `epo_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '수발주ID',
  `sv_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'SVID',
  `email_cmpn_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '이메일회사ID',
  `email_host` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '이메일호스트',
  `email_port` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '이메일포트',
  `email_acct` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '이메일계정',
  `email_pwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '이메일암호',
  `small_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '쇼핑몰ID',
  `sms_cmpn_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'SMS회사ID',
  `sms_cmpn_cd` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'SMS회사코드',
  `fax_cmpn_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '팩스회사ID',
  `fax_cmpn_cd` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '팩스회사코드',
  `nts_id` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '국세청ID',
  `nts_cd` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'NTS코드',
  `stk_clos_yyyymm` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '재고마감년월',
  `vndr_clos_yyyymm` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '벤더마감년월',
  `clnt_clos_yyyymm` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '고객마감년월',
  `dmpp_clos_yyyymm` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '고지서마감년월',
  `erp_chain` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ERP체인',
  `erp_idx` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ERP인덱스',
  `erp_inf_sts` int(11) NULL DEFAULT NULL COMMENT 'ERP인터페이스상태',
  `stamp_url` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '인감URL',
  `bizarea_pht` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사업장사진',
  `mst_img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '대표이미지',
  `cmpn_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '회사ID',
  `stor_db` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매장DB',
  `sale_vat_incl_yn` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매출부가세포함여부',
  `pur_vat_incl_yn` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '매입부가세포함여부',
  `usr_memo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '사용자메모',
  `sys_memo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '시스템메모',
  `prnt_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '상위 ID',
  `row_lvl` int(11) NOT NULL DEFAULT 0 COMMENT 'ROW레벨',
  `row_ord` int(11) NOT NULL DEFAULT 0 COMMENT 'ROW순서',
  `row_sts` int(11) NOT NULL DEFAULT 0 COMMENT 'ROW상태',
  `row_clos` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '마감여부',
  `find_nm` varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '찾기명',
  `upt_usr_nm` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '수정사용자명',
  `upt_ip` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '수정IP',
  `upt_dttm` datetime(0) NULL DEFAULT NULL COMMENT '수정일시',
  `upt_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '수정ID',
  `upt_ui` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '수정UI',
  `crt_usr_nm` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '생성사용자명',
  `crt_ip` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '생성IP',
  `crt_dttm` datetime(0) NULL DEFAULT NULL COMMENT '생성일시',
  `crt_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '생성ID',
  `crt_ui` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '생성UI',
  PRIMARY KEY (`stor_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stor
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;

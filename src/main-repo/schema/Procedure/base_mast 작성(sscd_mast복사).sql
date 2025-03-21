/*

delete from base_mast;

call  gen_code_mast('N1000WINFO');

select * from base_mast;

이 작업은 테스트 자료 작성 엑셀 파일에서 sscd_mast를작성하여 등록한 후 작업 하여야 한다. 
엑셀 파일을 등록하면 sysm_memo에 등록을 위한 자료가 등록된다. 



*/



drop PROCEDURE `gen_code_mast`;

CREATE PROCEDURE `gen_code_mast`(
   _hq_id  varchar(50)
)
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE vRowCount INT DEFAULT 0 ;
  
  
  DECLARE _curcnt int DEFAULT 0;  
  DECLARE v_finished INTEGER DEFAULT 0;  
  
  DECLARE _sscd_code  varchar(50);
  DECLARE _cnt        int;
  DECLARE _c1_code  varchar(50);
  DECLARE _c1_name  varchar(50);
  DECLARE _c2_code  varchar(50);
  DECLARE _c2_name  varchar(50);
  DECLARE _c3_code  varchar(50);
  DECLARE _c3_name  varchar(50);
  DECLARE _c4_code  varchar(50);
  DECLARE _c4_name  varchar(50);
  DECLARE _c5_code  varchar(50);
  DECLARE _c5_name  varchar(50);
  DECLARE _c6_code  varchar(50);
  DECLARE _c6_name  varchar(50);
  DECLARE _c7_code  varchar(50);
  DECLARE _c7_name  varchar(50);
  DECLARE _c8_code  varchar(50);
  DECLARE _c8_name  varchar(50);
  DECLARE _c9_code  varchar(50);
  DECLARE _c9_name  varchar(50);
  DECLARE _c10_code  varchar(50);
  DECLARE _c10_name  varchar(50);
  DECLARE _c11_code  varchar(50);
  DECLARE _c11_name  varchar(50);
  DECLARE _c12_code  varchar(50);
  DECLARE _c12_name  varchar(50);
  DECLARE _c13_code  varchar(50);
  DECLARE _c13_name  varchar(50);
  DECLARE _c14_code  varchar(50);
  DECLARE _c14_name  varchar(50);
  DECLARE _c15_code  varchar(50);
  DECLARE _c15_name  varchar(50);
  
  DECLARE cur1 CURSOR for
        select sscd_code, CHAR_LENGTH(sysm_memo) - CHAR_LENGTH(REPLACE(sysm_memo,'|','')) + 1 as cnt
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',1),'|',-1),'=',1)  as c1_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',1),'|',-1),'=',-1) ,1,60) as c1_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',2),'|',-1),'=',1)  as c2_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',2),'|',-1),'=',-1) ,1,60) as c2_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',3),'|',-1),'=',1)  as c3_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',3),'|',-1),'=',-1) ,1,60) as c3_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',4),'|',-1),'=',1)  as c4_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',4),'|',-1),'=',-1) ,1,60) as c4_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',5),'|',-1),'=',1)  as c5_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',5),'|',-1),'=',-1) ,1,60) as c5_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',6),'|',-1),'=',1)  as c6_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',6),'|',-1),'=',-1) ,1,60) as c6_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',7),'|',-1),'=',1)  as c7_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',7),'|',-1),'=',-1) ,1,60) as c7_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',8),'|',-1),'=',1)  as c8_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',8),'|',-1),'=',-1) ,1,60) as c8_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',9),'|',-1),'=',1)  as c9_code,  substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',9),'|',-1),'=',-1) ,1,60) as c9_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',10),'|',-1),'=',1) as c10_code, substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',0),'|',-1),'=',-1) ,1,60) as c10_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',11),'|',-1),'=',1) as c11_code, substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',11),'|',-1),'=',-1),1,60) as c11_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',12),'|',-1),'=',1) as c12_code, substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',12),'|',-1),'=',-1),1,60) as c12_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',13),'|',-1),'=',1) as c13_code, substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',13),'|',-1),'=',-1),1,60) as c13_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',14),'|',-1),'=',1) as c14_code, substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',14),'|',-1),'=',-1),1,60) as c14_name
            ,  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',15),'|',-1),'=',1) as c15_code, substring(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(sysm_memo,'|',15),'|',-1),'=',-1),1,60) as c15_name
      
      from sscd_mast;
	  
 DECLARE CONTINUE HANDLER 
    FOR NOT FOUND SET v_finished = 1;
 OPEN cur1; 


 get_field : LOOP
    FETCH cur1 INTO   
	          _sscd_code 
	        , _cnt       
	        , _c1_code 
	        , _c1_name 
	        , _c2_code 
	        , _c2_name 
	        , _c3_code 
	        , _c3_name 
	        , _c4_code 
	        , _c4_name 
	        , _c5_code 
	        , _c5_name 
	        , _c6_code 
	        , _c6_name 
	        , _c7_code 
	        , _c7_name 
	        , _c8_code 
	        , _c8_name 
	        , _c9_code 
	        , _c9_name 
	        , _c10_code  
	        , _c10_name  
	        , _c11_code  
	        , _c11_name  
	        , _c12_code  
	        , _c12_name  
	        , _c13_code  
	        , _c13_name  
	        , _c14_code  
	        , _c14_name  
	        , _c15_code  
	        , _c15_name  ;
    IF v_finished = 1 THEN 
       LEAVE get_field;
    END IF;
    if    _cnt >=  1  and length(_c1_code) <= 4 and length(_c1_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c1_code), _hq_id, _c1_code, _c1_name,length(_c1_code), _sscd_code, 2, '0','0',concat(_c1_code, ' ', _c1_name);
    end if;		  
    if    _cnt >=  2 and length(_c2_code) <= 4 and length(_c2_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c2_code), _hq_id, _c2_code, _c2_name,length(_c2_code), _sscd_code, 2, '0','0',concat(_c2_code, ' ', _c2_name);
    end if;		  
    if    _cnt >=  3 and length(_c3_code) <= 4 and length(_c3_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c3_code), _hq_id, _c3_code, _c3_name,length(_c3_code), _sscd_code, 2, '0','0',concat(_c3_code, ' ' ,_c3_name);
    end if;		  
    if    _cnt >=  4 and length(_c4_code) <= 4 and length(_c4_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c4_code), _hq_id, _c4_code, _c4_name,length(_c4_code), _sscd_code, 2, '0','0',concat(_c4_code, ' ' ,_c4_name);
    end if;		  
    if    _cnt >=  5 and length(_c5_code) <= 4 and length(_c5_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c5_code), _hq_id, _c5_code, _c5_name,length(_c5_code), _sscd_code, 2, '0','0',concat(_c5_code, ' ', _c5_name);
    end if;		  
    if    _cnt >=  6 and length(_c6_code) <= 4 and length(_c6_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c6_code), _hq_id, _c6_code, _c6_name,length(_c6_code), _sscd_code, 2, '0','0',concat(_c6_code, ' ', _c6_name);
    end if;		  
    if    _cnt >=  7 and length(_c7_code) <= 4 and length(_c7_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c7_code), _hq_id, _c7_code, _c7_name,length(_c7_code), _sscd_code, 2, '0','0',concat(_c7_code, ' ', _c7_name);
    end if;		  
    if    _cnt >=  8 and length(_c8_code) <= 4 and length(_c8_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c8_code), _hq_id, _c8_code, _c8_name,length(_c8_code), _sscd_code, 2, '0','0',concat(_c8_code, ' ', _c8_name);
    end if;		  
    if    _cnt >=  9 and length(_c9_code) <= 4 and length(_c9_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c9_code), _hq_id, _c9_code, _c9_name,length(_c9_code), _sscd_code, 2, '0','0',concat(_c9_code, ' ', _c9_name);
    end if;		  
    if    _cnt >=  10 and length(_c10_code) <= 4 and length(_c10_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c10_code), _hq_id, _c10_code, _c10_name,length(_c10_code), _sscd_code, 2, '0','0',concat(_c10_code, ' ', _c10_name);
    end if;		  
    if    _cnt >=  11 and length(_c11_code) <= 4 and length(_c11_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c11_code), _hq_id, _c11_code, _c11_name,length(_c11_code), _sscd_code, 2, '0','0',concat(_c11_code, ' ', _c11_name);
    end if;		  
    if    _cnt >=  12 and length(_c12_code) <= 4 and length(_c12_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c12_code), _hq_id, _c12_code, _c12_name,length(_c12_code), _sscd_code, 2, '0','0',concat(_c12_code, ' ', _c12_name);
    end if;		  
    if    _cnt >=  13 and length(_c13_code) <= 4 and length(_c13_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c13_code), _hq_id, _c13_code, _c13_name,length(_c13_code), _sscd_code, 2, '0','0',concat(_c13_code, ' ', _c13_name);
    end if;		  
    if    _cnt >=  14 and length(_c14_code) <= 4 and length(_c14_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c14_code), _hq_id, _c14_code, _c14_name,length(_c14_code), _sscd_code, 2, '0','0',concat(_c14_code, ' ', _c14_name);
    end if;		  
    if    _cnt >=  15 and length(_c15_code) <= 4 and length(_c15_code) > 1  then
	      insert into base_mast (BASE_IDCD,HQOF_IDCD,BASE_CODE,BASE_NAME,CODE_LENG,PRNT_IDCD,LINE_LEVL,LINE_STAT,LINE_CLOS,FIND_NAME)
		  select concat(_sscd_code, _c15_code), _hq_id, _c15_code, _c15_name,length(_c15_code), _sscd_code, 2, '0','0',concat(_c15_code, ' ', _c15_name);
    end if;		  

  END LOOP get_field;
  CLOSE cur1;
end
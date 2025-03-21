

/*
call auto_holyday('2019')
select * from hldy_mast
*/

drop procedure if exists auto_holyday ; 


CREATE procedure `auto_holyday`(
       _year varchar(50)
    )  
begin	

delete from hldy_mast
where    sysm_memo = 'auto_holyday'
;

insert into hldy_mast (
         bzpl_idcd
       , hldy_date
       , dywk_dvcd
       , hldy_type_dvcd
       , hldy_name
       , stnd_hldy_yorn
       , remk_text
       , user_memo
       , sysm_memo
       , prnt_idcd
       , line_levl
       , line_ordr
       , line_stat
       , line_clos
       , find_name
       , updt_user_name
       , updt_ipad
       , updt_dttm
       , updt_idcd
       , updt_urif
       , crte_user_name
       , crte_ipad
       , crte_dttm
       , crte_idcd
       , crte_urif
)
WITH CAL AS (
SELECT ym
     , concat(ym,lpad(MIN(CASE dw WHEN 1 THEN d END),2,'0')) Sun
     , concat(ym,lpad(MIN(CASE dw WHEN 2 THEN d END),2,'0')) Mon
     , concat(ym,lpad(MIN(CASE dw WHEN 3 THEN d END),2,'0')) Tue
     , concat(ym,lpad(MIN(CASE dw WHEN 4 THEN d END),2,'0')) Wed
     , concat(ym,lpad(MIN(CASE dw WHEN 5 THEN d END),2,'0')) Thu
     , concat(ym,lpad(MIN(CASE dw WHEN 6 THEN d END),2,'0')) Fri
     , concat(ym,lpad(MIN(CASE dw WHEN 7 THEN d END),2,'0')) Sat
  FROM (SELECT date_format(dt,'%Y%m') ym
             , Week(dt) w
             , Day(dt) d
             , DayofWeek(dt) dw
          FROM (SELECT CONCAT(y, '0101') + INTERVAL a*100 + b*10 + c DAY dt
                  FROM (SELECT 0 a
                        UNION ALL SELECT 1
                        UNION ALL SELECT 2
                        UNION ALL SELECT 3
                        ) a
                     , (SELECT 0 b
                        UNION ALL SELECT 1
                        UNION ALL SELECT 2
                        UNION ALL SELECT 3
                        UNION ALL SELECT 4
                        UNION ALL SELECT 5
                        UNION ALL SELECT 6
                        UNION ALL SELECT 7
                        UNION ALL SELECT 8
                        UNION ALL SELECT 9
                        ) b
                     , (SELECT 0 c
                        UNION ALL SELECT 1
                        UNION ALL SELECT 2
                        UNION ALL SELECT 3
                        UNION ALL SELECT 4
                        UNION ALL SELECT 5
                        UNION ALL SELECT 6
                        UNION ALL SELECT 7
                        UNION ALL SELECT 8
                        UNION ALL SELECT 9
                        ) c
                     , (SELECT _year y) d
                 WHERE a*100 + b*10 + c < DayOfYear(CONCAT(y, '1231'))
                ) a
        ) a
 GROUP BY ym, w
 )
 
 SELECT 
        a.bzpl_idcd   as bzpl_idcd
      , a.hldy_date   as hldy_date
	  , dayofweek(a.hldy_date) as dywk_dvcd
      , '1'           as hldy_type_dvcd
      , a.hldy_name   as hldy_name
      , '1'           as stnd_hldy_yorn
      , null          as remk_text
      , null          as user_memo
      , 'auto_holyday'   as sysm_memo
      , null          as prnt_idcd
      , 1             as line_levl
      , 1             as line_ordr
      , '0'           as line_stat
      , '0'           as line_clos
      , concat(a.hldy_date, ' ' , a.hldy_name)   as find_name
      , null         as updt_user_name
      , null         as updt_ipad
      , null         as updt_dttm
      , null         as updt_idcd
      , null         as updt_urif
      , null         as crte_user_name
      , null         as crte_ipad
      , date_format(now(), '%Y%m%d%H%I%S')   as crte_dttm
      , null        as crte_idcd
      , null        as crte_urif
 FROM (
      SELECT b.bzpl_idcd   as bzpl_idcd , a.sat                  as hldy_date      , '토요일'        as hldy_name
      FROM   CAL a, bzpl_mast b
      WHERE  SAT IS NOT NULL
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , a.sun                  as hldy_date      , '일요일'        as hldy_name
      FROM   CAL a, bzpl_mast b
      WHERE  SUN IS NOT NULL
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'0101')   as hldy_date      , '신정'          as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'0301')   as hldy_date      , '삼일절'        as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'0501')   as hldy_date      , '근로자의날'      as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'0505')   as hldy_date      , '어린이날'      as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'0606')   as hldy_date      , '현충일'       as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'0815')   as hldy_date      , '광복절'       as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'1003')   as hldy_date      , '개천절'       as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'1009')   as hldy_date      , '한글날'       as hldy_name
      FROM   bzpl_mast b
      union all
      SELECT b.bzpl_idcd   as bzpl_idcd  , concat(_year,'1225')   as hldy_date      , '성탄절'       as hldy_name
      FROM   bzpl_mast b
    ) a
 ON DUPLICATE KEY UPDATE 
        dywk_dvcd   = dayofweek(a.hldy_date) 
      , hldy_type_dvcd = '1'
      , hldy_name      = a.hldy_name
      , stnd_hldy_yorn = '1'           
      , sysm_memo      = 'auto_holyday' 
      , find_name      = concat(a.hldy_date, ' ' , a.hldy_name) 
      , updt_dttm      = date_format(now(), '%Y%m%d%H%I%S')
;
end
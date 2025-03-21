

/*
call holyday_insert('임시휴가','20190101','20190120')
select * from hldy_mast
delete from hldy_mast where hldy_name = '임시휴가'
*/

drop procedure if exists holyday_insert ; 


CREATE procedure `holyday_insert`(
       _hldy_name varchar(50),
	   _fr_date   varchar(8),
	   _to_date    varchar(8)
    )  
begin	
declare _year varchar(4);

set _year = substring(_fr_date,1,4)
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
        b.bzpl_idcd   as bzpl_idcd
      , a.yyyymmdd    as hldy_date
      , a.dywk_dvcd   as dywk_dvcd
      , '1'           as hldy_type_dvcd
      , _hldy_name    as hldy_name
      , '0'           as stnd_hldy_yorn
      , null          as remk_text
      , null          as user_memo
      , null          as sysm_memo
      , null          as prnt_idcd
      , 1             as line_levl
      , 1             as line_ordr
      , '0'           as line_stat
      , '0'           as line_clos
      , concat(a.yyyymmdd, ' ' , _hldy_name)   as find_name
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
 FROM bzpl_mast b,
      (          select sun as yyyymmdd, '1' as dywk_dvcd from cal where sun is not null
	   union all select mon as yyyymmdd, '2' as dywk_dvcd  from cal where mon is not null
	   union all select tue as yyyymmdd, '3' as dywk_dvcd  from cal where tue is not null
	   union all select wed as yyyymmdd, '4' as dywk_dvcd  from cal where wed is not null
	   union all select thu as yyyymmdd, '5' as dywk_dvcd  from cal where thu is not null
	   union all select fri as yyyymmdd, '6' as dywk_dvcd  from cal where fri is not null
	   union all select sat as yyyymmdd, '7' as dywk_dvcd  from cal where sat is not null
	   ) a
 WHERE a.yyyymmdd between _fr_date and _to_date
 ON DUPLICATE KEY UPDATE 
        dywk_dvcd      = a.dywk_dvcd
      , hldy_type_dvcd = '1'   
      , hldy_name      = _hldy_name 
      , stnd_hldy_yorn = '0'   
      , find_name      = concat(a.yyyymmdd, ' ' , _hldy_name) 
      , updt_dttm      = date_format(now(), '%Y%m%d%H%I%S') 
;
end
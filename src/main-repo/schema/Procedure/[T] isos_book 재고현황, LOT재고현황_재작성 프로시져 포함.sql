
/*
트리거 작동 여부를 확인하기 위한 자료 조정 테스트
*/


insert into isos_book (
       bzpl_idcd
     , invc_dvcd
     , invc_numb
     , line_seqn
     , invc_date
     , invc_orgn
     , wrhs_idcd
     , dept_idcd
     , drtr_idcd
     , cstm_dvcd
     , cstm_idcd
     , acct_bacd
     , item_idcd
     , item_code
     , unit_idcd
     , stnd_pric
     , vatx_incl_yorn
     , vatx_rate
     , qntt
     , pric
     , amnt
     , vatx
     , stok_qntt
     , stok_pric
     , stok_amnt
     , lott_numb
     , orig_invc_numb
     , orig_seqn
) 
select 
       bzpl_idcd
     , invc_dvcd
     , invc_numb
     , 4
     , invc_date
     , invc_orgn
     , wrhs_idcd
     , dept_idcd
     , drtr_idcd
     , cstm_dvcd
     , cstm_idcd
     , acct_bacd
     , item_idcd
     , item_code
     , unit_idcd
     , stnd_pric
     , vatx_incl_yorn
     , vatx_rate
     , qntt
     , pric
     , amnt
     , vatx
     , stok_qntt
     , stok_pric
     , stok_amnt
     , lott_numb
     , orig_invc_numb
     , orig_seqn
from isos_book
where bzpl_idcd = 'WINFOBZPLMAST001' and invc_dvcd = '2300' and invc_numb = '0001' and line_seqn = 1



-- ***********************************************************************************
--   LOT수불집계 테이블 재 작성
--    재고 현황과 수불 대장 불일치 발생 시 본 프로시져를 실행 함
--    재고현황 테이블(stok_mast)  내용을 모두 지우고 수불대장(isos_book)을 창고 및 자재별로 
--    집계하여 재고현황 테이블을 새로이 생성한다. 
--    by PBJ (2019.10.15)
--    call re_create_stok_mast
-- ***********************************************************************************
drop procedure if exists `re_create_stok_mast`;
CREATE PROCEDURE `re_create_stok_mast`()
begin
    declare _new_invc_numb    varchar(50);
    declare _wk_invc          varchar(50);
	declare _wk_seqn          integer;
    declare _invc_dvcd        varchar(4);
    declare _isos_dvcd        varchar(4);
    declare _fr_dt            varchar(10);
    declare _to_dt            varchar(10);
	declare _stor             varchar(50);
	declare _wrhs_idcd        varchar(50);

DECLARE _last_yyyymm   VARCHAR(50);

select date_format(now(),'%Y%m%d') into _to_dt
;
set  _wrhs_idcd = '@'
;

select ifnull(max(clos_yymm),'201812') into _last_yyyymm
from   isos_sum
where  clos_yymm < substring(_fr_dt,1,6)
and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
;		

select date_format(date_add(str_to_date(concat(_last_yyyymm,'01'),'%Y%m%d'), interval 1 month), '%Y%m%d') into _fr_dt
;

delete from stok_mast 
where  (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
;

insert into stok_mast (					
        wrhs_idcd      , item_idcd      , item_code      , acct_bacd
      , base_qntt      , base_amnt
      , istt_qntt      , istt_amnt
      , ostt_qntt      , ostt_amnt
      , stok_qntt      , stok_amnt
      , user_memo      , sysm_memo      , prnt_idcd      , line_stat
      , line_clos      , find_name      , crte_dttm
	)				
with base_stok   as (																						
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , sum(ifnull(a.base_qntt,0)) as base_qntt
					from (
                           select bzpl_idcd , wrhs_idcd , item_idcd 
	                            , base_qntt + istt_qntt - ostt_qntt as base_qntt
                           from   isos_sum 
	                       where  clos_yymm = _last_yyyymm
					       and    base_qntt + istt_qntt - ostt_qntt <> 0
                           and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                           union all 
	                       select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
			                      , case invc_dvcd when '1100' then a.qntt
					       	                       when '1200' then a.qntt
					       	                       when '1300' then a.qntt * -1
					       	                       when '1400' then a.qntt
					       	                       when '2100' then a.qntt * -1
					       	                       when '2200' then a.qntt * -1
					       	                       when '2300' then a.qntt * -1
					       	                       when '2400' then a.qntt * -1
					       						   else a.qntt  end as base_qntt
	                       from   isos_book a
	                       where  invc_date >= concat(_last_yyyymm , '31')
					       and    invc_date < _fr_dt
                           and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					) a
                    group by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                    ),
     istt_1100   as (/*구매입고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1100')  
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     istt_1200   as (/* 기타입고  */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1200')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     istt_1300   as (/*입고반품 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1300')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     move_1400   as (/* 이동입고  */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as move_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1400')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     move_2300   as (/* 이동출고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as move_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2300')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2100   as (/* 생산출고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2100')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2200   as (/* 기타출고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2200')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2400   as (/* 재고조정 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2400')
					and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     item       as (/* 품목정보(수불이 발생한 모든 품목코드를 발췌한다. */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, a.acct_bacd , a.item_code
					from (
	                       select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, i.acct_bacd, i.item_code
	                       from   isos_book a
					              left outer join item_mast i on a.item_idcd = i.item_idcd
	                       where  invc_date between _fr_dt and _to_dt
                           and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
					       group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , i.acct_bacd , i.item_code
					       union all
	                       select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, i.acct_bacd , i.item_code
	                       from   isos_sum a
					              left outer join item_mast i on a.item_idcd = i.item_idcd
	                       where  clos_yymm = _last_yyyymm
					       group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , i.acct_bacd , i.item_code
					) a 
			        group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , a.acct_bacd , a.item_code
					)
select  item.wrhs_idcd , item.item_idcd , item.item_code , item.acct_bacd
	 ,  sum(ifnull(base_stok.base_qntt,0))   as base_qntt
     ,  0 as base_amnt
	 ,  sum(ifnull(istt_1100.istt_qntt,0)) + sum(ifnull(istt_1200.istt_qntt,0)) + sum(ifnull(istt_1300.istt_qntt,0)) + sum(ifnull(move_1400.move_qntt,0)) as istt_qntt
	 ,  0 as istt_amnt
	 ,  sum(ifnull(ostt_2100.ostt_qntt,0)) + sum(ifnull(ostt_2200.ostt_qntt,0)) + sum(ifnull(ostt_2400.ostt_qntt,0)) + sum(ifnull(move_2300.move_qntt,0)) as ostt_qntt
     , 0 as ostt_amnt
	 ,  sum(ifnull(base_stok.base_qntt,0)) 
	 + (sum(ifnull(istt_1100.istt_qntt,0)) + sum(ifnull(istt_1200.istt_qntt,0)) + sum(ifnull(istt_1300.istt_qntt,0)) + sum(ifnull(move_1400.move_qntt,0)))
	 - (sum(ifnull(ostt_2100.ostt_qntt,0)) + sum(ifnull(ostt_2200.ostt_qntt,0)) + sum(ifnull(ostt_2400.ostt_qntt,0)) + sum(ifnull(move_2300.move_qntt,0))) as stok_qntt
     ,  0 as stok_amnt
     , null         , null             , null    , '0'
     , '0'          , concat(item.wrhs_idcd, ' ', item.item_idcd ,' ', item.item_code) as find_name 
	 , date_format(now(), '%Y%m%d%H%i%s')
from    item
        left outer join base_stok on item.wrhs_idcd = base_stok.wrhs_idcd and item.item_idcd = base_stok.item_idcd
        left outer join istt_1100 on item.wrhs_idcd = istt_1100.wrhs_idcd and item.item_idcd = istt_1100.item_idcd
        left outer join istt_1200 on item.wrhs_idcd = istt_1200.wrhs_idcd and item.item_idcd = istt_1200.item_idcd
        left outer join istt_1300 on item.wrhs_idcd = istt_1300.wrhs_idcd and item.item_idcd = istt_1300.item_idcd
        left outer join move_1400 on item.wrhs_idcd = move_1400.wrhs_idcd and item.item_idcd = move_1400.item_idcd
        left outer join move_2300 on item.wrhs_idcd = move_2300.wrhs_idcd and item.item_idcd = move_2300.item_idcd
        left outer join ostt_2100 on item.wrhs_idcd = ostt_2100.wrhs_idcd and item.item_idcd = ostt_2100.item_idcd
        left outer join ostt_2200 on item.wrhs_idcd = ostt_2200.wrhs_idcd and item.item_idcd = ostt_2200.item_idcd
        left outer join ostt_2400 on item.wrhs_idcd = ostt_2400.wrhs_idcd and item.item_idcd = ostt_2400.item_idcd
		left outer join item_mast on item.item_idcd = item_mast.item_idcd
group   by item.wrhs_idcd , item.item_idcd , item.item_code , item.acct_bacd
		
;	
end;


-- ***********************************************************************************
--    입출고 대장 트리거 (after Insert)
-- ***********************************************************************************
CREATE OR REPLACE 
TRIGGER ta_isos_book_insert
AFTER INSERT on isos_book
FOR EACH ROW   

begin
    DECLARE _istt_qntt decimal(15,0);
    DECLARE _ostt_qntt decimal(15,0);
    select case new.invc_dvcd 
	           when '1100' then new.qntt
			   when '1200' then new.qntt
			   when '1300' then new.qntt
			   when '1400' then new.qntt
			   else 0 end into _istt_qntt;
    select case new.invc_dvcd 
	           when '2100' then new.qntt
			   when '2200' then new.qntt
			   when '2300' then new.qntt
			   when '2400' then new.qntt
			   else 0 end into _ostt_qntt;
    if  new.qntt <> 0 then begin
        insert into stok_mast (wrhs_idcd , item_idcd , item_code , acct_bacd , base_qntt , base_amnt 
		                     , istt_qntt , istt_amnt , ostt_qntt , ostt_amnt , stok_qntt , stok_amnt
                             , line_stat , find_name , crte_dttm
			  )values (
	   		                  new.wrhs_idcd , new.item_idcd , new.item_code , new.acct_bacd , 0 , 0
                            , ifnull(_istt_qntt,0)
							, 0
                            , ifnull(_ostt_qntt,0)
							, 0
							, ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
                            , 0
                            , '0'
                            , null
							, crte_dttm = date_format(now(),'%Y%m%d%H%i%S')
			)		
	    on duplicate key update 
		                      acct_bacd = new.acct_bacd
							, item_code = new.item_code  
		                    , istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
							, ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
							, stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
							, stok_amnt = ifnull(stok_amnt,0) + ifnull(new.stok_amnt,0)
                            , line_stat = '0'
							, find_name = null
							, updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
		;		
       end;
	end if;   

end;


-- ***********************************************************************************
--
--    입출고 대장 트리거 (Delete) 
--
-- ***********************************************************************************
CREATE OR REPLACE 
TRIGGER ta_isos_book_delete
AFTER delete on isos_book
FOR EACH ROW   

begin
    DECLARE _istt_qntt decimal(15,0);
    DECLARE _ostt_qntt decimal(15,0);
    DECLARE _stok_qntt decimal(15,0);
    select case old.invc_dvcd 
	           when '1100' then old.qntt
			   when '1200' then old.qntt
			   when '1300' then old.qntt
			   when '1400' then old.qntt
			   else 0 end into _istt_qntt;
    select case old.invc_dvcd 
	           when '2100' then old.qntt
			   when '2200' then old.qntt
			   when '2300' then old.qntt
			   when '2400' then old.qntt
			   else 0 end into _ostt_qntt;
    select _istt_qntt * -1
	     , _ostt_qntt * -1
	     , old.stok_qntt * -1 
	into   _istt_qntt
	     , _ostt_qntt
	     , _stok_qntt;			   
	update stok_mast set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where wrhs_idcd = old.wrhs_idcd
    and   item_idcd = old.item_idcd	
	;		

end;


-- ***********************************************************************************
--
--    입출고 대장 트리거 (update) 
--
-- ***********************************************************************************
CREATE OR REPLACE 
TRIGGER ta_isos_book_update
AFTER update on isos_book
FOR EACH ROW   

begin
    DECLARE _istt_qntt decimal(15,0);
    DECLARE _ostt_qntt decimal(15,0);
    DECLARE _stok_qntt decimal(15,0);
    select case old.invc_dvcd 
	           when '1100' then old.qntt
			   when '1200' then old.qntt
			   when '1300' then old.qntt
			   when '1400' then old.qntt
			   else 0 end into _istt_qntt;
    select case old.invc_dvcd 
	           when '2100' then old.qntt
			   when '2200' then old.qntt
			   when '2300' then old.qntt
			   when '2400' then old.qntt
			   else 0 end into _ostt_qntt;
    select _istt_qntt * -1
	     , _ostt_qntt * -1
	     , old.stok_qntt * -1 
	into   _istt_qntt
	     , _ostt_qntt
	     , _stok_qntt;			   
	update stok_mast set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where wrhs_idcd = old.wrhs_idcd
    and   item_idcd = old.item_idcd	
	;		
    select case new.invc_dvcd 
	           when '1100' then new.qntt
			   when '1200' then new.qntt
			   when '1300' then new.qntt
			   when '1400' then new.qntt
			   else 0 end into _istt_qntt;
    select case new.invc_dvcd 
	           when '2100' then new.qntt
			   when '2200' then new.qntt
			   when '2300' then new.qntt
			   when '2400' then new.qntt
			   else 0 end into _ostt_qntt;
    if  new.qntt <> 0 then begin
        insert into stok_mast (wrhs_idcd , item_idcd , item_code , acct_bacd , base_qntt , base_amnt 
		                     , istt_qntt , istt_amnt , ostt_qntt , ostt_amnt , stok_qntt , stok_amnt
                             , line_stat , find_name , crte_dttm
			  )values (
	   		                  new.wrhs_idcd , new.item_idcd , new.item_code , new.acct_bacd , 0 , 0
                            , ifnull(_istt_qntt,0)
							, 0
                            , ifnull(_ostt_qntt,0)
							, 0
							, ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
                            , 0
                            , '0'
                            , null
							, crte_dttm = date_format(now(),'%Y%m%d%H%i%S')
			)		
	    on duplicate key update 
		                      acct_bacd = new.acct_bacd
							, item_code = new.item_code  
		                    , istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
							, ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
							, stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
                            , line_stat = '0'
							, find_name = null
							, updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
		;		
       end;
	end if;   

end;










-- ***********************************************************************************
--   LOT수불집계 테이블 재 작성
--    LOT수불집계와 수불 대장 불일치 발생 시 본 프로시져를 실행 함
--    LOT 수불 집계 테이블(lot_isos_sum)  내용을 모두 지우고 LOT수불대장(lot_isos_book)을 LOT번호별로 
--    집계하여 LOT 수불집계 테이블을 새로이 생성한다. 
--    by PBJ (2019.10.15)
--    call re_create_lot_isos_sum
-- ***********************************************************************************

drop procedure if exists `re_create_lot_isos_sum`;
CREATE PROCEDURE `re_create_lot_isos_sum`()
begin
    declare _new_invc_numb    varchar(50);
    declare _wk_invc          varchar(50);
	declare _wk_seqn          integer;
    declare _invc_dvcd        varchar(4);
    declare _isos_dvcd        varchar(4);
	declare _stor             varchar(50);
	/*  기존 자료를 모두 지운다...    */
	delete from lot_isos_sum
	;
	insert into lot_isos_sum (
           lott_numb      , bzpl_idcd      , wrhs_idcd      , item_idcd      , istt_date
         , ostt_date      , istt_qntt      , ostt_qntt      , chge_qntt      , stok_qntt
         , tagg_dvcd      
         , user_memo      , sysm_memo      , prnt_idcd      , line_stat
         , line_clos      , find_name      , crte_dttm
		) 
	select s.lott_numb   
	     , max(s.bzpl_idcd) as bzpl_idcd
		 , max(s.wrhs_idcd) as wrhs_idcd
		 , max(s.item_idcd) as item_idcd
		 , max(s.istt_date) as istt_date
		 , max(s.ostt_date) as ostt_date
		 , sum(ifnull(s.istt_qntt,0)) as istt_qntt
		 , sum(ifnull(s.ostt_qntt,0)) as ostt_qntt
		 , sum(ifnull(s.chge_qntt,0)) as chge_qntt
		 , sum(ifnull(s.istt_qntt,0)) - sum(ifnull(s.ostt_qntt,0)) - sum(ifnull(s.chge_qntt,0)) as stok_qntt
		 , null
   	     , null         , null             , null    , '0'
		 , '0'          , concat(lott_numb, ' ', max(item_idcd)) as find_name 
		 , date_format(now(), '%Y%m%d%H%i%s')
    from (select lott_numb , bzpl_idcd , wrhs_idcd , item_idcd 
               , case when isos_dvcd in ('1101', '2101', '2102', '2103', '2104'        )  then invc_date else null end  as istt_date
               , case when isos_dvcd in ('1101', '2101', '2102', '2103', '2104'        )  then qntt      else 0    end  as istt_qntt
               , case when isos_dvcd in ('1201', '2201', '2202', '2203', '2204', '2205')  then invc_date else null end  as ostt_date
               , case when isos_dvcd in ('1201', '2201', '2202', '2203', '2204'        )  then qntt      else 0    end  as ostt_qntt
               , case when isos_dvcd in ('2205'                                        )  then qntt      else 0    end  as chge_qntt
          from   lot_isos_book 
		  ) s
    group by s.lott_numb      	
	;
end;




-- ***********************************************************************************
--
--    LOT수불대장 트리거  (update) 
--
-- ***********************************************************************************
CREATE OR REPLACE 
TRIGGER ta_lot_isos_book_update
AFTER update on lot_isos_book
FOR EACH ROW   

begin
    DECLARE _istt_qntt decimal(15,0);
    DECLARE _ostt_qntt decimal(15,0);
    DECLARE _stok_qntt decimal(15,0);
    DECLARE _istt_date varchar(8);
    DECLARE _ostt_date varchar(8);
    select case old.isos_dvcd 
	           when '1101' then old.qntt  /* 매입      */
			   when '2101' then old.qntt  /* 생산입고  */
			   when '2102' then old.qntt  /* 반품입고  */
			   when '2103' then old.qntt  /* 기타입고  */
			   when '2104' then old.qntt  /* 이동입고  */
			   else 0 end into _istt_qntt;
    select case old.isos_dvcd 
	           when '1201' then old.qntt  /* 생산      */
			   when '2201' then old.qntt  /* 판매      */ 
			   when '2202' then old.qntt  /* 자가소비  */
			   when '2203' then old.qntt  /* 기타출고  */
			   when '2204' then old.qntt  /* 이동출고  */
			   when '2205' then old.qntt  /* 재고조정  */
			   else 0 end into _ostt_qntt;
    select _istt_qntt * -1
	     , _ostt_qntt * -1
	     , (_istt_qntt - _ostt_qntt) * -1 
	into   _istt_qntt
	     , _ostt_qntt
	     , _stok_qntt;			   
	update lot_isos_sum set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_stok_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where lott_numb = old.lott_numb
	;		
	update lot_isos_sum set
		   stok_qntt = ifnull(istt_qntt,0) - ifnull(ostt_qntt,0) + ifnull(chge_qntt,0)
	where  lott_numb = old.lott_numb
	;
    select case new.isos_dvcd 
	           when '1101' then new.qntt  /* 매입      */
			   when '2101' then new.qntt  /* 생산입고  */
			   when '2102' then new.qntt  /* 반품입고  */
			   when '2103' then new.qntt  /* 기타입고  */
			   when '2104' then new.qntt  /* 이동입고  */
			   else 0 end into _istt_qntt;
    select case new.isos_dvcd 
	           when '1201' then new.qntt  /* 생산      */
			   when '2201' then new.qntt  /* 판매      */ 
			   when '2202' then new.qntt  /* 자가소비  */
			   when '2203' then new.qntt  /* 기타출고  */
			   when '2204' then new.qntt  /* 이동출고  */
			   when '2205' then new.qntt  /* 재고조정  */
			   else 0 end into _ostt_qntt;
	set _istt_date = null;
	set _ostt_date = null;
	if  _istt_qntt <> 0 then set _istt_date = new.invc_date; end if;
	if  _ostt_qntt <> 0 then set _ostt_date = new.invc_date; end if;
    if  new.qntt <> 0 then begin
        insert into lot_isos_sum (
                              lott_numb    , bzpl_idcd    , wrhs_idcd    , item_idcd    
			                , istt_date    , ostt_date
                            , istt_qntt    , ostt_qntt
                            , chge_qntt    , stok_qntt
                            , tagg_dvcd
                            , line_stat    , find_name   , crte_dttm
			  )values (
	   		                  new.lott_numb , new.bzpl_idcd , new.wrhs_idcd , new.item_idcd
							, _istt_date
							, _ostt_date
                            , ifnull(_istt_qntt,0)  , ifnull(_ostt_qntt,0)
							, 0             , ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
							, null
                            , '0'
                            , null
							, crte_dttm = date_format(now(),'%Y%m%d%H%i%S')
			)		
	    on duplicate key update 
		                      bzpl_idcd = new.bzpl_idcd
							, wrhs_idcd = new.wrhs_idcd 
							, item_idcd = new.item_idcd 
							, istt_date = case when _istt_qntt = 0 then istt_date else new.invc_date end   
							, ostt_date = case when _ostt_qntt = 0 then ostt_date else new.invc_date end   
		                    , istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
							, ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
							, stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
							, updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
		;		
	    update lot_isos_sum set
		       stok_qntt = ifnull(istt_qntt,0) - ifnull(ostt_qntt,0) + ifnull(chge_qntt,0)
	    where  lott_numb = new.lott_numb
		;
       end;
	end if;   

end;



-- ***********************************************************************************
--   LOT수불대장 트리거 (after Insert)
-- ***********************************************************************************
CREATE OR REPLACE 
TRIGGER ta_lot_isos_book_insert
AFTER INSERT on lot_isos_book
FOR EACH ROW   

begin
    DECLARE _istt_qntt decimal(15,0);
    DECLARE _ostt_qntt decimal(15,0);
    DECLARE _istt_date varchar(8);
    DECLARE _ostt_date varchar(8);
    select case new.isos_dvcd 
	           when '1101' then new.qntt  /* 매입      */
			   when '2101' then new.qntt  /* 생산입고  */
			   when '2102' then new.qntt  /* 반품입고  */
			   when '2103' then new.qntt  /* 기타입고  */
			   when '2104' then new.qntt  /* 이동입고  */
			   else 0 end into _istt_qntt;
    select case new.isos_dvcd 
	           when '1201' then new.qntt  /* 생산      */
			   when '2201' then new.qntt  /* 판매      */ 
			   when '2202' then new.qntt  /* 자가소비  */
			   when '2203' then new.qntt  /* 기타출고  */
			   when '2204' then new.qntt  /* 이동출고  */
			   when '2205' then new.qntt  /* 재고조정  */
			   else 0 end into _ostt_qntt;
	set _istt_date = null;
	set _ostt_date = null;
	if  _istt_qntt <> 0 then set _istt_date = new.invc_date; end if;
	if  _ostt_qntt <> 0 then set _ostt_date = new.invc_date; end if;
	
    if  new.qntt <> 0 then begin
        insert into lot_isos_sum (
                              lott_numb    , bzpl_idcd    , wrhs_idcd    , item_idcd    
			                , istt_date    , ostt_date
                            , istt_qntt    , ostt_qntt
                            , chge_qntt    , stok_qntt
                            , tagg_dvcd
                            , line_stat    , find_name   , crte_dttm
			  )values (
	   		                  new.lott_numb , new.bzpl_idcd , new.wrhs_idcd , new.item_idcd
							, _istt_date            , _ostt_date
                            , ifnull(_istt_qntt,0)  , ifnull(_ostt_qntt,0)
							, 0             , ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
							, null
                            , '0'
                            , null
							, crte_dttm = date_format(now(),'%Y%m%d%H%i%S')
			)		
	    on duplicate key update 
		                      bzpl_idcd = new.bzpl_idcd
							, wrhs_idcd = new.wrhs_idcd 
							, item_idcd = new.item_idcd 
							, istt_date = case when _istt_qntt = 0 then istt_date else new.invc_date end   
							, ostt_date = case when _ostt_qntt = 0 then ostt_date else new.invc_date end   
		                    , istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
							, ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
							, stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
							, updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
		;	
   	    update lot_isos_sum set
		       stok_qntt = ifnull(istt_qntt,0) - ifnull(ostt_qntt,0) + ifnull(chge_qntt,0)
	    where  lott_numb = new.lott_numb
	    ;		
		
       end;
	end if;   

end;




-- ***********************************************************************************
--   LOT수불대장 트리거 (after delete)
-- ***********************************************************************************
CREATE OR REPLACE 
TRIGGER ta_lot_isos_book_delete
AFTER delete on lot_isos_book
FOR EACH ROW   

begin
    DECLARE _istt_qntt decimal(15,0);
    DECLARE _ostt_qntt decimal(15,0);
    DECLARE _stok_qntt decimal(15,0);
    select case old.isos_dvcd 
	           when '1101' then old.qntt  /* 매입      */
			   when '2101' then old.qntt  /* 생산입고  */
			   when '2102' then old.qntt  /* 반품입고  */
			   when '2103' then old.qntt  /* 기타입고  */
			   when '2104' then old.qntt  /* 이동입고  */
			   else 0 end into _istt_qntt;
    select case old.isos_dvcd 
	           when '1201' then old.qntt  /* 생산      */
			   when '2201' then old.qntt  /* 판매      */ 
			   when '2202' then old.qntt  /* 자가소비  */
			   when '2203' then old.qntt  /* 기타출고  */
			   when '2204' then old.qntt  /* 이동출고  */
			   when '2205' then old.qntt  /* 재고조정  */
			   else 0 end into _ostt_qntt;
			   
    select _istt_qntt * -1
	     , _ostt_qntt * -1
	     , (_istt_qntt - _ostt_qntt) * -1 
	into   _istt_qntt
	     , _ostt_qntt
	     , _stok_qntt
    ;			   
/*	
	update lot_isos_sum set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_stok_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where lott_numb = old.lott_numb
	;		
*/
	update lot_isos_sum set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_istt_qntt,0) - ifnull(_ostt_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where lott_numb = old.lott_numb
	;		
	update lot_isos_sum set
		   stok_qntt = ifnull(istt_qntt,0) - ifnull(ostt_qntt,0) + ifnull(chge_qntt,0)
	where  lott_numb = old.lott_numb
	;		

end;


/*
select * from lot_isos_book

update  lot_isos_book set qntt = 3333 where lott_numb = '1111-1111' and line_seqn = 242
delete from   lot_isos_book where lott_numb = '1111-1111' and line_seqn = 242



insert into lot_isos_book
(lott_numb
,line_seqn
,bzpl_idcd
,isos_dvcd
,invc_date
,invc_numb
,invc_seqn
,wrhs_idcd
,item_idcd
,qntt
,stok_symb
,uper_seqn
,disp_seqn
,user_memo
,sysm_memo
,prnt_idcd
,line_levl
,line_ordr
,line_stat
,line_clos
,find_name
,updt_user_name
,updt_ipad
,updt_dttm
,updt_idcd
,updt_urif
,crte_user_name
,crte_ipad
,crte_dttm
,crte_idcd
,crte_urif
)
select 
 lott_numb
,245
,bzpl_idcd
,isos_dvcd
,invc_date
,invc_numb
,invc_seqn
,wrhs_idcd
,item_idcd
,qntt
,stok_symb
,uper_seqn
,disp_seqn
,user_memo
,sysm_memo
,prnt_idcd
,line_levl
,line_ordr
,line_stat
,line_clos
,find_name
,updt_user_name
,updt_ipad
,updt_dttm
,updt_idcd
,updt_urif
,crte_user_name
,crte_ipad
,crte_dttm
,crte_idcd
,crte_urif
from lot_isos_book
where lott_numb = '1111-1111'
and   line_seqn = 242

*/








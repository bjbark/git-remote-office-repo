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
							, ifnull(new.stok_qntt,0)
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
							, stok_qntt = ifnull(stok_qntt,0) + ifnull(new.stok_qntt,0)
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
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_stok_qntt,0)
		 , stok_amnt = ifnull(stok_amnt,0) + ifnull(old.stok_amnt,0) * -1
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
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_stok_qntt,0)
		 , stok_amnt = ifnull(stok_amnt,0) + ifnull(old.stok_amnt,0) * -1
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
							, ifnull(new.stok_qntt,0)
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
							, stok_qntt = ifnull(stok_qntt,0) + ifnull(new.stok_qntt,0)
							, stok_amnt = ifnull(stok_amnt,0) + ifnull(new.stok_amnt,0)
                            , line_stat = '0'
							, find_name = null
							, updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
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
	     , _stok_qntt;			   
	update lot_isos_sum set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_stok_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where lott_numb = old.lott_numb
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
	     , _stok_qntt;			   
	update lot_isos_sum set
           istt_qntt = ifnull(istt_qntt,0) + ifnull(_istt_qntt,0)
		 , ostt_qntt = ifnull(ostt_qntt,0) + ifnull(_ostt_qntt,0)
		 , stok_qntt = ifnull(stok_qntt,0) + ifnull(_stok_qntt,0)
	     , updt_dttm = date_format(now(),'%Y%m%d%H%i%S')
	where lott_numb = old.lott_numb
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
       end;
	end if;   

end;








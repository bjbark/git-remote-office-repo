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



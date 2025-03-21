drop procedure if exists `auto_lot_use`;
CREATE PROCEDURE `auto_lot_use`(
    _invc_numb    varchar(50),
    _line_seqn    varchar(50),
    _item         varchar(50),
	_tot_qntt     decimal(15,2),
    _source_dvcd  varchar(50),
    _job_dvcd     varchar(10)	/*  delete   or   insert    */
)

BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE vRowCount INT DEFAULT 0 ;
  
  DECLARE v_finished INTEGER DEFAULT 0;  
  
  declare _lott_numb   varchar(50);
  declare _bzpl_idcd   varchar(50);
  declare _wrhs_idcd   varchar(50);
  declare _item_idcd   varchar(50);
  declare _stok_qntt   decimal(15,2);
  declare _remain_qntt decimal(15,2);
  declare _comp_qntt   decimal(15,2);
  declare _isos_dvcd   varchar(4);

  DECLARE cur1 CURSOR 
    FOR SELECT 	 lott_numb
			   , bzpl_idcd
			   , wrhs_idcd
			   , item_idcd
			   , ifnull(istt_qntt,0) - ifnull(ostt_qntt,0) + ifnull(chge_qntt,0) as stok_qntt
 	      from lot_isos_sum 
        where  item_idcd = _item
		and    (ifnull(istt_qntt,0) + ifnull(chge_qntt,0)) >  ifnull(ostt_qntt,0) 
		order  by istt_date
	;
 DECLARE CONTINUE HANDLER 
    FOR NOT FOUND SET v_finished = 1;
 OPEN cur1; 
  
  set _remain_qntt = _tot_qntt;
  /* 1101:매입 2101:생산입고 2102:반품입고 2103:기타입고 2104:이동입고 1201:생산출고 2201:판매 2202:자가소비 2203:기타출고 2204:이동출고 2205:재고조정 */
  select case _source_dvcd when '구매입고' then '1101' 
	                       when '생산입고' then '2101'
	                       when '기타입고' then '2103'
	   				       when '반품입고' then '2102'
						   when '이동입고' then '2104'
						   when '생산출고' then '1201'
						   when '판매출고' then '2201'
						   when '자가소비' then '2202'
						   when '기타출고' then '2203'
						   when '이동출고' then '2204'
						   when '재고조정' then '2205'
						   else null end into _isos_dvcd
	;						 
    /*  LOT 수불대장을 정리한다. (재고현황은 트리거에 의하여 자동 처리된다. )   */
	if  _job_dvcd = 'delete' then 
	    begin
            delete from lot_isos_book 
	        where  invc_numb = _invc_numb
	        and    invc_seqn = _line_seqn
	        and    isos_dvcd = _isos_dvcd 					
	        ;		                     
        end;
	else begin	
        get_field : LOOP
            FETCH cur1 INTO   _lott_numb 
                            , _bzpl_idcd 
                            , _wrhs_idcd 
                            , _item_idcd 
                            , _stok_qntt 
        					;
            IF v_finished = 1 THEN 
               LEAVE get_field;
            END IF;
        	set _comp_qntt = 0;
        	if  _stok_qntt     >  _remain_qntt then 
        	    set _comp_qntt =  _remain_qntt;
            end if;		
        	if  _stok_qntt     <= _remain_qntt then 
        	    set _comp_qntt =  _stok_qntt;
            end if;		
            if  _comp_qntt <> 0 then	
                insert into lot_isos_book (
                           lott_numb        , line_seqn        , bzpl_idcd     , isos_dvcd
                         , invc_date        , invc_numb        , invc_seqn     , wrhs_idcd
                         , item_idcd        , qntt             , stok_symb
                         , uper_seqn        , disp_seqn
                         , user_memo        , sysm_memo        , prnt_idcd     , line_stat
                         , line_clos        , find_name        , crte_dttm
                       ) 
                    select _lott_numb
        	    	     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where  _lott_numb = x.lott_numb)
        	    	     , _bzpl_idcd       , _isos_dvcd
        	    	     , date_format(now(), '%Y%m%d')        , _invc_numb      , _line_seqn   , _wrhs_idcd
        	    		 , _item_idcd       , _comp_qntt       , -1
        	    		 , (select ifnull(max(line_seqn),0)     from lot_isos_book x where _lott_numb = x.lott_numb)
                         , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where _lott_numb = x.lott_numb)
        	    		 , null             , null             , _invc_numb   , '0'
        	    		 , '0'              
        	    		 , concat(i.item_code , ' ' , i.item_name , ' ' , _lott_numb , date_format(now(), '%Y%m%d') )
        	    		 , date_format(now(), '%Y%m%d%H%i%s')
        			from item_mast i
                    where i.item_idcd = _item_idcd			
        	    ;	
        	end if;
        	set _remain_qntt = _remain_qntt - _comp_qntt ;
        	if  _remain_qntt <= 0 then
        	    leave get_field;
        	end if;	
        	
        END LOOP get_field;
	end;
    end if;	
  CLOSE cur1;
  
end	
	
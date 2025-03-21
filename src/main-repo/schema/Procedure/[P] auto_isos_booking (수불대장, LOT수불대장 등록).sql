
--  *************************************************************************************************************
--  입출고 관련 수불대장 정리
--  *************************************************************************************************************
drop procedure if exists `auto_isos_booking`;
CREATE PROCEDURE `auto_isos_booking`(
     _invc_numb   varchar(50),
	 _source_dvcd varchar(50)
    )
begin
    declare _new_invc_numb    varchar(50);
    declare _wk_invc          varchar(50);
	declare _wk_seqn          integer;
    declare _invc_dvcd        varchar(4);
    declare _isos_dvcd        varchar(4);
	declare _stor             varchar(50);
    declare _vatx_incl_yorn   varchar(1);
	
    DECLARE done              INT DEFAULT FALSE;
    DECLARE vRowCount         INT DEFAULT 0 ;
    DECLARE v_finished        INT  DEFAULT 0;  
	
	declare _invc_numb        varchar(50);
	declare _line_seqn        int;
	declare _item_idcd        varchar(50);
	declare _ostt_qntt        decimal(15,4);
	declare _source_name      varchar(50);
	declare _action_name      varchar(50);
	
    DECLARE cur_lott CURSOR 
      FOR SELECT a.invc_numb   as invc_numb   
  		     , a.line_seqn   as line_seqn 
  			 , a.item_idcd   as item_idcd
  			 , a.ostt_qntt   as ostt_qntt
  			 , '기타출고'    as source_name
  			 , 'insert'      as action_name
          from   etot_item a
  		  where  _source_dvcd = '기타출고'
  		  and    a.ostt_qntt <> 0	   
  		  and    a.invc_numb = _invc_numb
          and    ifnull(a.lott_numb,'') = ''		
  		  union all
          SELECT a.invc_numb  as invc_numb      
  		       , a.line_seqn  as line_seqn 
  			   , a.item_idcd  as item_idcd
  			   , a.ostt_qntt  as ostt_qntt
  		  	   , '판매출고'   as source_name
  			   , 'insert'     as action_name
          from   sale_ostt_item a
  		  where  _source_dvcd = '기타출고'
  		  and    a.ostt_qntt <> 0	   
  	      and    a.invc_numb = _invc_numb
          and    ifnull(a.lott_numb,'') = ''		
  	;
   DECLARE CONTINUE HANDLER 
      FOR NOT FOUND SET v_finished = 1;
	
	
/*
기타 입고 처리 사항을 수불대장 및 재고현황에 반영한다.
단, 재고현황 반영은 트리거에 의한다.
*/
	
	select optn_char_valu   into _stor
	from   optn_mast
	where  optn_idcd = '본사ID'
	;
	select case when ifnull(optn_logc_valu,'1') in ('예','Yes','YES','1') then '1' else '0' end   into _vatx_incl_yorn
	from   optn_mast
	where  optn_idcd = '부가세포함'
	;
	select ifnull(_vatx_incl_yorn,'1') into _vatx_incl_yorn
	;
	/* 1100=구매입고|1200=기타입고|1300=반품입고|1400=이동입고|2100=생산출고|2200=기타출고|2300=이동출고|2400=재고조정  */
	select case _source_dvcd when '구매입고' then '1100' 
	                         when '기타입고' then '1200'
							 when '반품입고' then '1300'
							 when '이동입고' then '1400'
							 when '생산출고' then '2100'
							 when '기타출고' then '2200'
							 when '이동출고' then '2300'
							 when '재고조정' then '2400'
							 else null end into _invc_dvcd
	;						 
    delete from isos_book 
	where  invc_numb = _invc_numb
	and    invc_dvcd = _invc_dvcd 					
	;		                     

--	call fn_seq_gen_v3(_stor , 'isos_book','',_new_invc_numb);
	
    /* 기타입고대장에 수정 또는 신규 추가되면 합격수량을 발췌하여 수불대장에 추가한다.(재고현황은 트리거에 의하여 자동 처리된다.)   */
    insert into isos_book (
               bzpl_idcd        , invc_dvcd        , invc_numb        , line_seqn      , assi_seqn
             , invc_date        , invc_orgn        , wrhs_idcd        , dept_idcd
             , drtr_idcd        , cstm_idcd        , acct_bacd        , item_idcd
             , item_code        , unit_idcd        , stnd_pric        , vatx_incl_yorn
             , vatx_rate        , qntt             , pric             , amnt
             , vatx             , stok_qntt        , stok_pric        , stok_amnt
             , lott_numb        , orig_invc_numb   , orig_seqn   
             , uper_seqn        , disp_seqn
             , user_memo        , sysm_memo        , prnt_idcd        , line_stat
             , line_clos        , find_name        , crte_dttm
           ) 
	/*  << 구매 입고 >>   */
        select m.bzpl_idcd      , _invc_dvcd       , a.invc_numb      , a.line_seqn    , 0
		     , a.insp_date      , a.orig_invc_numb , m.istt_wrhs_idcd , m.dept_idcd
			 , m.drtr_idcd      , a.cstm_idcd      , i.acct_bacd      , a.item_idcd
			 , i.item_code      , i.unit_idcd      , null             , a.vatx_incl_yorn
			 , a.vatx_rate      , a.pass_qntt      , p.offr_pric      , a.pass_qntt * p.offr_pric
             , ( a.pass_qntt * p.offr_pric )       * a.vatx_rate / 100
             , a.pass_qntt      , ip.puch_pric     , a.pass_qntt * ip.puch_pric
			 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb      , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , a.insp_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   purc_istt_item a
               left outer join purc_istt_mast m  on a.invc_numb      = m.invc_numb    
               left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb  and a.orig_seqn = p.line_seqn
               left outer join item_mast      i  on a.item_idcd      = i.item_idcd
               left outer join item_purc      ip on a.item_idcd      = ip.item_idcd
		where  _source_dvcd = '구매입고'
		and    a.pass_qntt <> 0	   
		and    a.invc_numb = _invc_numb
	    union all    
	/*  << 기타 입고 >>   */
        select m.bzpl_idcd      , _invc_dvcd       , a.invc_numb      , a.line_seqn    , 0
		     , m.invc_date      , a.orig_invc_numb , m.istt_wrhs_idcd , m.proc_dept_idcd
			 , m.proc_drtr_idcd , m.cstm_idcd      , i.acct_bacd      , a.item_idcd
			 , i.item_code      , i.unit_idcd      , null             , _vatx_incl_yorn
			 , a.vatx_rate      , a.istt_qntt      , a.stnd_pric      , a.istt_qntt * a.stnd_pric
             , ( a.istt_qntt * a.stnd_pric )       * a.vatx_rate / 100
             , a.istt_qntt      , a.stnd_pric      , a.istt_qntt * a.stnd_pric
			 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb      , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   etit_item a
               left outer join etit_mast m  on a.invc_numb  = m.invc_numb
               left outer join item_mast i  on a.item_idcd  = i.item_idcd
		where  _source_dvcd = '기타입고'
		and    a.istt_qntt <> 0	   
		and    a.invc_numb = _invc_numb
	    union  all
    /*  << 판매 출고 >>   */
        select m.bzpl_idcd      , _invc_dvcd       , a.invc_numb      , a.line_seqn   , 0
		     , m.invc_date      , a.acpt_numb      , a.wrhs_idcd      , m.dept_idcd
			 , m.drtr_idcd      , m.cstm_idcd      , i.acct_bacd      , a.item_idcd
			 , i.item_code      , i.unit_idcd      , null             , _vatx_incl_yorn
			 , a.vatx_rate      , a.ostt_qntt      , a.sale_stnd_pric , a.ostt_qntt * a.sale_pric
             , ( a.ostt_qntt  *   a.sale_pric )  *   a.vatx_rate / 100
             , a.ostt_qntt * -1 , a.sale_pric      , a.ostt_qntt * a.sale_pric * -1 
			 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb      , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   sale_ostt_item a
               left outer join sale_ostt_mast m  on a.invc_numb  = m.invc_numb
               left outer join item_mast i  on a.item_idcd  = i.item_idcd
		where  _source_dvcd = '판매출고'
		and    a.ostt_qntt <> 0	   
		and    a.invc_numb = _invc_numb
	    union  all
    /*  << 기타 출고 >>   */
        select m.bzpl_idcd      , _invc_dvcd       , a.invc_numb      , a.line_seqn   , 0
		     , m.invc_date      , a.orig_invc_numb , m.ostt_wrhs_idcd , m.proc_dept_idcd
			 , m.proc_drtr_idcd , m.cstm_idcd      , i.acct_bacd      , a.item_idcd
			 , i.item_code      , i.unit_idcd      , null             , _vatx_incl_yorn
			 , a.vatx_rate      , a.ostt_qntt      , a.stnd_pric      , a.ostt_qntt * a.stnd_pric
             , ( a.ostt_qntt  *   a.stnd_pric )  *   a.vatx_rate / 100
             , a.ostt_qntt * -1 , a.stnd_pric      , a.ostt_qntt * a.stnd_pric * -1 
			 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb      , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   etot_item a
               left outer join etot_mast m  on a.invc_numb  = m.invc_numb
               left outer join item_mast i  on a.item_idcd  = i.item_idcd
		where  _source_dvcd = '기타출고'
		and    a.ostt_qntt <> 0	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 이동 입출고 (입고창고 측)  >>   */
        select m.istt_bzpl_idcd , _invc_dvcd       , a.invc_numb      , a.line_seqn    , 1
		     , m.invc_date      , a.orig_invc_numb , m.istt_wrhs_idcd , m.proc_dept_idcd
			 , m.proc_drtr_idcd , null             , i.acct_bacd      , a.item_idcd
			 , i.item_code      , i.unit_idcd      , null             , _vatx_incl_yorn
			 , a.vatx_rate      , a.move_qntt      , a.stnd_pric      , a.move_qntt * a.stnd_pric
             , ( a.move_qntt  *   a.stnd_pric )  *   a.vatx_rate / 100
             , a.move_qntt * +1 , a.stnd_pric      , a.move_qntt * a.stnd_pric * 1
			 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb      , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   move_item a
               left outer join move_mast m  on a.invc_numb  = m.invc_numb
               left outer join item_mast i  on a.item_idcd  = i.item_idcd
		where  _source_dvcd in ( '이동입고','이동출고')
		and    a.move_qntt <> 0	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 이동 입출고 (촐고창고 측)  >>   */
        select m.ostt_bzpl_idcd , _invc_dvcd       , a.invc_numb      , a.line_seqn    , 2
		     , m.invc_date      , a.orig_invc_numb , m.ostt_wrhs_idcd , m.proc_dept_idcd
			 , m.proc_drtr_idcd , null             , i.acct_bacd      , a.item_idcd
			 , i.item_code      , i.unit_idcd      , null             , _vatx_incl_yorn
			 , a.vatx_rate      , a.move_qntt * -1 , a.stnd_pric      , a.move_qntt * a.stnd_pric * -1
             , ( a.move_qntt  *   a.stnd_pric )  *   a.vatx_rate / 100 * -1
             , a.move_qntt * -1 , a.stnd_pric      , a.move_qntt * a.stnd_pric * -1 
			 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb      , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   move_item a
               left outer join move_mast m  on a.invc_numb  = m.invc_numb
               left outer join item_mast i  on a.item_idcd  = i.item_idcd
		where  _source_dvcd in ( '이동입고','이동출고')
		and    a.move_qntt <> 0	   
		and    a.invc_numb = _invc_numb
    ; 	

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
    delete from lot_isos_book 
	where  invc_numb = _invc_numb
	and    isos_dvcd = _isos_dvcd 					
	;		                     

    /*  LOT 수불대장에 반영한다. (재고현황은 트리거에 의하여 자동 처리된다. )   */
    insert into lot_isos_book (
               lott_numb        , line_seqn        , bzpl_idcd     , isos_dvcd
             , invc_date        , invc_numb        , invc_seqn     , wrhs_idcd
             , item_idcd        , qntt             , stok_symb
             , uper_seqn        , disp_seqn
             , user_memo        , sysm_memo        , prnt_idcd     , line_stat
             , line_clos        , find_name        , crte_dttm
           ) 
    /*  << 구매입고  >>   */
        select a.lott_numb      
		     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
		     , m.bzpl_idcd      , _isos_dvcd
		     , a.insp_date      , a.invc_numb      , a.line_seqn   , m.istt_wrhs_idcd
			 , a.item_idcd      , a.pass_qntt      , +1
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb   , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , a.insp_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   purc_istt_item a
               left outer join purc_istt_mast m  on a.invc_numb      = m.invc_numb
               left outer join item_mast      i  on a.item_idcd      = i.item_idcd
		where  _source_dvcd = '구매입고'
		and    ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 기타입고  >>   */
        select a.lott_numb      
		     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
		     , m.bzpl_idcd      , _isos_dvcd
		     , m.invc_date      , a.invc_numb      , a.line_seqn   , m.istt_wrhs_idcd
			 , a.item_idcd      , a.istt_qntt      , +1
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb   , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   etit_item a
               left outer join etit_mast m on a.invc_numb = m.invc_numb
               left outer join item_mast i on a.item_idcd = i.item_idcd
		where  _source_dvcd = '기타입고'
		and    ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 이동 입출고 (입고창고 측)  >>   */
        select a.lott_numb      
		     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
		     , m.istt_bzpl_idcd , _isos_dvcd
		     , m.invc_date      , a.invc_numb      , a.line_seqn   , m.istt_wrhs_idcd
			 , a.item_idcd      , a.move_qntt      , +1
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb   , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   move_item a
               left outer join move_mast m on a.invc_numb = m.invc_numb
               left outer join item_mast i on a.item_idcd = i.item_idcd
		where  _source_dvcd in ( '이동입고','이동출고')
		and    ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 이동 입출고 (입고창고 측)  >>   */
        select a.lott_numb      
		     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
		     , m.ostt_bzpl_idcd , _isos_dvcd
		     , m.invc_date      , a.invc_numb      , a.line_seqn   , m.ostt_wrhs_idcd
			 , a.item_idcd      , a.move_qntt      , -1
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb   , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   move_item a
               left outer join move_mast m on a.invc_numb = m.invc_numb
               left outer join item_mast i on a.item_idcd = i.item_idcd
		where  _source_dvcd in ( '이동입고','이동출고')
		and    ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 기타 출고  >>   */
        select a.lott_numb      
		     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
		     , m.bzpl_idcd      , _isos_dvcd
		     , m.invc_date      , a.invc_numb      , a.line_seqn   , m.ostt_wrhs_idcd
			 , a.item_idcd      , a.ostt_qntt      , -1
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb   , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   etot_item a
               left outer join etot_mast m on a.invc_numb = m.invc_numb
               left outer join item_mast i on a.item_idcd = i.item_idcd
		where  _source_dvcd = '기타출고'
		and    ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
		union all
    /*  << 판매 출고  >>   */
        select a.lott_numb      
		     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
		     , m.bzpl_idcd      , _isos_dvcd
		     , m.invc_date      , a.invc_numb      , a.line_seqn   , a.wrhs_idcd
			 , a.item_idcd      , a.ostt_qntt      , -1
			 , a.uper_seqn      , a.disp_seqn
			 , null             , null             , a.invc_numb   , '0'
			 , '0'              
			 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , m.invc_date )
			 , date_format(now(), '%Y%m%d%H%i%s')
        from   sale_ostt_item a
               left outer join sale_ostt_mast m on a.invc_numb = m.invc_numb
               left outer join item_mast i on a.item_idcd = i.item_idcd
		where  _source_dvcd = '판매출고'
		and    ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
	;
	
	
	/* ----------------------------------------------------------------------------
	아래부터는 lot 수불대장을 자동 처리한다. 
	등록하는 전표의 lot번호가 있을 경우에는 위에서 처리하며, lot번호가 없을 경우
	(앞쪽 선언부에 cursor를 선언해 둔다.(LOT번호가 없는 출고에 한하여).._)
	아래 로직으로 LOT 수불대장을 자동 작성해 준다. 
	----------------------------------------------------------------------------  */
	
    OPEN cur_lott; 
       get_field : LOOP
           FETCH cur_lott INTO   _invc_numb  
                               , _line_seqn 
                               , _item_idcd
                               , _ostt_qntt
                               , _source_name
           					   , _action_name
   							;
               IF v_finished = 1 THEN 
                  LEAVE get_field;
               END IF;
   			call  auto_lot_use(  _invc_numb  
                               , _line_seqn 
                               , _item_idcd
                               , _ostt_qntt
                               , _source_name
           					   , _action_name
   							) ;
           	
       END LOOP get_field;
    CLOSE cur_lott;

 
	
	/* ----------------------------------------------------------------------------
	아래부터는 수불 전표 발생에 따른 각종 원장 정리사항을 처리한다. 
	전표에 따라 아래 처리사항은 생략될 수 있다.
	----------------------------------------------------------------------------  */
	select count(*) 
	from   purc_ordr_item 
    where  _source_dvcd = '구매입고'
	and    (invc_numb ,line_seqn ) in (select orig_invc_numb ,  orig_seqn
	                                   from   purc_istt_item
	                                   where  invc_numb = _invc_numb
									  ) 	
	for update  /* records lock for update  */
	;
	
	/*  구매 발주대장의 입고수량(합격수량)을 갱신한다.  */
    update purc_ordr_item set pass_qntt = ifnull((select sum(pass_qntt) 
                                                  from   purc_istt_item
    									          where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
    									          and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
    									   ), 0)
    where  _source_dvcd = '구매입고'
	and    (invc_numb ,line_seqn ) in (select orig_invc_numb ,  orig_seqn
	                                   from   purc_istt_item
	                                   where  invc_numb = _invc_numb
									  ) 
    ;									   
end;
	




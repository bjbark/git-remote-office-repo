
drop procedure if exists `auto_stock_insp_insert`;
CREATE PROCEDURE `auto_stock_insp_insert`(
     _invc_numb  varchar(50)
    )
begin
    declare _new_invc_numb    varchar(50);
    declare _wk_invc          varchar(50);
	declare _wk_seqn          integer;
    declare _invc_dvcd        varchar(4);
    declare _isos_dvcd        varchar(4);
	declare _stor             varchar(50);
/*
수입검사 입고 처리 사항을 수불대장 및 재고현황에 반영한다.
단, 재고현황 반영은 트리거에 의한다.
*/
	
	select optn_char_valu   into _stor
	from   optn_mast
	where  optn_idcd = '본사ID'
	;
	
    set    _invc_dvcd = '1100';  /* 1100=구매입고|1200=기타입고|1300=반품입고|1400=이동입고|2100=생산출고|2200=기타출고|2300=이동출고|2400=재고조정  */
    delete from isos_book 
	where  invc_numb = _invc_numb
	and    invc_dvcd = _invc_dvcd 					
	;		                     

--	call fn_seq_gen_v3(_stor , 'isos_book','',_new_invc_numb);
	
    /* 검사대장이 수정 또는 신규 추가되면 합격수량을 발췌하여 수불대장에 추가한다.(재고현황은 트리거에 의하여 자동 처리된다.)   */
    insert into isos_book (
               bzpl_idcd        , invc_dvcd        , invc_numb        , line_seqn
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
        select m.bzpl_idcd      , _invc_dvcd       , a.invc_numb      , a.line_seqn
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
		where  a.pass_qntt <> 0	   
		and    a.invc_numb = _invc_numb
    ; 	


    set _isos_dvcd = '1101';  /* 1101:매입 2101:생산입고 2102:반품입고 2103:기타입고 2104:이동입고 1201:생산출고 2201:판매 2202:자가소비 2203:기타출고 2204:이동출고 2205:재고조정 */

    delete from lot_isos_book 
	where  invc_numb = _invc_numb
	and    isos_dvcd = _isos_dvcd 					
	;		                     

    /*  검사대장에 수정 또는 신규 되면 LOT 수불대장에 반영한다. (재고현황은 트리거에 의하여 자동 처리된다. )   */
    insert into lot_isos_book (
               lott_numb        , line_seqn        , bzpl_idcd     , isos_dvcd
             , invc_date        , invc_numb        , invc_seqn     , wrhs_idcd
             , item_idcd        , qntt             , stok_symb
             , uper_seqn        , disp_seqn
             , user_memo        , sysm_memo        , prnt_idcd     , line_stat
             , line_clos        , find_name        , crte_dttm
           ) 
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
		where  ifnull(a.lott_numb,'') <> ''	   
		and    a.invc_numb = _invc_numb
	;
	/*  구매 발주대장의 입고수량(합격수량)을 갱신한다.  */
    update purc_ordr_item set pass_qntt = ifnull((select sum(pass_qntt) 
                                                  from   purc_istt_item
    									          where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
    									          and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
    									   ), 0)
    where  (invc_numb ,line_seqn ) in (select orig_invc_numb ,  orig_seqn
	                                   from   purc_istt_item
	                                   where  invc_numb = _invc_numb
	                                   and    line_seqn = _line_seqn
									  ) 
    ;									   
	
end;
	


drop procedure if exists `auto_stock_insp_delete`;
CREATE PROCEDURE `auto_stock_insp_delete`(
     _invc_numb  varchar(50)
    )
begin
    declare _new_invc_numb    varchar(50);
    declare _wk_invc          varchar(50);
    declare _stor             varchar(50);
	declare _wk_seqn          integer;
    declare _invc_dvcd        varchar(4);
    declare _isos_dvcd        varchar(4);
	
	select optn_char_valu     into _stor
	from   optn_mast
	where  optn_idcd = '본사ID'
	;
	
    set    _invc_dvcd = '1100'    /* 1100=구매입고|1200=기타입고|1300=반품입고|1400=이동입고|2100=생산출고|2200=기타출고|2300=이동출고|2400=재고조정  */
	;
	/*  이전 자료를 정리한다.  */
    delete from isos_book
	where  invc_dvcd = _invc_dvcd
	and    invc_numb = _invc_numb
	;
	
	select orig_invc_numb , orig_seqn into  _wk_invc , _wk_seqn
	from   purc_istt_item
	where  invc_numb = _invc_numb
	;
		
	/*   구매입고_내역의 Invoice번호 = _invc_numb, 구매입고_내역의 발주번호 = _wk_invc   */
	select count(*) 
	from   purc_ordr_item 
    where  (invc_numb ,line_seqn ) in (select orig_invc_numb ,  orig_seqn
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
    where  (invc_numb ,line_seqn ) in (select orig_invc_numb ,  orig_seqn
	                                   from   purc_istt_item
	                                   where  invc_numb = _invc_numb
									  ) 
    ;									   
    set _isos_dvcd = '1101';  /* 1101:매입 2101:생산입고 2102:반품입고 2103:기타입고 2104:이동입고 1201:생산출고 2201:판매 2202:자가소비 2203:기타출고 2204:이동출고 2205:재고조정 */

    delete from lot_isos_book 
	where  invc_numb = _invc_numb
	and    isos_dvcd = _isos_dvcd 					
	;		                     
end;










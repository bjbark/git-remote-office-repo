/*
call prc_seqn_gen('N1000WINFO1000','item_desc','aaa')
call fn_seqn_gen('N1000WINFO1000','sale_ostt_item','aaa')

*/


-- drop procedure prc_seqn_gen ; 

CREATE procedure `prc_seqn_gen`(
     _stor  varchar(50),
     _table varchar(50),
	 _main_key varchar(50)
    )  
begin
    DECLARE _seq       VARCHAR(50);
    DECLARE _seqn_code VARCHAR(50);
    DECLARE _num       integer;
    DECLARE _input     VARCHAR(10);
    DECLARE _pre       VARCHAR(50);
    DECLARE _tbl_nm    VARCHAR(50);
    DECLARE _key_field VARCHAR(50);
    DECLARE _seqn_field VARCHAR(50);
    DECLARE _HQ_ID     VARCHAR(50);
    DECLARE _len INT;
    DECLARE _chr VARCHAR(10);

DECLARE _SQL VARCHAR(2500);

    select case ifnull(lower(_table),'all') 
                when  'item_desc' 			then 'item_idcd'
                when  'item_apnd_file'		then 'item_idcd'
                when  'item_sale_pric'		then 'item_idcd'
                when  'item_purc'			then 'item_idcd'
                when  'cust_drtr' 			then 'cust_idcd'
                when  'cust_addr' 			then 'cust_idcd'
                when  'cust_apnd_file'		then 'cust_idcd'
                when  'cvic_item' 			then 'cvic_idcd'
                when  'cvic_apnd_file'		then 'cvic_idcd'
                when  'cvic_adon' 			then 'cvic_idcd'
                when  'cvic_chck' 			then 'cvic_idcd'
                when  'cvic_dmge' 			then 'cvic_idcd'
                when  'jigg_item' 			then 'jigg_idcd'
                when  'jigg_apnd_file'		then 'jigg_idcd'
                when  'jigg_chck' 			then 'jigg_idcd'
                when  'mold_repa' 			then 'mold_idcd'
                when  'mold_move' 			then 'mold_idcd'
                when  'wkct_cvic' 			then 'wkct_idcd'
                when  'wkct_mans' 			then 'wkct_idcd'
                when  'wkfw_rout' 			then 'wkfw_idcd'
                when  'acpt_item'			then 'invc_numb'
                when  'acpt_apnd_file'		then 'invc_numb'
                when  'acpt_insp'			then 'invc_numb'
                when  'prod_trst_item'		then 'invc_numb'
                when  'spts_item'			then 'invc_numb'
                when  'sale_item'			then 'invc_numb'
                when  'mtrl_istt_item'		then 'invc_numb'
                when  'mtrl_ostt_trst_item'	then 'invc_numb'
                when  'mtrl_ostt_item'		then 'invc_numb'
                when  'etot_trst_item'		then 'invc_numb'
                when  'etot_item'			then 'invc_numb'
                when  'ddil_item'			then 'invc_numb'
                when  'ddil_lot_item'		then 'invc_numb'
                when  'sale_ostt_item'		then 'invc_numb'
                when  'move_trst_item'		then 'invc_numb'
                when  'move_item'			then 'invc_numb'
                when  'etit_trst_item'		then 'invc_numb'
                when  'etit_item'			then 'invc_numb'
                when  'lot_isos_book' 		then 'lott_numb'
                when  'insp_cond' 			then 'insp_type_idcd'
                when  'mold_shot' 			then 'mold_idcd'
                when  'purc_trst_item'		then 'invc_numb'
                when  'purc_ordr_item'		then 'invc_numb'
                when  'purc_istt_item'		then 'invc_numb'
                when  'work_ordr' 			then 'invc_numb'
                when  'work_book_item' 		then 'invc_numb'
                when  'work_book_cvic'		then 'invc_numb'
                when  'work_book_mans'		then 'invc_numb'
                when  'work_book_loss'		then 'invc_numb'
                when  'purc_insp' 			then 'invc_numb'
				else  'item_idcd' end  
	into _key_field;			

    select case ifnull(lower(_table),'all') 
                when  'acpt_item'			then 'invc_seqn'
                when  'acpt_insp'			then 'invc_seqn'
                when  'prod_trst_item'		then 'invc_seqn'
                when  'spts_item'			then 'invc_seqn'
                when  'sale_item'			then 'invc_seqn'
                when  'mtrl_istt_item'		then 'invc_seqn'
                when  'sale_ostt_item'		then 'invc_seqn'
                when  'move_trst_item'		then 'invc_seqn'
                when  'move_item'			then 'invc_seqn'
                when  'etit_trst_item'		then 'invc_seqn'
                when  'etit_item'			then 'invc_seqn'
                when  'mtrl_ostt_trst_item'	then 'invc_seqn'
                when  'mtrl_ostt_item'		then 'invc_seqn'
                when  'etot_trst_item'		then 'invc_seqn'
                when  'etot_item'			then 'invc_seqn'
                when  'ddil_item'			then 'invc_seqn'
                when  'ddil_lot_item'		then 'invc_seqn'
				else  'line_seqn' end  
	into _seqn_field;			
 

    SET _SQL = CONCAT("SELECT  ifnull(max(",_seqn_field,"),0)  + 1 as seqn from ", _table , "  where  ", _seqn_field , " REGEXP '[[:digit:]]' and ", _key_field ," = ",  "'",_main_key,"';");
    SET @STATEMENT = _SQL;
    PREPARE DYNQUERY FROM @STATEMENT;
    EXECUTE DYNQUERY;
	DEALLOCATE PREPARE DYNQUERY;
END
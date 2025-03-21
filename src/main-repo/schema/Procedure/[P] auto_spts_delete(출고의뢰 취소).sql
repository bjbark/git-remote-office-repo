/*

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_MAST',
''
)

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_ITEM',
''
)

select * from seqn_dflt where tabl_name = 'ETOT_TRST_ITEM'

*/

drop procedure if exists `auto_spts_delete`;

CREATE PROCEDURE `auto_spts_delete`(
     _stor  varchar(50),
     _invc_numb  varchar(50)
    )
begin
    declare _new_invc_numb    varchar(50);
	
-- call fn_seq_gen_v3(_stor , 'spts_mast','',_new_invc_numb);

update acpt_mast set acpt_stat_dvcd = '0100' 
where  invc_numb in (select acpt_numb 
                     from   spts_item
					 where  invc_numb = _invc_numb
					 and    line_stat in ('1')
					 and    line_clos in ('0')
					) 
;

delete from spts_item 
where  invc_numb  = _invc_numb
;

delete from spts_mast
where  invc_numb  = _invc_numb
;
		
end
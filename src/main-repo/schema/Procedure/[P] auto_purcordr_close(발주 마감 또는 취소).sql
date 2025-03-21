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

drop procedure if exists `auto_purcordr_close`;

CREATE  PROCEDURE `auto_purcordr_close`(
     _stor       varchar(50),
     _invc_numb  varchar(50),
	 _close_flag    varchar(4)
    )
begin

update purc_ordr_mast set line_clos = _close_flag
where  invc_numb = _invc_numb
;
		
end
/*

call fn_seq_gen_v3_test (
'PJOD_MAST'
)

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_ITEM',
''
)

select * from seqn_dflt where tabl_name = 'ETOT_TRST_ITEM'

call auto_spts_insert('xxx')


select * from acpt_mast;


call auto_project_copy('N1000WINFO','SO-1900000073', '20190830');



select * from acpt_item where invc_numb in ('SO-1900000073','SO-1900000084');


*/




drop procedure if exists `fn_seq_gen_v3_test`;

create  procedure `fn_seq_gen_v3_test`(
       _tabl_name  varchar(50)
    ) 
begin
    declare _new_invc_numb    varchar(50);
    declare _max_amnd         int;
    declare _stor             varchar(50);
	
	select optn_char_valu   into _stor
	from   optn_mast
	where  optn_name = '본사ID'
	;

	
call fn_seq_gen_v3(_stor , _tabl_name,'',_new_invc_numb);


select _stor, _new_invc_numb
;

		
end





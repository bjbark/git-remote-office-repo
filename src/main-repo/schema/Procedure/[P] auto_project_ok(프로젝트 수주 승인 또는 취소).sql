/*

call auto_project_ok (
'test',
'1'
)

*/

drop procedure if exists `auto_project_ok`;

CREATE PROCEDURE `auto_project_ok`(
     _invc_numb  varchar(50),
	 _ok_flag    varchar(4)
    )
begin

update pjod_mast set cofm_yorn = _ok_flag
                   , cofm_date = case _ok_flag when '1' then date_format(now(),'%Y%m%d') else null end
where  pjod_idcd = _invc_numb
;
		
end
Ext.define('lookup.popup.membership.model.PntMemberPopup',{ extend:'Axt.data.Model',
	fields: [
	  		{	name: 'mmb_id'              , type: 'string'   /*  회원ID          */
	 		},{	name: 'mmb_nm'              , type: 'string'   /*  회원명         */
	 		},{	name: 'mmb_nicnm'           , type: 'string'   /*  회원별명      */
	 		},{	name: 'tel_no'              , type: 'string'   /*  전화번호      */
	 		},{	name: 'entry_dt'            , type: 'string'   /*  가입일자      */ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
	 		},{	name: 'bth_dt'              , type: 'string'   /*  생년월일      */ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
	 		},{	name: 'sex_gbcd'            , type: 'string'   /*  성별구분코드  */
	 		},{	name: 'local_nm'            , type: 'string'   /*  지역명        */
	 		},{	name: 'etc_id'              , type: 'string'   /*  기타ID       */
	 		},{	name: 'passwd'              , type: 'string'   /*  비밀번호      */
	 		},{	name: 'mmb_sts'             , type: 'string'   /*  회원상태      */
	 		},{	name: 'pnt_incr'            , type: 'float'    /*  포인트증가   */ , defaultValue : 0
	 		},{	name: 'pnt_sbtr'            , type: 'float'    /*  포인트차감   */ , defaultValue : 0
	 		},{	name: 'cur_pnt'             , type: 'float'    /*  현재포인트   */ , defaultValue : 0
	 		},{	name: 'user_memo'            , type: 'string'   /*  사용자메모   */
	 		},{	name: 'sys_memo'            , type: 'string'   /*  시스템메모   */
	 		},{	name: 'prnt_id'             , type: 'string'   /*  아이디         */
	 		},{	name: 'row_lvl'             , type: 'string'   /*  ROW레벨         */, defaultValue : 0
	 		},{	name: 'row_ord'             , type: 'float'    /*  ROW순서         */ , defaultValue : 0
	 		},{	name: 'row_sts'             , type: 'string'   /*  상태(진행)    */ , defaultValue: '0'
	 		},{	name: 'row_clos'            , type: 'string'   /*  마감여부      */
	 		},{	name: 'find_name'             , type: 'string'   /*  찾기명         */
	 		},{	name: 'upt_usr_nm'          , type: 'string'   /*  수정사용자명*/
	 		},{	name: 'upt_ip'              , type: 'string'   /*  수정IP          */
	 		},{	name: 'upt_dttm'            , type: 'string'   /*  수정일시      */
	 		},{	name: 'upt_id'              , type: 'string'   /*  수정아이디   */ , defaultValue: _global.login_pk
	 		},{	name: 'upt_ui'              , type: 'string'   /*  수정UI          */
	 		},{	name: 'crt_usr_nm'          , type: 'string'   /*  작성사용자명*/
	 		},{	name: 'crt_ip'              , type: 'string'   /*  작성IP          */
	 		},{	name: 'crt_dttm'            , type: 'string'   /*  작성DTTM        */
	 		},{	name: 'crt_id'              , type: 'string'   /*  작성아이디   */ , defaultValue: _global.login_pk
	 		},{	name: 'crt_ui'              , type: 'string'   /*  작성UI          */
 		}
 	]
});

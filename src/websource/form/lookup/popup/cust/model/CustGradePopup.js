Ext.define('lookup.popup.cust.model.CustGradePopup',{ extend:'Axt.data.Model', 
    fields: [
 	 	{name: 'hq_id',         		type: 'string'  , defaultValue : _global.hq_id },
	    {name: 'stor_grp',        		type: 'string'  , defaultValue : _global.stor_grp },
	    {name: 'shr_yn',         	    type: 'string'  },
	    {name: 'grade_id',         		type: 'string'  },
	    {name: 'grade_cd',         		type: 'string'  },
	    {name: 'grade_nm',         		type: 'string'  },
	    {name: 'pnt_rt',         	type: 'float'   },
        {name: 'user_memo', 	        type: 'string'  },
        {name: 'row_sts',             type: 'string' , defaultValue: '0' },
        {name: 'upt_ui',             type: 'string' , defaultValue : '0000000014' },     /* 데이터 수정 UI */
        {name: 'crt_ui',             type: 'string' , defaultValue : '0000000014' },     /* 데이터 생성 UI */
        {name: 'upt_id',             type: 'string' , defaultValue : _global.login_pk }, /* 데이터 수정 ID */
        {name: 'crt_id',             type: 'string' , defaultValue : _global.login_pk }  /* 데이터 생성 ID */
    ]
});

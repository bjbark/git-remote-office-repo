Ext.define('module.notice.noticeview.view.NoticeViewListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-noticeview-lister-master',
	store		: 'module.notice.noticeview.store.NoticeViewMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	} ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		, '사용'			)	, width :  50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center' , hidden:true
					},{ dataIndex: 'invc_numb'		, text : Language.get('ntce_numb'		, '공지번호'		)	, width :  90	, align : 'center', hidden:true
					},{ dataIndex: 'bord_idcd'		, text : Language.get('bord_idcd'		, '게시판ID'		)	, width :  90	, align : 'center', hidden:true
					},{ dataIndex: 'ntce_ttle'		, text : Language.get('ntce_ttle'		, '제목'			)	, width : 200	, align : 'left'
					},{ dataIndex: 'sbsd_ttle'		, text : Language.get('sbsd_ttle'		, '부제목'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'dwup_empy_name'	, text : Language.get('empy_name'		, '작성사원명'		)	, width :  80	, align : 'left'
					},{ dataIndex: 'ntce_stdt'		, text : Language.get('ntce_stdt'		, '공지시작일자'	)	, width : 100	, align : 'center'
					},{ dataIndex: 'ntce_eddt'		, text : Language.get('ntce_eddt'		, '공지종료일자'	)	, width : 100	, align : 'center'
					},{ dataIndex: 'dwup_date'		, text : Language.get('dwup_date'		, '작성일자'		)	, width : 100	, align : 'center'
					},{ dataIndex: 'dwup_time'		, text : Language.get('dwup_time'		, '작성시간'		)	, width : 100	, hidden:true
					},{ dataIndex: 'dwup_empy_idcd'	, text : Language.get('dwup_empy_idcd'	, '작성사원ID'	)	, width : 150	, hidden:true
					},{ dataIndex: 'ntce_cont'		, text : Language.get('ntce_cont'		, '공지내용'		)	, width : 500	, align : 'left', hidden:true
					},{ dataIndex: 'emgc_yorn'		, text : Language.get('emgc_yorn'		, '긴급'			)	, width :  60	, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'scrt_yorn'		, text : Language.get('scrt_yorn'		, '보안'			)	, width :  60	, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),hidden:true
					},{ dataIndex: 'ansr_yorn'		, text : Language.get('ansr_yorn'		, '답여부'		)	, width :  60	, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),hidden:true
					},{ dataIndex: 'pswd'			, text : Language.get('pswd'			, '비밀번호'		)	, width :  80	, align : 'left', hidden:true
					},{ dataIndex: 'mail_addr'		, text : Language.get('mail_addr'		, '이메일주소'		)	, width : 100	, align : 'center', hidden:true
					},{ dataIndex: 'mail_ansr_yorn'	, text : Language.get('mail_ansr_yorn'	, '이메일답여부'	)	, width : 100	, align : 'center', hidden:true
					},{ dataIndex: 'tele_numb'		, text : Language.get('tele_numb'		, '전화번호'		)	, width : 110	, align : 'left', hidden:true
					},{ dataIndex: 'inqy_qntt'		, text : Language.get('inqy_qntt'		, '조회수'		)	, width : 100	, align : 'left', hidden:true
					},{ dataIndex: 'ansr_cont'		, text : Language.get('ansr_cont'		, '답내용'		)	, width : 250	, align : 'left', hidden:true
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		, '비고'			)	, flex : 250	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});

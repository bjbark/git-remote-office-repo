Ext.define('module.workshop.sale.order.estilist.view.EstiListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workshop-estilist-lister'			,
	store		: 'module.workshop.sale.order.estilist.store.EstiList'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{	text : '<span class="write-button">파일업로드</span>', action : 'fileAction'		, cls: 'button1-style',width : 80 	},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'수주확정'	)	, width : 70 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'견적번호'	)	, width : 100 , align : 'center'
					},{ dataIndex: 'mmbr_name'		, text : Language.get('mmbr_name'		,'회원명'	)	, width : 110
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'견적일자'	)	, width : 100, align : 'center'
					},{ dataIndex: 'ttle'			, text : Language.get('ttle'			,'주문명'	)	, width : 120
//					},{ dataIndex: 'cofm_dttm'		, text : Language.get('cofm_dttm'		,'확정일시'	)	, width : 100
					},{ dataIndex: 'dlvy_mthd_dvcd'	, text : Language.get('dlvy_mthd_dvcd'	,'배송방법'	)	, width : 100 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('dlvy_mthd_dvcd')
					},{ dataIndex: 'dlvy_memo'		, text : Language.get('dlvy_memo'		,'배송메모'	)	, width : 120
					},{ dataIndex: 'work_memo_item'	, text : Language.get('work_memo_item'	,'주문메모'	)	, width : 120
					},{ dataIndex: 'tele_numb'		, text : Language.get('tele_numb'		,'전화번호'	)	, width : 100 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'소속회사')	, width : 100
					},{ dataIndex: 'clss_desc'		, text : Language.get('clss_desc'		,'품목분류'	)	, width : 140
					},{ dataIndex: 'prnt_colr_name'	, text : Language.get('prnt_colr_name'	,'컬러'		)	, width : 100
					},{ dataIndex: 'prnt_mthd_dvcd'	, text : Language.get('prnt_mthd_dvcd'	,'인쇄방법'	)	, width : 100	, align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('prnt_mthd_dvcd')
					},{ dataIndex: 'shet_name'		, text : Language.get('shet_name'		,'원단명'	)	, width : 100
					},{ dataIndex: 'shet_size_dvcd'	, text : Language.get('shet_size_dvcd'	,'사이즈'	)	, width : 100	, align : 'center',  xtype:'lookupcolumn',lookupValue:resource.lookup('shet_size_dvcd')
					},{ dataIndex: 'page_qntt'		, text : Language.get('page_qntt'		,'페이지'	)	, width :  80	, xtype:'numericcolumn'
					},{ dataIndex: 'volm_qntt'		, text : Language.get('volm_qntt'		,'권'		)	, width :  60	, xtype:'numericcolumn'
					},{ dataIndex: 'bkbd_kind_name'	, text : Language.get('bkbd_kind_name'	,'제본'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'bkbd_dirt_dvcd'	, text : Language.get('bkbd_dirt_dvcd'	,'제본방향'	)	, width : 100	, align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('bkbd_dirt_dvcd')
					},{ dataIndex: 'bkbd_bind'		, text : Language.get('bkbd_bind'		,'제본철'	)	, width : 100	, align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('bkbd_bind')
					},{ dataIndex: 'dirt_dvcd'		, text : Language.get('dirt_dvcd'		,'제작방향'	)	, width :  90	, align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('dirt_dvcd')
					},{ dataIndex: 'esti_pric'		, text : Language.get('esti_pric'		,'견적단가'	)	, width :  90	, xtype:'numericcolumn'
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액'	)	, width : 100 , xtype:'numericcolumn'
					},{ dataIndex: 'esti_amnt_covr'	, text : Language.get('esti_amnt_covr'	,'표지금액'	)	, width : 100 , xtype:'numericcolumn'
					},{ dataIndex: 'esti_amnt_indx'	, text : Language.get('esti_amnt_indx'	,'간지단가'	)	, width : 100 , xtype:'numericcolumn'
					},{ dataIndex: 'etcc_proc_amnt'	, text : Language.get('etcc_proc_amnt'	,'기타가공금액')	, width : 100 , xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});
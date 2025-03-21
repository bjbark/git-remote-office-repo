Ext.define('module.sale.project.prjtchangelist.view.PrjtChangeListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtchangelist-lister',
	store		: 'module.sale.project.prjtchangelist.store.PrjtChangeList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
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

					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'		) , width :  80 , align : 'center'
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'변경차수'		) , width :  60 , align : 'center'
					},{	dataIndex: 'amnd_degr'		, text : Language.get('amnd_degr'		,'AMD'		) , width :  40 , align : 'center', hidden : true
					},{	dataIndex: 'pjod_dvcd'		, text : Language.get('pjod_dvcd'		,'구분'		) , width :  40 , xtype : 'lookupcolumn', lookupValue : resource.lookup('pjod_dvcd'), align : 'center'
					},{	dataIndex: 'expt_dvcd'		, text : Language.get('expt_dvcd'		,'내수/수출'	) , width :  70 , xtype : 'lookupcolumn', lookupValue : resource.lookup('expt_dvcd'), align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width :  80 , align : 'center',hidden:true
					},{ dataIndex: 'item_code'		, text : Language.get('acpt_numb'		,'금형코드'		) , width : 100 , align : 'center',hidden:true
					},{ dataIndex: 'item_name'		, text : Language.get('acpt_case_name'	,'금형명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'cstm_item_code'	, text : Language.get('cstm_item_code'	,'고객품목코드'	) , width : 170 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'금형규격'		) , width : 170 , align : 'left',hidden:true
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'차종명'		) , width : 120 , align : 'left'
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액'		) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{ dataIndex: 'regi_date'		, text : Language.get('regi_date'		,'등록일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'승인'		) , width :  50 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'apvl_drtr_name'	, text : Language.get('apvl_drtr_name'	,'승인담당자'	) , width :  85 , align : 'left'
					},{	dataIndex: 'change_regi_date', text : Language.get('change_regi_date','변경등록일자'	) , width :  95 , align : 'center'
					},{	dataIndex: 'change_item_name', text : Language.get('change_item_name','변경품목'	) , width : 180 , align : 'left'
					},{	dataIndex: 'change_item_spec', text : Language.get('change_item_spec','변경규격'	) , width : 150 , align : 'left',hidden:true
					},{	dataIndex: 'chge_resn'		, text : Language.get('chge_resn'		,'변경사유'		) , width : 180 , align : 'left'
					},{	dataIndex: 'cpst_dvcd'		, text : Language.get('cpst_dvcd'		,'유무상구분'	) , width :  90 , align : 'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('cpst_dvcd')
					},{	dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액'		) , width :  90 , align : 'right'  , xtype : 'numericcolumn', hidden:true
					},{	dataIndex: 'chge_deli_date'	, text : Language.get('chge_deli_date'	,'조정납기일자'	) , width :  90 , align : 'center'
					},{	dataIndex: 'frst_exam_date'	, text : Language.get('frst_exam_date'	,'1차시험일자'	) , width :  90 , align : 'center'
					},{	dataIndex: 'send_exam_date'	, text : Language.get('send_exam_date'	,'2차시험일자'	) , width :  90 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});
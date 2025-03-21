Ext.define('module.qc.project.losswork.view.LossWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-losswork-lister-master',
	store		: 'module.qc.project.losswork.store.LossWorkMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary'  } ],
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
					{	text : '<span class="write-button">손실공수 통보서</span>', action : 'report', cls: 'button-style', width: 100	} ,
					'->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'번호'			) , width :  80 , align : 'center',hidden:true
					},{	dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'		) , width :  80 , align : 'center'
					},{ dataIndex: 'prts_name'		, text : Language.get('prts_name'		,'부품명'		) , flex  :  1
					},{	dataIndex: 'invc_date'		, text : Language.get('regi_date'		,'등록일자'		) , width :  100 , align : 'center'
					},{	dataIndex: 'occr_date'		, text : Language.get('occr_date'		,'발생일자'		) , width :  100 , align : 'center'
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'사상팀명'		) , width :  100
					},{ dataIndex: 'resp_dept_name'	, text : Language.get('resp_dept_name'	,'귀책팀명'		) , width :  100
					},{	dataIndex: 'proc_date'		, text : Language.get('proc_date'		,'처리일자'		) , width :  100 , align : 'center'
					},{ dataIndex: 'wker_name'		, text : Language.get('dups'			,'작성자'		) , width :  80
					},{ dataIndex: 'cnfm_drtr_name'	, text : Language.get('cnfm_drtr_name'	,'확인자'		) , width :  80
					},{ dataIndex: 'loss_dvcd'		, text : Language.get('loss_dvcd'		,'분류'			) , width :  80, xtype : 'lookupcolumn', lookupValue : resource.lookup('loss_dvcd'), align : 'center'
					},{ dataIndex: 'loss_amnt_ttsm'	, text : Language.get('loss_amnt_ttsm'	,'손실금액합계'	) , width :  100,xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});
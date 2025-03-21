Ext.define('module.prod.project.prjtworklist.view.PrjtWorkListListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtworklist-lister-detail1',
	store		: 'module.prod.project.prjtworklist.store.PrjtWorkListDetail1',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width :  50 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('rept_date'		,'보고일자'	) , width :  90 , align : 'center'
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'	) , width :  70 , align : 'center'
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'	) , width :  70 , align : 'center'
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드'	) , width :  80 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'	) , width :  80 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'작업내용'	) , width : 300 , align : 'left'
					},{ dataIndex: 'wker_1fst_name'	, text : Language.get('wker_1fst_name'	,'책임자1'	) , width :  80 , align : 'left'
					},{ dataIndex: 'wker_2snd_name'	, text : Language.get('wker_2snd_name'	,'책임자2'	) , width :  80 , align : 'left'
					},{ dataIndex: 'wker_3trd_name'	, text : Language.get('wker_3trd_name'	,'책임자3'	) , width :  80 , align : 'left'
					},{ dataIndex: 'progress'		, text : Language.get('progress'		,'진척율'	) , width :  70 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
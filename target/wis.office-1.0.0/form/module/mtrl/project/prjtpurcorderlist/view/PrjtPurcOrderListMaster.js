Ext.define('module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtpurcorderlist-master',
	store		: 'module.mtrl.project.prjtpurcorderlist.store.PrjtPurcOrderListMaster',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	columnLines : true,

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'invc_numb'		, text : Language.get('istt_numb'		,'입고번호'		) , width : 170 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('istt_date'		,'입고일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'user_name'		, text : Language.get('drtr_name'		,'입고담당'		) , width : 100 , align : 'left'
					},{ dataIndex: 'istt_dvcd'		, text : Language.get('istt_dvcd'		,'입고구분'		) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('istt_dvcd')
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 250 , align : 'left'
					}
				]
			}
		;
		return item;
	},


});

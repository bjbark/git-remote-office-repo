Ext.define('module.qc.project.losswork.view.LossWorkListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-losswork-lister-detail',
	store		: 'module.qc.project.losswork.store.LossWorkDetail',
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
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
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'번호'		) , width :  80 , align : 'center',hidden:true
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width :  50 , align : 'center'
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'가공내용'	) , flex  :  1
					},{	dataIndex: 'work_time'		, text : Language.get('work_time'		,'가공시간'	) , width :  100 , align : 'center'
					},{	dataIndex: 'work_pric'		, text : Language.get('work_pric'		,'단가'		) , width :  100 ,xtype:'numericcolumn'
					},{ dataIndex: 'loss_amnt'		, text : Language.get('loss_amnt'		,'손실금액'	) , width :  150,xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});
Ext.define('module.prod.wmold.wmoldcheck.view.WmoldCheckListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wmoldcheck-lister-detail2',
	store		: 'module.prod.wmold.wmoldcheck.store.WmoldCheckDetail2',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 50 , align : 'center'
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'점검일자'	) , width : 100 , align : 'center'
					},{ dataIndex: 'chek_time'		, text : Language.get('chek_time'		,'점검시간'	) , width : 80 , align : 'center'
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'부서명'	) , width : 130
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자명'	) , width : 100
					},{ dataIndex: 'base_clen'		, text : Language.get('base_clen'		,'베이스세정') , width : 80 , xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'lbct_appl'		, text : Language.get('lbct_appl'		,'구리스도포') , width : 80 , xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'airr_clen'		, text : Language.get('airr_clen'		,'에어청소'	) , width : 80 , xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'core_clen'		, text : Language.get('core_clen'		,'코아세정'	) , width : 80 , xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'core_rust'		, text : Language.get('core_rust'		,'코아방청'	) , width : 80 , xtype : 'lookupcolumn', lookupValue:resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});
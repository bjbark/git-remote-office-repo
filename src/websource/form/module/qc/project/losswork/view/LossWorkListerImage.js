Ext.define('module.qc.project.losswork.view.LossWorkListerImage', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-losswork-lister-image',
	store		: 'module.qc.project.losswork.store.LossWorkImage',
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
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
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
					},{ dataIndex: 'imge_1fst'		, text : Language.get('imge_1fst'		,'이미지'	) , flex  :  1,
						renderer:function(value){
							img = new Uint8Array(value.split(","));
							blob = new Blob([img],{type:'image/png'})
							url = URL.createObjectURL(blob);
							return '<img src="'+url+'"/>';
						}
					}
				]
			}
		;
		return item;
	}
});
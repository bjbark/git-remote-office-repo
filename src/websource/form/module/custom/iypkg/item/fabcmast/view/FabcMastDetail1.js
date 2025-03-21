Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastDetail1', { extend: 'Axt.grid.Panel',

	alias	: 'widget.module-fabcmast-detail1',
	store	: 'module.custom.iypkg.item.fabcmast.store.FabcMastDetail1',

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_name'	, text : Language.get(''	,'거래처명'		) , width : 140 , align : 'left'
					},{ dataIndex: 'puch_pric'	, text : Language.get(''	,'단가/m2'	) , width : 100 , align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'adpt_date'	, text : Language.get(''	,'적용일자'		) , width : 120 , align : 'center',
					},{ dataIndex: 'befr_pric'	, text : Language.get(''	,'이전단가/m2'	) , width : 100 , align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'updt_dttm'	, text : Language.get(''	,'변경일자'		) , width : 120 , align : 'center',
						renderer:function(val){
							var value;
							if(val != ''){
								value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							}else{
								value = '';
							}
							return value;
						}
					}
				]
			}
		;
		return item;
	}

});

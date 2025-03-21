Ext.define('module.custom.komec.item.itemlist.view.ItemListPkgeLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-pkgelister'			,
	store		: 'module.custom.komec.item.itemlist.store.ItemListPkge'	,
	selModel	: { selType: 'cellmodel'},

	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this,
			lookupValues = new Array()
		;
		Ext.Ajax.request({
			url		: _global.location.http() + '/item/itemmast/get/pckg_bacd.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i =0; i<result.records.length;i++){
						lookupValues.push([result.records[i].base_code,result.records[i].base_name]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});



		me.paging  = me.pagingItem();
		me.columns = me.columnItem(lookupValues);
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},


	columnItem : function (lookupValues) {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'pckg_bacd'			, width : 160, align : 'center'		, text: Language.get( 'pckg'		, '포장용기'	) , xtype : 'lookupcolumn' , lookupValue : lookupValues,
					},{	dataIndex:	'pckg_qntt'			, width : 100, align : 'right'		, text: Language.get( 'pckg_qntt'		, '포장수량'	), xtype : 'numericcolumn' ,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							minValue	: 0
						},
					},{ dataIndex: 'base_yorn'			, width :  60 , text : Language.get( 'base_yorn'		, '기본값'	), xtype : 'checkcolumn', processEvent:me.checkboxProcessEvent
					}
				]
			}
		;
		return item;
	},
	checkboxProcessEvent : function(name, grid, view, rowIndex, colIndex) {
		if (name == 'click') {
			var select	= grid.store.getAt(rowIndex),
				store	= grid.getStore();
			;
			store.each(function(record){
				if(record.get('pckg_bacd')!=select.get('pckg_bacd')){
					record.set('base_yorn',0);
				}else{
					record.set('base_yorn',1);
				}
			});
			Ext.ComponentQuery.query('module-itemlist-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
	listeners:{
		edit:function(){
			Ext.ComponentQuery.query('module-itemlist-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
});

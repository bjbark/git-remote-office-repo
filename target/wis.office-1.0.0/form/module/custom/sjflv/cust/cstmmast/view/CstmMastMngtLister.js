Ext.define('module.custom.sjflv.cust.cstmmast.view.CstmMastMngtLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmmast-mngtlister'			,
	store		: 'module.custom.sjflv.cust.cstmmast.store.CstmMastMngt'	,
	selModel	: { selType: 'cellmodel'},

	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		var typeName='textfield', columnName='',mngtLookup = new Array(),tempString='';
		mngtLookup = [];
		if((_global.hq_id).toUpperCase()=='N1000HJSYS'){
			typeName = 'lookupfield'
			columnName = 'lookupcolumn'
			Ext.Ajax.request({
				url		: _global.location.http() + '/cust/cstmmast/get/mngt.do',
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
						if(result.records[0]){
							tempString = result.records[0].user_memo;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
		if(tempString!=''){
			var arr = tempString.split(',');
			for (var i = 0; i < arr.length; i++) {
				var keyval = arr[i].split(':');
				mngtLookup.push([keyval[0].trim(),keyval[1].trim()]);
			}
		}
		me.paging  = me.pagingItem();
		me.columns = me.columnItem(typeName,columnName,mngtLookup);
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
	columnItem : function (typeName,columnName,mngtLookup) {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'cstm_idcd'			, width:  80 , align : 'center'	, text: Language.get( 'cstm_idcd'		, '거래처ID'		) ,hidden : true
					},{	dataIndex:	'mngt_sbsc_name'	, width:  300, align : 'left'	, text: Language.get( 'mngt_sbsc_name'	, '관리항목명'	),
					},{	dataIndex:	'mngt_sbsc_valu'	, width : 300, align : 'left'	, text: Language.get( 'mngt_sbsc_valu'	, '관리항목값'	),xtype:columnName,lookupValue:mngtLookup,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		: typeName,
							lookupValue	: mngtLookup,
							selectOnFocus: true,
							allowBlank	: true
						},
					}
				]
			}
		;
		return item;
	},

	listeners:{
		edit:function(){
			Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
});

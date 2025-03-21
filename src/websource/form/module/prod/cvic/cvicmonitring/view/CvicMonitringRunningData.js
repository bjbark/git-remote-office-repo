Ext.define('module.prod.cvic.cvicmonitring.view.CvicMonitringRunningData', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cvicmonitring-runndata',
	store		: 'module.prod.cvic.cvicmonitring.store.CvicMonitringRunningData',
	border		: 0,
	columnLines : false,
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: false },
	initComponent: function () {
		var me = this;
			me.columns = me.columnItem();
			me.callParent();
	},
	hideHeaders : true ,
	listeners:{
		afterrender:function(){
			var today = this.dateFormat();
			this.getStore().load({
				params : {
					param:JSON.stringify({invc_date : today})
				},
				callback : function(records,operation,success){
				}
			})
		}
	},
	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{	dataIndex:	'cvic_name'			, text : Language.get('cvic_name'	, '')	, flex : 1, align : 'center'
					},{	dataIndex:	'title'				, text : Language.get('title'		, '')	, flex : 1, align : 'center'
					},{	dataIndex:	'runn_data'			, text: Language.get( 'runn_data'	, '')	, flex : 1, align : 'center'
					}
				]
			}
		;
		return item;
	},
	dateFormat:function(){
		var date = new Date(),
			yyyy = date.getFullYear().toString(),
			mm = (date.getMonth()+1).toString(),
			dd = date.getDate().toString()
		;
		if(mm < 10){
			mm = '0'+mm;
		}
		if(dd < 10){
			dd = '0'+dd;
		}
		return yyyy+mm+dd;
	}
});
Ext.define('module.custom.komec.eis.eisreport.view.EisReportLister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-eisreport-lister3',
	store		: 'module.custom.komec.eis.eisreport.store.EisReportGraph',
	split		: true,
	selModel	: { selType: 'checkboxmodel',mode:'SINGLE'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	initComponent: function () {
		var rowIndexNum;
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
//				dockedItems : [ me.createLine1() ],
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls : _global.options.work_book_tema + 'grid',
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'dttm'			, text : Language.get('dttm'			,'시간'	) , width : 120 ,
						renderer: function (value, metaData, record) {
							if (record.get('temperature') == '0') {
								metaData.style = 'background-color: red;';
							}
							return value;
						}
					},{ dataIndex: 'temperature'	, text : Language.get('temperature'			,'온도'	) , width :  60 , xtype : 'numericcolumn', format : '0.0',
						renderer: function (value, metaData, record) {
							if (record.get('temperature') == '0') {
								metaData.style = 'background-color: red;';
							}
							return Ext.util.Format.number(value, '0.0');
						}
					},{ dataIndex: 'rpm'			, text : Language.get('rpm'			,'RPM'	) , width : 60 , xtype : 'numericcolumn',
						renderer: function (value, metaData, record) {
							if (record.get('temperature') == '0') {
								metaData.style = 'background-color: red;';
							}
							return value;
						}
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'	,'공정명'	) , width :  110 ,
						renderer: function (value, metaData, record) {
							if (record.get('temperature') == '0') {
								metaData.style = 'background-color: red;';
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

Ext.define('module.custom.iypkg.eis.cvicmonitring.view.CvicMonitringMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cvicmonitring-lister-master',
	store		: 'module.custom.iypkg.eis.cvicmonitring.store.CvicMonitringMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return "Eiscell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},

	pagingItem : function () {
		var me = this,
			cvic = {

			};
		return cvic ;
	},

	columnItem : function () {
		var me = this,
			cvic = {
				region	: 'center',
				cls		: 'Eisgrid2',
				defaults: {style: 'text-align: center;font-size:6em !important;'},
				items	: [
					{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'	,'설비명'		) , align : 'left'	 , width : 320
					},{ dataIndex: 'cvic_stat'		, text : Language.get(''			,'가동상태'		) , align : 'center' , width : 160
					},{ dataIndex: 'strt_time'		, text : Language.get(''			,'시작시간'		) , align : 'center' , width : 170
					},{ dataIndex: 'tody_qntt'		, text : Language.get(''			,'금일생산량'	) , align : 'right' , width : 180, xtype : 'numericcolumn', format: '#,##0'
					},{ dataIndex: 'week_qntt'		, text : Language.get(''			,'금주누적생산량'	) , align : 'right' , width : 250, xtype : 'numericcolumn', format: '#,##0'
					},{ dataIndex: 'monh_qntt'		, text : Language.get(''			,'월간누적생산량'	) , align : 'right' , width : 250, xtype : 'numericcolumn', format: '#,##0'
					},{ dataIndex: 'prod_name'		, text : Language.get(''			,'현재작업품목'	) , align : 'left'  , width : 530
					}
				]
			}
		;
		return cvic;
	}
});

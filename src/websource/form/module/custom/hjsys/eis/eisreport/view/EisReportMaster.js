Ext.define('module.custom.hjsys.eis.eisreport.view.EisReportMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-eisreport-lister-master',
	store		: 'module.custom.hjsys.eis.eisreport.store.EisReportMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }, ],
	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
		me.selection();
	},
	listeners:{
		destroy:function(){
			clearInterval(window.hjsysEisMaster);
		}
	},
	viewConfig: {
		getRowClass : function ( record , index ) {
			var me = this;
			var cls = 'Eiscell';
			if(record.get('emgc_yorn')==1){
				cls += ' btnTemp';
			}
			return cls
		},
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					for(var j = 0; j < cells.length; j++) {
						if(record.data.emgc_yorn == 1){													// 발주
							Ext.fly(cells[j]).setStyle('background-color', 'red');
						}
					}
				}
			}
		}
	},
	columnItem : function () {
		var me = this,
			cvic = {
				cls		: 'Eisgrid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{	dataIndex: 'emgc_yorn'		, text : Language.get('line_stat'	,'상태'			) , width :  80	, align : 'center', xtype: 'lookupcolumn' , lookupValue: [['0','일반'],['1','긴급']]
					},{	dataIndex: 'ntce_cont'		, text : Language.get('ntce_cont'	,'공지내용'		) , flex : 1, minWidth : 530 , align : 'left',
					}
				]
			}
		;
		return cvic;
	},
	selection : function(){
		var me = this;
		setTimeout(function(){
			window.hjsysEisMaster = setInterval(function(){
				me.select({
					callback:function(records, operation, success) {
						if (success) {
						}
						else {}
					}
				}, Ext.merge( {stor_id : _global.stor_id}) );
			},30000)
			me.select({
				callback:function(records, operation, success) {
					if (success) {
					}
					else {}
				}
			}, Ext.merge( {stor_id : _global.stor_id}) );
		}, 500)

	}
});

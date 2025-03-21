Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Detail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport13-detail3',
	store		: 'module.custom.iypkg.eis.eisreport13.store.EisReport13Detail3',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			console.log(record.get('colt_month'));
			if(record.get('colt_month') == '3'){
				return 'line-month3';
			}else if(record.get('colt_month') == '2'){
				return 'line-month2';
			}
		}
	},

//	viewConfig: {
//		listeners: {
//			refresh: function(view) {
//				var nodes = view.getNodes();
//				for (var i = 0; i < nodes.length; i++) {
//					var node = nodes[i];
//					var record = view.getRecord(node);
//					var cells = Ext.get(node).query('td');
//					var tr = Ext.get(node).query('tr');
//
//					// 오늘날짜 구하기
//					var date = new Date();
//					var year = date.getFullYear();
//					var month = date.getMonth()+1;
//					if ((month+"").length < 2) {
//						month = "0" + month;
//					}
//					var day = date.getDate();
//					if ((day+"").length < 2) {
//						day = "0" + day;
//					}
//
//					// 받아온 일자를 -를 빼고 오늘날짜와 받아온 일자 둘다 배열로만듬
//					var a = record.data.invc_date;
//					var b = a.split('-');
//
//					var to1 = new Date(year, month, day);
//					var to2 = new Date(b[0],b[1],b[2]);
//
//					var dif = to1 - to2;
//
//					// 오늘날짜와 받아온날짜를 뺀값을 나누기 위해 필요한 값들
//					var cDay = 24 * 60 * 60 *1000;
//					var cMonth = cDay * 30;
//					var dif1 = parseInt(dif/cMonth);
////					console.log(dif1);
//
//					for(var j = 0; j < cells.length; j++) {
//						//글씨색
//						if(dif1 == 0 || dif1 == 1) {
//							Ext.fly(cells[j]).setStyle('color', 'black');
//						}else if(dif1 == 2){
//							Ext.fly(cells[j]).setStyle('color', 'green');
//						}else{
//							Ext.fly(cells[j]).setStyle('color', 'pink');
//						}
//					}
//				}
//			}
//		}
//	},



	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-eisreport13-search3'}];
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
					{	dataIndex: 'mm'				, text : Language.get('mm'			,'일자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'	,'거래처명'	) , width : 200 , align : 'left', hidden : true
					},{	dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'	,'매출액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'colt_amnt'		, text : Language.get('colt_amnt'	,'수금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'uncolt'			, text : Language.get('uncolt'		,'미수금'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});
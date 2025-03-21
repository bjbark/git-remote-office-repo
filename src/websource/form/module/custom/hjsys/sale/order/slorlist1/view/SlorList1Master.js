Ext.define('module.custom.hjsys.sale.order.slorlist1.view.SlorList1Master', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-slorlist1-lister-master',
	store		: 'module.custom.hjsys.sale.order.slorlist1.store.SlorList1Master'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	viewConfig: {
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
					for(var j = 0; j < cells.length; j++) {
						if(j > 12){
							if(record.data.wkct == '계획') {
								Ext.fly(cells[j]).setStyle('color', '#0000CD');
							}else if(record.data.wkct == '실적') {
								Ext.fly(cells[j]).setStyle('color', '#1c751c');

							}


						}
					}
				}
			}
		}
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'			,'마감'			) , width : 35, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, text : Language.get('acpt_stat_dvcd'		,'진행상태'		) , width : 60, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('acpt_stat_dvcd'), hidden : false
					},{	dataIndex: 'esti_cnfm_yorn'	, text : Language.get('esti_cnfm_yorn'		,'견적'			) , width : 45, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text: Language.get(''	,'도면체크'		), dataIndex : ''	, align : 'center',hidden : true,
						columns: [
							{	dataIndex: 'drwg_cnfm_yorn_1fst'	, text: Language.get(''		, '1'			) , width:  45, xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), align: 'center'
							},{	dataIndex: 'drwg_cnfm_yorn_2snd'	, text: Language.get(''		, '2'			) , width:  45, xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), align: 'center'
							}
						]
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '고객명'		) , width: 220, align: 'left', summaryType: 'count',
					},{	dataIndex: 'dlvy_cstm_name'	, text: Language.get('dlvy_cstm_name'	, '납품처'		) , width: 100, align: 'left'/* 부서 이름으로 들어갈 예정*/
					},{	dataIndex: 'invc_date'		, text: Language.get('invc_date'		, '수주일자'		) , width:  80, align: 'center'
					},{	dataIndex: 'deli_date'		, text: Language.get('deli_date'		, '납기일자'		) , width:  80, align: 'center'
					},{	dataIndex: 'invc_numb'		, text: Language.get('acpt_numb'		, '수주번호'		) , width: 120, align: 'center'
					},{	dataIndex: 'modl_name'		, text: Language.get('modl_name'		, '모델명'		) , width: 200, align: 'left', sortable:true
					},{ dataIndex: 'qntt_totl'		, text: Language.get('','품목수'			) , width : 90 , xtype : 'numericcolumn', align : 'right'
					},{	text: Language.get(''	,'수주량'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: 'unit_name'		, text: Language.get('unit_name'		, '단위'			) , width:  70, align: 'center', sortable:true
							},{	dataIndex: 'acpt_qntt'		, text: Language.get('acpt_qntt'		, '수주수량'		) , width:  70, xtype : 'numericcolumn', sortable:true
							}
						]
					},{	dataIndex: 'wkct'				, text : Language.get('wkct	' ,'구분'			) , width : 80  , align : 'center',
					},{ dataIndex: 'wkct_1'				, text : Language.get('wkct_1','설계'			) , width : 70  , align : 'right', sortable:true,
//							renderer: function(val,meta,rec) {
//								var indn = 0, work = 0,
//									store = Ext.ComponentQuery.query('module-slorlist1-lister-master')[0].getStore();
//									hidden_numb = rec.data.hidden_numb;
//								;
//								if(val > 0){
//
//	//								store.each(function(findrecord){
//	//									if(findrecord.get('hidden_numb') == rec.data.hidden_numb){
//	//										if(findrecord.get('wkct') == '계획' && val != ''){
//	//											indn = val;
//	//										}
//	//										if(rec.data.wkct == '실적' && val != ''){
//	//											work = val;
//	//										}
//	//										console.log(indn);
//	//										console.log(work);
//	//										if(indn == work){
//	//											meta.style = 'background-color : #FFD700';
//	//										}
//	//									}
//	//								});
//								}
//								return val;
//							},
					},{ dataIndex: 'wkct_2'				, text : Language.get('wkct_2','전개'		) , width : 70  , align : 'right', sortable:true,
//						renderer: function(val,meta,rec) {
//							var indn = 0, work = 0,
//								store = Ext.ComponentQuery.query('module-slorlist1-lister-master')[0].getStore();
//								hidden_numb = rec.data.hidden_numb;
//							;
//							if(val > 0){

//								store.each(function(findrecord){
//									if(findrecord.get('hidden_numb') == rec.data.hidden_numb){
//										if(findrecord.get('wkct') == '계획' && val != ''){
//											indn = val;
//										}
//										if(rec.data.wkct == '실적' && val != ''){
//											work = val;
//										}
//										console.log(indn);
//										console.log(work);
//										if(indn == work){
//											meta.style = 'background-color : #FFD700';
//										}
//									}
//								});
//							}
//							return val;
//						},
					},{ dataIndex: 'wkct_3'				, text : Language.get('wkct_3','CAM'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_4'				, text : Language.get('wkct_4','NCT'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_5'				, text : Language.get('wkct_5','LASER'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_6'				, text : Language.get('wkct_6','TAP'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_7'				, text : Language.get('wkct_7','면취'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_8'				, text : Language.get('wkct_8','홀면취'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_9'				, text : Language.get('wkct_9','장공면취'	) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_10'			, text : Language.get('wkct_10','버링'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_11'			, text : Language.get('wkct_11','압입1'		) , width : 75  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_12'			, text : Language.get('wkct_12','압입2'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_13'			, text : Language.get('wkct_13','확공'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_14'			, text : Language.get('wkct_14','C/S'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_15'			, text : Language.get('wkct_15','디버링'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_16'			, text : Language.get('wkct_16','절곡1'		) , width : 75  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_17'			, text : Language.get('wkct_17','절곡2'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_18'			, text : Language.get('wkct_18','사상'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_19'			, text : Language.get('wkct_19','용접1'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_20'			, text : Language.get('wkct_20','용접2'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_21'			, text : Language.get('wkct_21','빠우'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_22'			, text : Language.get('wkct_22','외주가공'	) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_23'			, text : Language.get('wkct_23','조립'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_24'			, text : Language.get('wkct_24','세척'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_25'			, text : Language.get('wkct_25','검사'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_26'			, text : Language.get('wkct_26','후 TAP'		) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_27'			, text : Language.get('wkct_27','전해연마'	) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'user_memo'			, text : Language.get('user_memo','비고'		) , flex  :  1  , align : 'left', minWidth : 200
					}
				]
			}
		;
		return item;
	}
});
Ext.define('module.custom.iypkg.prod.prodordr2.view.ProdOrdr2WritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodordr2-write-popup',
	store	: 'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master2',
	title	: '외주지시 등록' ,
	closable: true,
	autoShow: true,
	width	: 940,
	height	: 370,
	layout	: {
		type: 'border'
	},
	selModel	: { selType: 'cellmodel'},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(),me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		render:function(){
			var store = this.down('grid').getStore(),
				store2 = this.down('#grid2').getStore(),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id
				}, this.popup.params )
			;
			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});
			store2.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});
		},

	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       ,cls: 'button-style'}
					]
				}
			],
			items : me.editorForm2()
		};
		return form;
	},

	createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'north',
				name		: 'masterGrid',
				height		: 100,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create( me.store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex : 'invc_numb'		, width:  90, text: Language.get('', '수주번호'	) , align:'center'
					},{	dataIndex:	'cstm_name'		, width: 180, text: Language.get('', '거래처'	)
					},{	dataIndex:	'prod_name'		, width: 230, text: Language.get('', '품명'	)
					},{	dataIndex:	'item_leng'		, width:  60, text: Language.get('', '장'	) , align:'right'
					},{	dataIndex:	'item_widh'		, width:  60, text: Language.get('', '폭'	) , align:'right'
					},{	dataIndex:	'item_hght'		, width:  60, text: Language.get('', '고'	) , align:'right'
					},{	dataIndex:	'acpt_qntt'		, width:  80, text: Language.get('', '수주량'	) , align:'right'
					}
				]
			}
		;
		return grid;
	},

	editorForm2: function(){
		var  me            = this;
		var  store         = 'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Detail2';
		var  grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'bottom',
				height		: 210,
				itemId		: 'grid2',
				name		: 'grid2',
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : 'SINGLE' },
				store		: Ext.create( store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex: 'wkct_name'		, width:  80, align: 'center', text: Language.get('wkct_name'		, '공정명'		),
					},{	dataIndex: 'cstm_name'		, width: 170, align: 'left'  , text: Language.get('cstm_name'		, '외주처명'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처명 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params:{ stor_grp : _global.stor_grp , line_stat : '0', otod_cstm_yorn:'1'},
										result	: function(records) {
											var	parent = records[0]
											;
											record.set('cstm_idcd',parent.data.cstm_idcd);
											record.set('cstm_name',parent.data.cstm_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'cstm_idcd'		, hidden : true
					},{	dataIndex: 'wkun_dvcd'		, width: 100, align: 'left'  , text: Language.get('wkun_dvcd'		, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex: 'plan_qntt'		, width:  60, align: 'right' , text: Language.get('plan_qntt'		, '소요량'		), xtype : 'numericcolumn',
					},{	dataIndex: 'unoffr'			, width:  60, align: 'right' , text: Language.get(''				, '미발주'		), xtype : 'numericcolumn',
					},{	dataIndex: 'offr_qntt'		, width:  80, align: 'right' , text: Language.get('offr_qntt'		, '발주수량'	), xtype : 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{	dataIndex: 'unit_name'		, width:  70, align: 'center', text: Language.get('unit_name'		, '수량단위'	),
					},{	dataIndex: 'stnd_pric'		, width:  80, align: 'right' , text: Language.get('stnd_pric'		, '단가'		), xtype : 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex: 'offr_amnt'		, width:  80, align: 'right' , text: Language.get('offr_amnt'		, '발주금액'		), xtype : 'numericcolumn'
					},{	dataIndex: 'deli_date'		, width: 100, align: 'center', text: Language.get('deli_date'		, '납기일자'		), xtype : 'datecolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							minValue	: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						},
					},{	dataIndex: 'offr_vatx'		, width:  80, align: 'right' , text: Language.get('offr_vatx'		, '부가세액'		), xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'ttsm_amnt'		, width:  80, align: 'right' , text: Language.get('ttsm_amnt'		, '합계금액'		), xtype : 'numericcolumn', hidden : true
					}
				],
				cellEditAfter  : function (editor, context) {
					var me = this;
					var me = this;
					var unoffr		= this.getSelectionModel().getSelection()[0].data.unoffr;		//미발주잔량
					var qntt		= this.getSelectionModel().getSelection()[0].data.offr_qntt;	//발주할수량
					var pric		= this.getSelectionModel().getSelection()[0].data.stnd_pric;	//표준단가

					var amnt		= qntt*pric;					//공급가
					var vatx		= Math.floor((qntt*pric)*0.1);	//부가세
					var ttsm		= amnt+vatx;					//합계

					var grid		= this;
					var pos			= this.view.getSelectionModel().getCurrentPosition().row;
					var models		= grid.getStore().getRange();

					if(qntt > unoffr){
						Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
						models[pos].set('offr_qntt',0);
						models[pos].set('offr_amnt',0);
						models[pos].set('offr_vatx',0);
						models[pos].set('ttsm_amnt',0);
					}else if(qntt < 0){
						Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
						models[pos].set('offr_qntt',0);
						models[pos].set('offr_amnt',0);
						models[pos].set('offr_vatx',0);
						models[pos].set('ttsm_amnt',0);
					}else{
						models[pos].set('offr_amnt',amnt);
						models[pos].set('offr_vatx',vatx);
						models[pos].set('ttsm_amnt',ttsm);
					}

				},

				listeners: {
					edit : function(editor, context) {
						var me = this;
						me.cellEditAfter(editor, context);
					}
				}
			}
		;
		return grid;
	},

	//확인
	finishAction: function(){
		var me = this,
			grid	= me.down('#grid2'),
			store	= me.down('#grid2').getStore(),
			selects	= me.down('#grid2').getSelectionModel().getSelection()[0],
			record	= store.getUpdatedRecords(),
			changes	= store.getUpdatedRecords().length,
			a = new Array(),
			b = new Array()
		;

		if(changes != 0){
			for (var i = 0; i < changes; i++) {
				a.push(record[i].data.cstm_idcd);
				b.push(record[i].data.acpt_seqn);
			}

			for (var a = 0; a < changes; a++) {
				if(record[a].data.cstm_idcd == ''){
					Ext.Msg.alert("알림","외주 거래처를 선택해주십시오.");
					return;
				}else if(record[a].data.offr_qntt == 0){
					Ext.Msg.alert("알림","발주수량을 입력해주십시오.");
					return;
				}else if(record[a].data.deli_date == ''){
					Ext.Msg.alert("알림","납기일자를 입력해주십시오.");
					return;
				}
				store.getUpdatedRecords()[a].data.deli_date = Ext.util.Format.date(record[a].data.deli_date,'Y-m-d');
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			store.sync({
				success : function(operation){
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					me.setResponse();
					tpanel.items.indexOf(tpanel.setActiveTab(0));
					store.reload();
				}
			});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},



});
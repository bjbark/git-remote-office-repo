Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrWritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodordr-write-popup',
	store	: 'module.custom.iypkg.prod.prodordr.store.ProdOrdrWrite',
	title	: '생산지시 작성' ,
	closable: true,
	autoShow: true,
	width	: 1000,
	height	: 350,
	layout	: {
		type: 'border'
	},
	selModel	: { selType: 'cellmodel'},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		render:function(){
			var me		= this,
				store	= this.down('grid').getStore(),
				store2	= this.down('#grid2').getStore(),
				param	= Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id
				}, this.popup.params ),
				master	= Ext.ComponentQuery.query('module-prodordr-master2')[0],
				record	= master.getSelectionModel().getSelection()
			;
			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "{\'records\':[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('plan_numb')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]}";
				}
			}
			store.load({
				params : { param: a }, scope:this,
				callback:function(records, operation, success) {
				}
			});

			store2.load({
				params : { invc_numb : record[0].get('plan_numb') }, scope:this,
				callback:function(records, operation, success) {
					store2.each(function(records){
						records.set('plan_qntt2',records.get('plan_qntt'));
					})
				}
			});
		}
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
			items : [me.editorForm2(), me.editorForm3()]
		};
		return form;
	},

	editorForm2: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'north',
				name		: 'grid',
				itemId		: 'grid',
				autoScroll	: true,
				height		: 100,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					enableTextSelection: true
				},
				selModel	:{ selType: 'checkboxmodel', mode : 'SINGLE' },
				store		: Ext.create( me.store ),
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				columns : [
					{	dataIndex : 'invc_numb'		, width:  90, text: Language.get('acpt_numb', '수주번호'		) , align:'center'
					},{	dataIndex:	'plan_numb'		, width:  90, text: Language.get('plan_numb', '생산계획번호'		) , align:'center'
					},{	dataIndex:	'cstm_name'		, width: 180, text: Language.get('cstm_name', '거래처'			)
					},{	dataIndex:	'prod_name'		, width: 230, text: Language.get('prod_name', '제품명'			)
					},{	dataIndex:	'cvic_name'		, width: 100, text: Language.get('cvic_name', '설비'			), align : 'left'   , name : 'cvic_name'
						,tdCls	: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						allowBlank	: true,
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '설비찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cvic-popup',
										title	: '설비찾기',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0];
											record.set('cvic_idcd',parent.data.cvic_idcd);
											record.set('cvic_name',parent.data.cvic_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'item_leng'		, width:  60, text: Language.get('item_leng', '장'		) , align:'right'
					},{	dataIndex:	'item_widh'		, width:  60, text: Language.get('item_widh', '폭'		) , align:'right'
					},{	dataIndex:	'item_hght'		, width:  60, text: Language.get('item_hght', '고'		) , align:'right'
					},{	dataIndex:	'plan_qntt'		, width:  80, text: Language.get('plan_qntt', '계획수량'	) , align:'right'
					},{	dataIndex:	'pdod_date'		, width:  90, text: Language.get('pdod_date', '생산지시일자'	) , align:'center', name : 'pdod_date',
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
					}
				]
			}
		;
		return grid;
	},

	editorForm3: function(){
		var  me            = this;
		var  store         = 'module.custom.iypkg.prod.prodordr.store.ProdOrdrWkctDetail2';
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
					{	dataIndex:	'plan_sttm'		, width:  90, align : 'center'	, text: Language.get('plan_sttm'	, '시작일자'	)
					},{	dataIndex:	'wkct_name'		, width: 100, align : 'left'	, text: Language.get('wkct_name'	, '공정명'		)
					},{	dataIndex:	'wkct_stnm'		, width: 100, align : 'left'	, text: Language.get('wkct_stnm'	, '보조명'		)
					},{	dataIndex:	'wkun_dvcd'		, width:  80, align : 'center'	, text: Language.get('wkun_dvcd'	, '작업단위'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex:	'need_qntt'		, width:  70, align : 'right'	, text: Language.get('need_qntt'	, '소요량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'plan_qntt'		, width:  70, align : 'right'	, text: Language.get('plan_qntt'	, '계획량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'indn_qntt'		, width:  90, align : 'right'	, text: Language.get('indn_qntt'	, '누적지시수량'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'unit_name'		, width:  80, align : 'center'	, text: Language.get('unit_name'	, '수량단위'	)
					},{	dataIndex:	'plan_qntt2'	, width:  80, align : 'right'	, text: Language.get('plan_qntt2'	, '지시수량'	), xtype : 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			: 'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var	grid = self.up('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										var	gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
											index = Ext.Array.indexOf(gridDataIndices,this.name);
										setTimeout(function(){
											grid.plugins[0].startEdit(row+1,grid.columns[index]);
										}, 100)
									}
								}
							}
						}
					}
				],
				cellEditAfter  : function (editor, context) {
					var me = this;
					var me = this;
					var plan_qntt	= this.getSelectionModel().getSelection()[0].data.plan_qntt;	//계획량
					var plan_qntt2	= this.getSelectionModel().getSelection()[0].data.plan_qntt2;	//지시수량

					var grid		= this;
					var pos			= this.view.getSelectionModel().getCurrentPosition().row;
					var models		= grid.getStore().getRange();

					if(plan_qntt2 > plan_qntt){
						Ext.Msg.alert("알림", "지시수량을 다시 입력해주십시오.");
						models[pos].set('plan_qntt2',0);
					}else if(plan_qntt2 < 0){
						Ext.Msg.alert("알림", "지시수량을 다시 입력해주십시오.");
						models[pos].set('plan_qntt2',0);
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

	//조회
	selectAction : function(){
		var  me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params ),
			me = this
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
			}
		});
	},

	//확인
	finishAction: function(){
		var me = this,
			baseform	= me.down('form'),
			values		= baseform.getValues(),
			grid		= me.down('grid'),
			store2		= me.down('grid').getStore(),
			selects		= me.down('#grid2').getSelectionModel().getSelection()[0],
			store		= me.down('#grid2').getStore(),
			changes		= store.getUpdatedRecords().length,
			search		= Ext.ComponentQuery.query('module-prodordr-search')[0],
			param		= search.getValues(),
			lister		= Ext.ComponentQuery.query('module-prodordr-master2')[0],
			record		= lister.getSelectionModel().getSelection(),
			tpanel = Ext.ComponentQuery.query('module-prodordr-layout')[0].down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		var date = me.down('grid').getStore().data.items[0].data.pdod_date
		;

		if(date == '' || date == null){
			Ext.Msg.alert("알림","생산지시일자를 반드시 입력하십시오.");
			return;
		}

		if(changes == 0){
			Ext.Msg.alert("알림", "변경 된 사항이 없습니다.");
		}else{

			for (var a = 0; a < changes; a++) {
				store.getUpdatedRecords()[a].data.cvic_idcd = store2.data.items[0].data.cvic_idcd;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					me.setResponse();
					tpanel.items.indexOf(tpanel.setActiveTab(0));
					store.reload();
				}
			});
		}
	}
});